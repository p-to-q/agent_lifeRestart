import { copyFileSync, existsSync, mkdtempSync, readFileSync, lstatSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const errors = [];

function fail(message) {
    errors.push(message);
}

function mustExist(path) {
    if (!existsSync(join(root, path))) fail(`Missing required path: ${path}`);
}

function read(path) {
    return readFileSync(join(root, path), 'utf8');
}

function readBuffer(path) {
    return readFileSync(join(root, path));
}

function walk(dir) {
    const full = join(root, dir);
    if (!existsSync(full)) return [];
    const out = [];
    for (const item of readdirSync(full)) {
        const path = join(dir, item);
        const stat = lstatSync(join(root, path));
        if (stat.isDirectory()) out.push(...walk(path));
        else if (stat.isFile()) out.push(path);
    }
    return out;
}

function sha1(path) {
    return createHash('sha1').update(readBuffer(path)).digest('hex');
}

function unzipWorkbookXml(path) {
    return execFileSync('unzip', ['-p', join(root, path), 'xl/workbook.xml'], { encoding: 'utf8' });
}

function exportFirstSheetAsJson(path) {
    const tempDir = mkdtempSync(join(tmpdir(), 'agent-verify-'));
    try {
        const tempSource = join(tempDir, path.split('/').pop());
        copyFileSync(join(root, path), tempSource);
        execFileSync('pnpm', ['exec', 'vt', 'transform', '-d', tempDir, tempSource], { stdio: 'ignore' });
        const exported = walkFrom(tempDir).find(file => file.endsWith('.json'));
        if (!exported) {
            throw new Error(`No JSON export generated for ${path}`);
        }
        return createHash('sha1').update(readFileSync(exported)).digest('hex');
    } finally {
        rmSync(tempDir, { recursive: true, force: true });
    }
}

function walkFrom(dir) {
    if (!existsSync(dir)) return [];
    const out = [];
    for (const item of readdirSync(dir)) {
        const path = join(dir, item);
        const stat = lstatSync(path);
        if (stat.isDirectory()) out.push(...walkFrom(path));
        else if (stat.isFile()) out.push(path);
    }
    return out;
}

for (const path of [
    'README.md',
    'README-zh_CN.md',
    'docs/FEATURE_MENU.md',
    'docs/CREDITS.md',
    'docs/VISUAL_SYSTEM.md',
    'docs/ARCHITECTURE.md',
    'docs/CONTENT_FLOW.md',
    'docs/ROADMAP.md',
    'docs/DECISIONS.md',
    'docs/MAINTENANCE.md',
    'docs/VERIFICATION.md',
    'docs/REVIEW_GATES.md',
    'CONTRIBUTING.md',
    'SECURITY.md',
    'SUPPORT.md',
    'NOTICE',
    'AGENTS.md',
    'index.html',
    'content/agent-zh-patch/manifest.json',
    'content/agent-zh-patch/docs/ROUTES_AND_BIRTHS.md',
    'extensions/agent-observer/install.js',
    'extensions/agent-observer/config.js',
    'extensions/agent-ai-plugin/install.js',
    'extensions/agent-ai-plugin/config.js',
    'api/agent-plugin.js',
    'server/agent-plugin-handler.js',
]) {
    mustExist(path);
}

if (existsSync(join(root, 'src/plugins/agent-dashboard'))) {
    fail('Legacy src/plugins/agent-dashboard directory should not exist.');
}

const sourceFiles = [
    ...walk('src'),
    ...walk('docs'),
    ...walk('extensions'),
    ...walk('content'),
    'README.md',
    'README-zh_CN.md',
].filter(path => /\.(js|mjs|md|json)$/.test(path));

for (const file of sourceFiles) {
    const text = read(file);
    if (/src\/plugins\/agent-dashboard|installAgentDashboard/.test(text)) {
        fail(`Legacy dashboard reference found in ${file}`);
    }
}

const frontstageFiles = [
    ...walk('src'),
    ...walk('extensions'),
    'README.md',
    'README-zh_CN.md',
    'template/index.md',
    'template/view/index.html',
].filter(path => /\.(js|mjs|md|html|json)$/.test(path));

const legacyFrontstagePatterns = [
    ['old designer credit', /UI 设计 by 晰晰|UI Design by 晰晰/],
    ['old mini-program banner', /纸上谈亲/],
    ['old Discord invite', /discord\.gg\/U3qrf49NMQ/],
    ['old Afdian sponsor link', /afdian\.com\/a\/LifeRestart/],
    ['old Dun sponsor link', /dun\.mianbaoduo\.com\/@vickscarlet/],
    ['old sponsor route', /sponsor_afd|sponsor_ddf/],
];

for (const file of frontstageFiles) {
    const text = read(file);
    for (const [label, pattern] of legacyFrontstagePatterns) {
        if (pattern.test(text)) fail(`Legacy ${label} found in frontstage file: ${file}`);
    }
}

const app = read('src/app.js');
for (const phrase of ['https://github.com/p-to-q/agent_lifeRestart', 'https://github.com/VickScarlet/lifeRestart', 'https://ptoq.io']) {
    if (!app.includes(phrase)) fail(`src/app.js missing expected project link: ${phrase}`);
}

const indexHtml = read('index.html');
for (const phrase of ['<title>agent_lifeRestart</title>', '一个小 Agent 的出厂、走红、翻车与重开']) {
    if (!indexHtml.includes(phrase)) fail(`index.html missing product metadata: ${phrase}`);
}

try {
    const manifest = JSON.parse(read('content/agent-zh-patch/manifest.json'));
    if (manifest.id !== 'agent-zh-patch') fail('Content manifest id must be agent-zh-patch.');
    if (manifest.runtimeDataTarget !== 'data') fail('Content manifest runtimeDataTarget must be data.');
    for (const key of ['CHR', 'INT', 'STR', 'MNY', 'SPR', 'LIF']) {
        if (!manifest.engineKeys?.includes(key)) fail(`Content manifest missing engine key: ${key}`);
    }
} catch (error) {
    fail(`Invalid content manifest: ${error.message}`);
}

try {
    const pkg = JSON.parse(read('package.json'));
    if (pkg.name !== 'agent_liferestart') fail('package.json name must match repository identity.');
    if (pkg.author !== 'p-to-q') fail('package.json author must be p-to-q.');
    if (pkg.license !== 'MIT') fail('package.json license must preserve MIT.');
} catch (error) {
    fail(`Invalid package.json: ${error.message}`);
}

const index = read('src/index.js');
if (!index.includes('installAgentObserver')) {
    fail('src/index.js must install the agent observer through extensions/agent-observer.');
}
if (!index.includes('shouldEnableAgentObserver')) {
    fail('src/index.js must gate the observer through shouldEnableAgentObserver.');
}
if (!index.includes('installAgentAiPlugin')) {
    fail('src/index.js must install the agent AI plugin through extensions/agent-ai-plugin.');
}
if (!index.includes('shouldEnableAgentAiPlugin')) {
    fail('src/index.js must gate the AI plugin through shouldEnableAgentAiPlugin.');
}

const featureMenu = read('docs/FEATURE_MENU.md');
for (const phrase of ['玩一局', '看一局', '写一局', '共创一局']) {
    if (!featureMenu.includes(phrase)) fail(`Feature menu missing section: ${phrase}`);
}
for (const phrase of ['写作工作流', '共创工作流', '候选材料分流', '前台收口']) {
    if (!featureMenu.includes(phrase)) fail(`Feature menu missing workflow: ${phrase}`);
}

const zhReadme = read('README-zh_CN.md');
for (const phrase of ['agent_lifeRestart', '左边玩人生，右边看它怎么长歪', '共创一局']) {
    if (!zhReadme.includes(phrase)) fail(`README-zh_CN.md missing product phrase: ${phrase}`);
}

const zhI18n = read('src/i18n/zh-cn.js');
if (!zhI18n.includes('agent_lifeRestart / a [p → q] project')) {
    fail('zh-cn i18n missing p-to-q project signature.');
}

const roadmap = read('docs/ROADMAP.md');
for (const phrase of ['P0: Product Surface', 'P1: Share And AI Assistance', 'P2: Deeper Runtime Experiments']) {
    if (!roadmap.includes(phrase)) fail(`Roadmap missing lane: ${phrase}`);
}
for (const phrase of ['frontstage CTAs', 'upstream attribution']) {
    if (!roadmap.includes(phrase)) fail(`Roadmap missing frontstage cleanup phrase: ${phrase}`);
}

const credits = read('docs/CREDITS.md');
for (const phrase of ['agent_lifeRestart', 'https://github.com/p-to-q/agent_lifeRestart', 'https://github.com/VickScarlet/lifeRestart', 'Frontstage Rule']) {
    if (!credits.includes(phrase)) fail(`Credits missing phrase: ${phrase}`);
}

const visualSystem = read('docs/VISUAL_SYSTEM.md');
for (const phrase of ['#001020', 'Cut-Corner Panel', 'Arcade Button', 'Signal Bar']) {
    if (!visualSystem.includes(phrase)) fail(`Visual system missing design token: ${phrase}`);
}

const architecture = read('docs/ARCHITECTURE.md');
for (const phrase of ['original `Life Restart`', 'Content Flow', 'writing hints']) {
    if (!architecture.includes(phrase)) fail(`Architecture missing content-flow phrase: ${phrase}`);
}

const contentFlow = read('docs/CONTENT_FLOW.md');
for (const phrase of ['Write A Run', 'Co-create A Run', 'Runtime Boundary', 'Observer Boundary']) {
    if (!contentFlow.includes(phrase)) fail(`Content flow missing section: ${phrase}`);
}
for (const phrase of ['contentCandidate', 'copy candidate JSON', 'content-candidate@1', 'candidate-basket@1', 'agent-candidate-saved']) {
    if (!contentFlow.includes(phrase)) fail(`Content flow missing candidate handoff: ${phrase}`);
}

const observerInstall = read('extensions/agent-observer/install.js');
for (const phrase of ['复制分享语', '复制候选 JSON', '存入候选篮', '复制候选篮', '下载', 'agent-candidate-saved', 'activeTab', 'renderWrite', 'contentCandidate']) {
    if (!observerInstall.includes(phrase)) fail(`Observer install missing content handoff UI: ${phrase}`);
}

const observerState = read('extensions/agent-observer/state.js');
for (const phrase of ['contentCandidate()', 'contentCandidateText()', 'candidateBasketExport()', 'reviewTarget']) {
    if (!observerState.includes(phrase)) fail(`Observer state missing content candidate API: ${phrase}`);
}

const observerCss = read('extensions/agent-observer/panel.css.js');
for (const phrase of ['--ad-void:#001020', '--ad-cyan-core:#30d0d0', 'clip-path:polygon', 'ad-tab-on']) {
    if (!observerCss.includes(phrase)) fail(`Observer CSS missing visual-system token: ${phrase}`);
}

const aiPluginInstall = read('extensions/agent-ai-plugin/install.js');
for (const phrase of ['AI 插件', '再讲一点', '补支线', '补死法', '补候选', 'snapshot', 'agent-life-step']) {
    if (!aiPluginInstall.includes(phrase)) fail(`AI plugin install missing UI or event hook: ${phrase}`);
}

const aiPluginApi = read('server/agent-plugin-handler.js');
for (const phrase of ['ALEPH_CUSTOM_API_BASE_URL', 'ALEPH_CUSTOM_API_FALLBACK_BASE_URL', 'chat/completions', 'json_object', 'snapshot', 'expand', 'death']) {
    if (!aiPluginApi.includes(phrase)) fail(`AI plugin API missing server-side provider handling: ${phrase}`);
}

const contentPackRuntimePairs = [
    ['content/agent-zh-patch/data/zh-cn/achievement.xlsx', 'data/zh-cn/achievement.xlsx'],
    ['content/agent-zh-patch/data/zh-cn/age.xlsx', 'data/zh-cn/age.xlsx'],
    ['content/agent-zh-patch/data/zh-cn/character.xlsx', 'data/zh-cn/character.xlsx'],
    ['content/agent-zh-patch/data/zh-cn/events.xlsx', 'data/zh-cn/events.xlsx'],
    ['content/agent-zh-patch/data/zh-cn/talents.xlsx', 'data/zh-cn/talents.xlsx'],
    ['content/agent-zh-patch/data/en-us/achievement.xlsx', 'data/en-us/achievement.xlsx'],
    ['content/agent-zh-patch/data/en-us/age.xlsx', 'data/en-us/age.xlsx'],
    ['content/agent-zh-patch/data/en-us/character.xlsx', 'data/en-us/character.xlsx'],
    ['content/agent-zh-patch/data/en-us/events.xlsx', 'data/en-us/events.xlsx'],
    ['content/agent-zh-patch/data/en-us/talents.xlsx', 'data/en-us/talents.xlsx'],
];

for (const [packPath, runtimePath] of contentPackRuntimePairs) {
    if (!existsSync(join(root, packPath)) || !existsSync(join(root, runtimePath))) {
        fail(`Missing content/runtime sync pair: ${packPath} -> ${runtimePath}`);
        continue;
    }
    const expectedSheetName = runtimePath.split('/').pop().replace(/\.xlsx$/, '');
    const workbookXml = unzipWorkbookXml(runtimePath);
    if (!workbookXml.includes(`name="${expectedSheetName}"`)) {
        fail(`Runtime workbook sheet name mismatch: ${runtimePath} should expose sheet ${expectedSheetName}. Run pnpm sync:content-pack.`);
        continue;
    }
    if (exportFirstSheetAsJson(packPath) !== exportFirstSheetAsJson(runtimePath)) {
        fail(`Runtime data is out of sync with content pack: ${runtimePath}. Run pnpm sync:content-pack.`);
    }
}

for (const file of ['src/ui/themes/cyber/main.js', 'src/ui/themes/default/main.js']) {
    const text = read(file);
    for (const phrase of ['arrangeTopLeftActions', 'btnSaveLoad', 'btnGithub', 'openPtoqFromSignature']) {
        if (!text.includes(phrase)) fail(`${file} missing top-left action layout: ${phrase}`);
    }
}

const routes = read('content/agent-zh-patch/docs/ROUTES_AND_BIRTHS.md');
for (const phrase of ['Stanford 小模型', '黑客松流星', 'DeepSeek 小鲸鱼', 'API 欠费孤儿', '死法池']) {
    if (!routes.includes(phrase)) fail(`Routes and births doc missing content pool item: ${phrase}`);
}
for (const phrase of ['产品核心仍然是《人生重开模拟器》的模式', '怎么使用这个池子']) {
    if (!routes.includes(phrase)) fail(`Routes and births doc missing workflow phrase: ${phrase}`);
}

if (errors.length) {
    console.error('Structure verification failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
}

console.log('Structure verification passed.');

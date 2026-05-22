import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;

const pairs = [
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

function normalizeWorksheetName(xlsxPath, sheetName) {
    const tempDir = mkdtempSync(join(tmpdir(), 'agent-zh-pack-'));
    const outputPath = `${xlsxPath}.tmp`;
    try {
        execFileSync('unzip', ['-qq', xlsxPath, '-d', tempDir]);
        const workbookPath = join(tempDir, 'xl', 'workbook.xml');
        const workbookXml = readFileSync(workbookPath, 'utf8');
        if (workbookXml.includes(`name="${sheetName}"`)) {
            return;
        }
        const nextXml = workbookXml.replace(/name="[^"]+"/, `name="${sheetName}"`);
        if (nextXml === workbookXml) {
            throw new Error(`Unable to set worksheet name for ${xlsxPath}`);
        }
        writeFileSync(workbookPath, nextXml);
        rmSync(outputPath, { force: true });
        execFileSync('zip', ['-qr', outputPath, '.'], { cwd: tempDir });
        renameSync(outputPath, xlsxPath);
        const verifiedXml = execFileSync('unzip', ['-p', xlsxPath, 'xl/workbook.xml'], { encoding: 'utf8' });
        if (!verifiedXml.includes(`name="${sheetName}"`)) {
            throw new Error(`Worksheet rename verification failed for ${xlsxPath}`);
        }
    } finally {
        rmSync(outputPath, { force: true });
        rmSync(tempDir, { recursive: true, force: true });
    }
}

for (const [from, to] of pairs) {
    const source = join(root, from);
    const target = join(root, to);
    const sheetName = basename(to, '.xlsx');
    if (!existsSync(source)) {
        throw new Error(`Missing content-pack source file: ${from}`);
    }
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(source, target);
    normalizeWorksheetName(target, sheetName);
    console.log(`Synced ${from} -> ${to}`);
}

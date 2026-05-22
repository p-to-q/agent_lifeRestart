import { dirname, join } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const python = process.env.CODEX_BUNDLED_PYTHON
    || '/Users/dujiayi/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';

const jobs = [
    ['content/agent-zh-patch/csv/achievement.csv', 'content/agent-zh-patch/data/zh-cn/achievement.xlsx'],
    ['content/agent-zh-patch/csv/age.csv', 'content/agent-zh-patch/data/zh-cn/age.xlsx'],
    ['content/agent-zh-patch/csv/character.csv', 'content/agent-zh-patch/data/zh-cn/character.xlsx'],
    ['content/agent-zh-patch/csv/events.csv', 'content/agent-zh-patch/data/zh-cn/events.xlsx'],
    ['content/agent-zh-patch/csv/talents.csv', 'content/agent-zh-patch/data/zh-cn/talents.xlsx'],
    ['content/agent-zh-patch/csv/achievement.csv', 'content/agent-zh-patch/data/en-us/achievement.xlsx'],
    ['content/agent-zh-patch/csv/age.csv', 'content/agent-zh-patch/data/en-us/age.xlsx'],
    ['content/agent-zh-patch/csv/character.csv', 'content/agent-zh-patch/data/en-us/character.xlsx'],
    ['content/agent-zh-patch/csv/events.csv', 'content/agent-zh-patch/data/en-us/events.xlsx'],
    ['content/agent-zh-patch/csv/talents.csv', 'content/agent-zh-patch/data/en-us/talents.xlsx'],
];

const bridge = `
import csv
import os
import sys
import pandas as pd

source = sys.argv[1]
target = sys.argv[2]
sheet = os.path.splitext(os.path.basename(target))[0]

rows = []
with open(source, 'r', encoding='utf-8-sig', newline='') as handle:
    reader = csv.reader(handle)
    rows = list(reader)

if not rows:
    raise SystemExit(f'CSV is empty: {source}')

width = max(len(row) for row in rows)
rows = [row + [''] * (width - len(row)) for row in rows]
df = pd.DataFrame(rows[1:], columns=rows[0])
df.to_excel(target, sheet_name=sheet, index=False)
`;

for (const [sourcePath, targetPath] of jobs) {
    const source = join(root, sourcePath);
    const target = join(root, targetPath);
    if (!existsSync(source)) {
        throw new Error(`Missing content-pack csv source: ${sourcePath}`);
    }
    mkdirSync(dirname(target), { recursive: true });
    execFileSync(python, ['-c', bridge, source, target], { stdio: 'inherit' });
    console.log(`Built ${targetPath} from ${sourcePath}`);
}

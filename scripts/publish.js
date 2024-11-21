import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Convert `import.meta.url` to file path
const __dirname = dirname(__filename);

// 使用 tsc 检查，通过后才会进行打包
execSync('pnpm tsc && pnpm build', { stdio: 'inherit' });

// 升级 package.json
const packageJson = JSON.parse(
  readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'),
);
const { version } = packageJson;
const newVersion = version
  .split('.')
  .map((v, i) => (i === 2 ? parseInt(v) + 1 : v))
  .join('.');
packageJson.version = newVersion;
writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

// git commit
execSync('git add .', { stdio: 'inherit' });
execSync(`git commit -m "chore: upgrade version to ${newVersion}"`, {
  stdio: 'inherit',
});

// npm 发布
execSync(`npm publish  --no-git-checks --access public`, {
  stdio: 'inherit',
});

// 上传 git
execSync('git push', { stdio: 'inherit' });

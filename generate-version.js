import fs from 'fs';
import { execSync } from 'child_process';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const [major, minor] = packageJson.version.split('.').map(Number);

let buildCount;
try {
  buildCount = execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim();
} catch (e) {
  buildCount = '0';
}

const date = new Date().toISOString();
const version = `${major}.${minor}.${buildCount}`;
const lastUpdate = date;

const versionData = { version, lastUpdate };
fs.writeFileSync('src/version.json', JSON.stringify(versionData, null, 2));

console.log(`Generated version: ${version}, lastUpdate: ${lastUpdate}`);
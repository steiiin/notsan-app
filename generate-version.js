import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const scriptPath = fileURLToPath(import.meta.url);
const projectRoot = path.dirname(scriptPath);
const sourceExtensions = ['.vue', '.ts', '.js', '.json', '.svg', '.png', '.jpg', '.jpeg', '.webp'];

export function parseImportSpecifiers(source) {
  const specifiers = new Set();
  const patterns = [
    /(?:import|export)\s+(?:[^'";]*?\s+from\s+)?['"]([^'"]+)['"]/g,
    /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      specifiers.add(match[1]);
    }
  }

  return [...specifiers];
}

function isWithin(filePath, directoryPath) {
  const relativePath = path.relative(directoryPath, filePath);
  return relativePath !== '..'
    && !relativePath.startsWith(`..${path.sep}`)
    && !path.isAbsolute(relativePath);
}

function isTestFile(filePath) {
  return /\.(?:spec|test)\.[^.]+$/i.test(filePath);
}

function resolveImport(specifier, importerPath, rootPath) {
  const cleanSpecifier = specifier.replace(/[?#].*$/, '');
  let candidate;

  if (cleanSpecifier.startsWith('@/')) {
    candidate = path.join(rootPath, 'src', cleanSpecifier.slice(2));
  } else if (cleanSpecifier.startsWith('.')) {
    candidate = path.resolve(path.dirname(importerPath), cleanSpecifier);
  } else {
    return undefined;
  }

  const candidates = path.extname(candidate)
    ? [candidate]
    : [candidate, ...sourceExtensions.map(extension => `${candidate}${extension}`)];

  for (const resolvedPath of candidates) {
    if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
      return resolvedPath;
    }
  }

  return undefined;
}

export function collectDependencyFiles(entryPaths, rootPath = projectRoot) {
  const contentRoot = path.join(rootPath, 'src/views/content');
  const contentAssetsRoot = path.join(rootPath, 'src/data/assets');
  const allowedRoots = [contentRoot, contentAssetsRoot];
  const pending = [...entryPaths];
  const dependencies = new Set();

  while (pending.length > 0) {
    const currentPath = path.resolve(pending.pop());

    if (dependencies.has(currentPath) || isTestFile(currentPath) || !fs.existsSync(currentPath)) {
      continue;
    }

    if (!allowedRoots.some(allowedRoot => isWithin(currentPath, allowedRoot))) {
      continue;
    }

    dependencies.add(currentPath);

    if (!['.vue', '.ts', '.js'].includes(path.extname(currentPath))) {
      continue;
    }

    const source = fs.readFileSync(currentPath, 'utf8');
    for (const specifier of parseImportSpecifiers(source)) {
      const resolvedPath = resolveImport(specifier, currentPath, rootPath);
      if (resolvedPath) {
        pending.push(resolvedPath);
      }
    }
  }

  return dependencies;
}

export function latestModifiedIso(filePaths) {
  let latestMtime = -Infinity;

  for (const filePath of filePaths) {
    latestMtime = Math.max(latestMtime, fs.statSync(filePath).mtimeMs);
  }

  return Number.isFinite(latestMtime) ? new Date(latestMtime).toISOString() : undefined;
}

function extractDynamicContentImports(filePath, prefix, rootPath) {
  const source = fs.readFileSync(filePath, 'utf8');
  return parseImportSpecifiers(source)
    .filter(specifier => specifier.startsWith(prefix))
    .map(specifier => resolveImport(specifier, filePath, rootPath))
    .filter(Boolean);
}

export function createContentRouteEntries(rootPath = projectRoot) {
  const entries = new Map();
  const emergencyPagePath = path.join(rootPath, 'src/views/content/EmergencyPage.vue');
  const emergencyRoot = path.join(rootPath, 'src/views/content/emergency');
  const emergencyEntries = parseImportSpecifiers(fs.readFileSync(emergencyPagePath, 'utf8'))
    .map(specifier => resolveImport(specifier, emergencyPagePath, rootPath))
    .filter(filePath => filePath && isWithin(filePath, emergencyRoot));

  entries.set('/tabs/emergency', emergencyEntries);

  const medicationImports = extractDynamicContentImports(
    path.join(rootPath, 'src/data/medications.ts'),
    '@/views/content/medications/',
    rootPath,
  );
  for (const entryPath of medicationImports) {
    const medicationId = path.relative(path.join(rootPath, 'src/views/content/medications'), entryPath)
      .split(path.sep)[0];
    entries.set(`/tabs/meds/${medicationId}`, [entryPath]);
  }

  const libraryImports = extractDynamicContentImports(
    path.join(rootPath, 'src/data/library.ts'),
    '@/views/content/library/',
    rootPath,
  );
  for (const entryPath of libraryImports) {
    const [listId, entryId] = path.relative(path.join(rootPath, 'src/views/content/library'), entryPath)
      .split(path.sep);
    if (listId && entryId) {
      entries.set(`/tabs/lib/list/${listId}-list/${listId}-${entryId}`, [entryPath]);
    }
  }

  return entries;
}

export function buildContentModified(rootPath = projectRoot) {
  const contentModified = {};
  const routeEntries = [...createContentRouteEntries(rootPath).entries()]
    .sort(([leftRoute], [rightRoute]) => leftRoute.localeCompare(rightRoute));

  for (const [route, entryPaths] of routeEntries) {
    const modified = latestModifiedIso(collectDependencyFiles(entryPaths, rootPath));
    if (modified) {
      contentModified[route] = modified;
    }
  }

  return contentModified;
}

export function generateVersion(rootPath = projectRoot) {
  const packageJson = JSON.parse(fs.readFileSync(path.join(rootPath, 'package.json'), 'utf8'));
  const [major, minor] = packageJson.version.split('.').map(Number);

  let buildCount;
  try {
    buildCount = execSync('git rev-list --count HEAD', { encoding: 'utf8', cwd: rootPath }).trim();
  } catch (e) {
    buildCount = '0';
  }

  const lastUpdate = new Date().toISOString();
  const version = `${major}.${minor}.${buildCount}`;
  const contentModified = buildContentModified(rootPath);
  const versionData = { version, lastUpdate, contentModified };

  fs.writeFileSync(
    path.join(rootPath, 'src/version.json'),
    `${JSON.stringify(versionData, null, 2)}\n`,
  );

  console.log(`Generated version: ${version}, lastUpdate: ${lastUpdate}`);
  return versionData;
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  generateVersion();
}

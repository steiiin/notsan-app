import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  collectDependencyFiles,
  createContentRouteEntries,
  latestModifiedIso,
  parseImportSpecifiers,
} from './generate-version.js';

const temporaryDirectories = [];

function createTemporaryProject() {
  const rootPath = fs.mkdtempSync(path.join(os.tmpdir(), 'notsan-version-'));
  temporaryDirectories.push(rootPath);
  return rootPath;
}

function writeFixture(rootPath, relativePath, contents = '') {
  const filePath = path.join(rootPath, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
  return filePath;
}

afterEach(() => {
  for (const directoryPath of temporaryDirectories.splice(0)) {
    fs.rmSync(directoryPath, { recursive: true, force: true });
  }
});

describe('content dependency collection', () => {
  it('extracts static, re-exported, and dynamic imports', () => {
    const source = `
      import Fragment from './Fragment.vue'
      export { dosage } from './Packages'
      const Content = () => import('./Content.vue')
    `;

    expect(parseImportSpecifiers(source)).toEqual([
      './Fragment.vue',
      './Packages',
      './Content.vue',
    ]);
  });

  it('follows rendered content fragments and assets but excludes generic UI and tests', () => {
    const rootPath = createTemporaryProject();
    const emergencyPath = writeFixture(
      rootPath,
      'src/views/content/emergency/example/ContentEmergency.vue',
      `
        import SharedFragment from '../../medications/example/FragExample.vue'
        import flow from '@/data/assets/flow.svg?raw'
        import GenericUi from '@/components/GenericUi.vue'
        import './ContentEmergency.spec.ts'
      `,
    );
    const fragmentPath = writeFixture(
      rootPath,
      'src/views/content/medications/example/FragExample.vue',
      "import { dosage } from './Packages'",
    );
    const packagesPath = writeFixture(
      rootPath,
      'src/views/content/medications/example/Packages.ts',
      'export const dosage = 1',
    );
    const assetPath = writeFixture(rootPath, 'src/data/assets/flow.svg', '<svg />');
    const genericUiPath = writeFixture(rootPath, 'src/components/GenericUi.vue', '<template />');
    const testPath = writeFixture(
      rootPath,
      'src/views/content/emergency/example/ContentEmergency.spec.ts',
      'throw new Error()',
    );

    const dependencies = collectDependencyFiles([emergencyPath], rootPath);

    expect(dependencies).toEqual(new Set([
      emergencyPath,
      fragmentPath,
      packagesPath,
      assetPath,
    ]));
    expect(dependencies.has(genericUiPath)).toBe(false);
    expect(dependencies.has(testPath)).toBe(false);
  });

  it('uses the newest dependency mtime', () => {
    const rootPath = createTemporaryProject();
    const olderPath = writeFixture(rootPath, 'src/views/content/older.vue');
    const newerPath = writeFixture(rootPath, 'src/views/content/newer.vue');
    const olderDate = new Date('2026-01-01T10:00:00.000Z');
    const newerDate = new Date('2026-02-02T12:30:00.000Z');
    fs.utimesSync(olderPath, olderDate, olderDate);
    fs.utimesSync(newerPath, newerDate, newerDate);

    expect(latestModifiedIso([olderPath, newerPath])).toBe(newerDate.toISOString());
  });
});

describe('content route discovery', () => {
  it('creates routes for emergency, medications, and nested library entries', () => {
    const routeEntries = createContentRouteEntries();

    expect(routeEntries.has('/tabs/emergency')).toBe(true);
    expect(routeEntries.has('/tabs/meds/epinephrin')).toBe(true);
    expect(routeEntries.has('/tabs/lib/list/bpr-list/bpr-anaphylaxie')).toBe(true);
    expect(routeEntries.has('/tabs/lib/list/saa-list/saa-iozugang')).toBe(true);
    expect(routeEntries.has('/tabs/lib/list/bpr-list/bpr-tracheostoma')).toBe(false);
  });
});

import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';

// The build redistributes third-party code (React and others, MIT), whose licences ask for their notice in the
// distribution: every package bundled, with its licence and notice files, goes to `THIRD-PARTY-NOTICES.txt` beside
// the app (plan 132 P3). Same plugin as hds-webapp's (it reads only `chunk.moduleIds`, which rollup and rolldown both
// give). HDS's own packages are left out (`hds-*`).
const NOTICE_FILE = /^(licen[cs]e|copying|notice)([.-].*)?$/i;

function thirdPartyNotices(appName: string): PluginOption {
  return {
    name: 'hds-third-party-notices',
    apply: 'build',
    generateBundle(_options, bundle) {
      const dirs = new Set<string>();
      for (const out of Object.values(bundle)) {
        if (out.type !== 'chunk') continue;
        for (const id of out.moduleIds) {
          const dir = id.replace(/\\/g, '/').match(/^(.*\/node_modules\/(?:@[^/]+\/)?[^/]+)\//)?.[1];
          if (dir) dirs.add(dir);
        }
      }
      const packages = new Map<string, string>();
      for (const dir of dirs) {
        const pkgFile = path.join(dir, 'package.json');
        if (!fs.existsSync(pkgFile)) continue;
        const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
        if (typeof pkg.name !== 'string' || /^hds-/.test(pkg.name)) continue;
        const id = `${pkg.name}@${pkg.version}`;
        if (packages.has(id)) continue;
        const licence = typeof pkg.license === 'string' ? pkg.license : 'licence not declared';
        const texts = fs.readdirSync(dir).filter(f => NOTICE_FILE.test(f)).sort()
          .map(f => fs.readFileSync(path.join(dir, f), 'utf8').trim());
        packages.set(id, `${id} (${licence})\n\n${texts.length > 0 ? texts.join('\n\n') : `No licence file in the package; its package.json declares: ${licence}.`}`);
      }
      const body = [...packages.keys()].sort().map(id => packages.get(id)).join(`\n\n${'-'.repeat(80)}\n\n`);
      this.emitFile({
        type: 'asset',
        fileName: 'THIRD-PARTY-NOTICES.txt',
        source: `Third-party software in this build of ${appName} (${packages.size} packages)\n\n${'='.repeat(80)}\n\n${body}\n`
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), thirdPartyNotices('the HDS datasets search app')],
  build: {
    outDir: 'dist'
  }
});

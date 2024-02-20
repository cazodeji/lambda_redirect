
import esbuild from 'esbuild'
esbuild.build({
  entryPoints: ['packages/functions/src/viewer-lambda/handler.ts'],
  bundle: false,
  format: 'esm',
  outdir: 'viewer-lambda',
  platform: 'node',
  outExtension: { '.js': '.mjs' },
  sourcemap: 'inline'
});
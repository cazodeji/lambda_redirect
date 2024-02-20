
import esbuild from 'esbuild'
esbuild.build({
  entryPoints: ['packages/functions/src/origin-lambda/handler.ts'],
  // ,'packages/functions/src/origin-lambda/error.ts', 'packages/functions/src/origin-lambda/ssm.ts'],
  bundle: false,
  format: 'esm',
  outdir: 'origin-lambda',
  platform: 'node',
  outExtension: { '.js': '.mjs' },
  sourcemap: 'inline'
});
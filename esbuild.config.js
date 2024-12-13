import { argv } from 'node:process';
import * as esbuild from 'esbuild';

const
  productionMode = ('development' !== (argv[2] || process.env.NODE_ENV)),
  target = 'chrome100,firefox100,safari15'.split(',');

console.log(`${ productionMode ? 'production' : 'development' } build`);

// bundle CSS
const buildCSS = await esbuild.context({

  entryPoints: [ './level-up-designs/styles/styles.css' ],
  bundle: true,
  target,
  external: ['level-up-designs/images/*'],
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.svg': 'dataurl',
    '.woff': 'file',
    '.woff2': 'file'
  },
  logLevel: productionMode ? 'error' : 'info',
  minify: productionMode,
  sourcemap: !productionMode && 'linked',
  outfile: './level-up-designs/dist/styles/site.css'

});


// bundle JS
const buildJS = await esbuild.context({

  entryPoints: [ './level-up-designs/scripts/site.js' ],
  format: 'esm',
  bundle: true,
  target,
  drop: productionMode ? ['debugger', 'console'] : [],
  logLevel: productionMode ? 'error' : 'info',
  minify: productionMode,
  sourcemap: !productionMode && 'linked',
  // outdir: './level-up-designs/dist/scripts',
  outfile: './level-up-designs/dist/scripts/lib.js',
  // outfile: './level-up/Backend/wwwroot/js/lib.js'

});


if (productionMode) {

  // single production build
  await buildCSS.rebuild();
  buildCSS.dispose();

  await buildJS.rebuild();
  buildJS.dispose();

}
else {

  // watch for file changes
  await buildCSS.watch();
  await buildJS.watch();

  // development server
  await buildCSS.serve({
    servedir: './level-up-designs/dist'
  });

}
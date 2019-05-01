// rollup.config.js
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const baseConfig = {
  input: 'src/entry.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    commonjs({
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'node_modules/vue-js-toggle-button/dist/index.js': ['ToggleButton']
      }
    }),
    resolve({
      only: [
        'uniqid',
        'vue-js-toggle-button',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome'
      ]
    }),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true
      }
    }),
    buble(),
    builtins(),
    nodeGlobals()
  ]
};

// UMD/IIFE shared settings: externals and output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'moment'
];
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  moment: 'moment'
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    external,
    output: {
      file: 'dist/vue-business-hours.esm.js',
      format: 'esm',
      name: 'VueBusinessHours',
      exports: 'named',
      globals
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 6
        }
      })
    ]
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'umd') {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/vue-business-hours.umd.js',
      format: 'umd',
      name: 'VueBusinessHours',
      exports: 'named',
      globals
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 6
        }
      })
    ]
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/vue-business-hours.min.js',
      format: 'iife',
      name: 'VueBusinessHours',
      exports: 'named',
      globals
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 5
        }
      })
    ]
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;

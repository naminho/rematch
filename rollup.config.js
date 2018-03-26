import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import commonJs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

import { minify } from 'uglify-es'
// experimental minifier for ES modules
// https://github.com/TrySound/rollup-plugin-uglify#warning

const pkg = require('./package.json')

// minified production builds
const production = {
  input: 'lib/index.js',
  output: [
    { name: 'Rematch', file: pkg.browser, format: 'umd', exports: 'named', sourcemap: true }, // Universal Modules
    { file: `${pkg.main}/rematch.prod.min.js`, format: 'cjs',  exports: 'named', sourcemap: true }, // CommonJS Modules
    { file: pkg.module, format: 'es', exports: 'named', sourcemap: true } // ES Modules
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': '"production"',
    }),
    resolve({
      jsnext: true,
      browser: true,
    }),
    commonJs(),
    uglify({
      compress: {
        pure_getters: true,
        unsafe: false,
      },
      output: {
        comments: false,
        semicolons: false,
      },
    }, minify)
  ],
}

// full source development builds
const development = {
  input: 'lib/index.js',
  output: [
    { file: `${pkg.main}/rematch.dev.js`, format: 'cjs', exports: 'named' }, // CommonJS Modules
    // { file: `${pkg.module}/rematch.dev.js`, format: 'es', exports: 'named', sourcemap: true } // ES Modules
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': '"development"',
    }),
    commonJs(),
    resolve({
      jsnext: true,
      browser: true,
    }),
  ],
}

// point user to needed build
const root = `'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./rematch.prod.min.js')
} else {
  module.exports = require('./rematch.dev.js')
}
`

const rootFile = (folder) => {
  mkdirSync(join('dist', folder))
  writeFileSync(join('dist', folder, 'index.js'), root)
}

export default (() => {
  // generate root mapping files
  mkdirSync('dist')
  rootFile('cjs')

  return [development, production]
})()

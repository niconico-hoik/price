import Babel from 'rollup-plugin-babel'
import AutoExternal from 'rollup-plugin-auto-external'
import Cleanup from 'rollup-plugin-cleanup'
import Prettier from 'rollup-plugin-prettier'

const babel = Babel({
  babelrc: false,
  exclude: 'node_modules/**',
  presets: [
    ['@babel/preset-env', {
      modules: false,
      targets: {
        browsers: ['last 2 versions', 'safari >= 7']
      }
    }]
  ]
})

const autoexternal = AutoExternal({

})

const cleanup = Cleanup({
  comments: 'some'
})

const prettier = Prettier({
  parser: 'babylon',
  tabWidth: 2,
  semi: false,
  singleQuote: true
})

const Config = (format) => ({
  input: 'src/index.js',
  output: {
    format,
    file: `.dist/${format}.js`,
    exports: 'named',
  },
  external: [
    '../constants.json'
  ],
  plugins: [
    babel,
    autoexternal,
    cleanup,
    prettier,
  ],
})

export default [
  Config('cjs'),
  Config('es'),
]
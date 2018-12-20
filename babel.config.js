module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: 'commonjs',
      targets: { browsers: ['last 2 versions', 'safari >= 7'] }
    }]
  ]
}
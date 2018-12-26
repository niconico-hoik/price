module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: 'commonjs',
      targets: { browsers: ['last 2 versions', 'safari >= 7'] }
    }]
  ],
  env: {
    test: {
      presets: [
        'power-assert',
      ],
      plugins: [
        'istanbul',
      ],
    }
  }
}
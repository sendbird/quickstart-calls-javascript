module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
      targets: {
        'browsers': '> 1% and not op_mini all and not dead, ie 11'
      },
      corejs: 3,
      useBuiltIns: "usage"
    }]
  ]
};

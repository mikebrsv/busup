module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'BusUp Code Challenge';
        return args
      })
  },

  transpileDependencies: [
    'vuetify'
  ]
}

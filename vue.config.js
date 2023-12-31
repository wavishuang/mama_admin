const { defineConfig } = require('@vue/cli-service')

let webUrl = 'https://www.api.cc94178.com'

// if(process.env.NODE_ENV === 'production') {
//   webUrl = '/'
// } else {
//   webUrl = ''
// }

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // disableHostCheck: true,
    static: {
      publicPath: '/',
    },
    proxy: {
      // '^/Api/': {
      //   target: 'https://www.api.cc94178.com/index.php/Demo/',
      //   // changeOrigin: true
      // },
      '^/Demo/': {
        target: webUrl + '/index.php',
        // changeOrigin: true
      },
    },
  },
})

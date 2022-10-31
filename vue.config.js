module.exports = {
  outputDir: './build',
  // publicPath: './',
  devServer: {
    // 设置代理，防止跨域问题
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
}

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module.rule()
    .test(/\.pdf$/)
    .use('file-loader').loader('file-loader')
  }
})

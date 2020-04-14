const isProd = process.env.NODE_ENV === 'production'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
// cdn配置
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@config', resolve('config'))
      .set('@u', resolve('utils'))
      .set('@s', resolve('static'))
    /**
     * 限制图片转码
     */
    config.module
          .rule('images')
          .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 40000 }))
  },
  configureWebpack: config => {
    // 配置cdn模块
    // if (isProd) {
    //   config.externals = {
    //     vue: 'Vue',
    //     axios: 'axios'
    //   }
    // }
  },
   devServer: {
      port: 8001,
      open: true,
      proxy: {
        lz: {
          target: 'http://39.97.164.4:10091/', // 吕卓
          changeOrigin: true,
          pathRewrite: {
            '^/lz': ''
          }
        },
        zk: {
          target: 'http://pugai.natapp1.cc/', // 张坤
          changeOrigin: true,
          pathRewrite: {
            '^/zk': ''
          }
        },
        zx: {
          target: 'http://39.97.164.4:10160/', // 朱旭
          changeOrigin: true,
          pathRewrite: {
            '^/zx': ''
          }
        }
      }
    },
}
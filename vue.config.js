const isProd = process.env.NODE_ENV === 'production'
const path = require('path')
const uploadZip = require('./upload.js')
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
			.tap(options => Object.assign(options, {
				limit: 40000
			}))
	},
	configureWebpack: config => {
		config.plugins.push(new uploadZip())
		// 配置cdn模块
		// if (isProd) {
		//   config.externals = {
		//     vue: 'Vue',
		//     axios: 'axios'
		//   }
		// }
	},
	devServer: {
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
				// target: 'http://192.168.1.24:10160/',
				changeOrigin: true,
				pathRewrite: {
					'^/zx': ''
				}
			},
			mj: {
				target: 'http://39.97.164.4:10162/',//朱旭门禁
				changeOrigin: true,
				pathRewrite: {
					'^/mj': ''
				}
			},
			apply: {
				target: 'http://112.125.89.37:1010/', // 应用管理平台 文件上传
				changeOrigin: true,
				pathRewrite: {
					'^/apply': ''
				}
			}
		}
	}
}

/**
 *
 * @Description 压缩文件后上传服务器
 * @Author 张立
 * @Created 2019-06-21
 *
 */
const request = require('request')
const path = require('path')
const fs = require('fs')
const AdmZip = require('adm-zip')
var zip = new AdmZip()
// const buildModule = process.argv[process.argv.length - 1]
const buildModule = '云平台移动端'
const envHost = {
  prod: {
    url: 'http://39.97.164.4:8090/upload-zip',
    uploadPath: '/usr/local/openresty/nginx/html/pc-protal/'
  },
  test: {
    url: 'http://112.125.89.37:8090/upload-zip',
    uploadPath: '/usr/local/openresty/nginx/html/pc-protal/'
  }
}

class uploadZip {
  apply(compiler) {
    compiler.hooks.done.tap('done', compilation => {
      console.log(`${buildModule}模块打包完成`)
      const env = 'test'
      const url = envHost[env].url + '?uploadPath=' + envHost[env].uploadPath
      const msg = env === 'prod' ? '正式环境' : '测试环境'
      console.log(`正在上传${buildModule}模块到${msg}`)
      zip.addLocalFolder('unpackage/dist/build/h5')
      zip.writeZip('unpackage/dist/build/protal.zip')
      var formData = {
        file: fs.createReadStream(path.resolve(__dirname, 'unpackage/dist/build/protal.zip'))
      }
      request.post(
        {
          url: url,
          formData: formData
        },
        function(error, response, body) {
          if (!error && response.statusCode === 200) {
            // 删除压缩包
            fs.unlink(path.resolve(__dirname, 'unpackage/dist/build/protal.zip'), function() {
              console.log(`上传成功，${buildModule}模块已上传到${msg}`)
              process.exit()
            })
          }
        }
      )
    })
  }
}

module.exports = uploadZip

/**
 * @description 公共函数模块
 */
import wx from 'weixin-js-sdk'
import axios from 'axios'
import $ajax from '@u/request.js'
import EXIF from 'exif-js'
import hostEnv from '../config/index.js'

function resultBack(res) {
  return new Promise((resolve) => {
    resolve(res)
  })
}
const tools = {
  // 路由跳转
  navTo({ url, title = '平安校园' }) {
    uni.navigateTo({
      url
    })
    setTimeout(() => {
      document.title = title.split('-')[0] || '平安校园'
    })
  },
  // 路由跳转关闭当前页面
  redirectTo({ url, title = '平安校园' } = params) {
    uni.redirectTo({
      url
    })
    setTimeout(() => {
      document.title = title.split('-')[0] || '平安校园'
    })
  },
  // 路由返回
  goBack(delta = 1) {
    uni.navigateBack({
      delta
    })
  },
  //函数节流
  throttle(func, wait) {
    let previous = 0
    return function () {
      let now = Date.now()
      let context = this
      let args = arguments
      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    }
  },
  // 获取url传到参数
  getQuery() {
    const url = window.location.href
    const params = url.substr(url.lastIndexOf('?')).replace('#/', '')
    return new URLSearchParams(params)
  },
  // 审批状态
  approveState(val) {
    if (val === '0') {
      return '待审批'
    } else if (val === '1') {
      return '同意'
    } else if (val === '2') {
      return '不同意'
    } else if (val === '3') {
      return '撤销'
    } else if (val === '4') {
      return '失效'
    }
  },
  // 删除提示
  delTip(msg = '确认进行此操作吗?', cb) {
    uni.showModal({
      title: '温馨提示',
      content: msg,
      success: function (res) {
        if (res.confirm) {
          cb()
        }
      }
    })
  },
  // 延迟执行
  goNext: (fn) => {
    setTimeout(() => {
      fn()
    }, 1200)
  },
  // 时间转化
  getDateTime(t = new Date().getTime(), type = 'dateTime') {
    let d = new Date(t)
    const date =
      d.getFullYear() +
      '-' +
      (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
      '-' +
      (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
      ' ' +
      (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
      ':' +
      (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
      ':' +
      (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())

    if (type === 'dateTime') {
      return date
    } else if (type === 'dateTimeWithOutSecond') {
      return date.substring(0, 16)
    } else if (type === 'date') {
      return date.substring(0, 10)
    } else if (type === 'time') {
      return date.substring(11, 16)
    } else if (type === 'noSecond') {
      return date.substring(0, 16)
    } else if (type === 'second') {
      return date.substring(11, 19)
    } else if (type === 'month') {
      return date.substring(0, 7)
    }
  },
  getPhoneTime(t = new Date().getTime(), type = 'dateTime') {
    let d = new Date(t)
    const date =
      d.getFullYear() +
      '-' +
      (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
      '-' +
      (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
      ' ' +
      (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
      ':' +
      (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
      ':' +
      (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())

    if (type === 'dateTime') {
      return date
    } else if (type === 'dateTimeWithOutSecond') {
      return date.substring(0, 16)
    } else if (type === 'date') {
      return date.substring(0, 10)
    } else if (type === 'time') {
      return date.substring(11, 16)
    } else if (type === 'noSecond') {
      return date.substring(0, 16)
    }
  },
  // 弹出确认框
  confirm(content, cb, isCancle = true) {
    uni.showModal({
      title: '提示',
      content: content,
      showCancel: isCancle,
      success: function (res) {
        if (res.confirm) {
          if (cb) cb()
        }
      }
    })
  },
  // 轻提示
  toast(title, cb = 'none') {
    uni.showToast({
      title: title,
      icon: cb
    })
  },
  // 底部弹出菜单
  actionsheet(arr, cb) {
    if (arr.length === 0) return
    let newArr
    if (typeof arr[0] === 'object') {
      newArr = arr.map((item) => {
        return item.label
      })
    } else {
      newArr = arr
    }
    uni.showActionSheet({
      itemList: newArr,
      success: function (res) {
        if (typeof arr[0] === 'object') {
          cb(arr[res.tapIndex])
        } else {
          cb(res.tapIndex)
        }
      },
      fail: function (res) {}
    })
  },
	// oss图片上传 code:学生code file: 上传文件或base64 fileType: 文件类型，base64时传jpg
	ossUpload(code, file, fileType = 'jpg', callback) {
		console.log(code, file, fileType)
		const _self = this
		axios.get(`http://canpointlive.com:8090/ossApi/oss-policy?schoolCode=${code}&fileType=${fileType}`).then(res => {
			const aliyunOssToken = res.data.data
			var formData = new FormData()
			// 注意formData里append添加的键的大小写
			formData.append('key', aliyunOssToken.startsWith) // 存储在oss的文件路径
			formData.append('OSSAccessKeyId', aliyunOssToken.OSSAccessKeyId) // accessKeyId
			formData.append('policy', aliyunOssToken.policy) // policy
			formData.append('callback', aliyunOssToken.callback)
			formData.append('Signature', aliyunOssToken.signature) // 签名
			const _file = typeof file === 'object' ? file : _self.dataURLToBlob(file)
			formData.append('file', _file)
			formData.append('success_action_status', 200) // 成功后返回的操作码
			axios
				.post('/oss_upload', formData)
				.then(function(res) {
					callback(res.data.data)
				})
				.catch(() => {
					callback()
				})
		})
	},
  /**
   * 判断微信还是普通浏览器
   */
  isWx() {
    var ua = navigator.userAgent.toLowerCase()
    var isWeixin = ua.indexOf('micromessenger') != -1
    if (isWeixin) {
      return true
    } else {
      return false
    }
  },
  /*判断客户端*/
  getClient() {
    let client = ''
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      //判断iPhone|iPad|iPod|iOS
      client = 'IOS'
    } else if (/(Android)/i.test(navigator.userAgent)) {
      //判断Android
      client = 'Android'
    } else {
      client = 'PC'
    }
    return client
  },
  // 微信api上传图片
  wxPhoto(cb, tag = false) {
    let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    const _self = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        var localId = res.localIds[0]
        wx.getLocalImgData({
          localId: localId, // 图片的localID
          success: function (res) {
            let localData = res.localData // localData是图片的base64数据，可以用img标签显示
            if (!isiOS) {
              localData = 'data:image/jpeg;base64,' + localData
            }
            if (tag) {
              cb(res.localIds[0])
              return
            }
            _self.checkUserPhoto(localData, cb)
          }
        })
      }
    })
  },
  // 选择照片
  choosePhoto(cb, tag = false) {
    if (this.isWx()) {
      this.wxPhoto(cb, tag)
      return
    }
    uni.chooseImage({
      success: (chooseImageRes) => {
        for (let i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
          const file = chooseImageRes.tempFilePaths[i]
          if (tag) {
            cb(file)
            return
          }
          const img = new Image()
          img.src = file
          const _self = this
          img.onload = function () {
            if (_self.getClient() === 'IOS') {
              EXIF.getData(img, function () {
                // 获取图片旋转标志位
                var orientation = parseInt(EXIF.getTag(this, 'Orientation'))
                // 根据旋转角度，在画布上对图片进行旋转
                if (orientation === 3 || orientation === 6 || orientation === 8) {
                  const canvas = document.createElement('canvas')
                  const ctx = canvas.getContext('2d')
                  if (img.width > 800 || img.height > 800) {
                    if (img.width > img.height) {
                      img.width = parseInt(700 * (img.height / img.width))
                    } else {
                      img.width = parseInt(700 * (img.width / img.height))
                    }
                    img.height = 700
                  }
                  canvas.width = img.width
                  canvas.height = 700
                  switch (orientation) {
                    case 3: // 旋转180°
                      ctx.rotate((180 * Math.PI) / 180)
                      ctx.drawImage(img, -img.width, -img.height, img.width, img.height)
                      break
                    case 6: // 旋转90°
                      ctx.rotate((90 * Math.PI) / 180)
                      ctx.drawImage(img, 0, -img.width, img.height, img.width)
                      break
                    case 8: // 旋转-90°
                      ctx.rotate((-90 * Math.PI) / 180)
                      ctx.drawImage(img, -img.height, 0, img.height, img.width)
                      break
                  }
                  const base64 = canvas.toDataURL('image/jpeg')
                  _self.checkUserPhoto(base64, cb)
                } else {
                  _self.compressImg(img, cb)
                }
              })
            } else {
              _self.compressImg(img, cb)
            }
          }
        }
      }
    })
  },
  // 压缩图片
  compressImg(img, cb) {
    const canvas = document.createElement('canvas')
    if (img.height > 800 || img.width > 800) {
      if (img.width > img.height) {
        canvas.width = parseInt(700 * (img.height / img.width))
      } else {
        canvas.width = parseInt(700 * (img.width / img.height))
      }
      canvas.height = 700
    } else {
      canvas.width = img.width
      canvas.height = img.height
    }
    const context = canvas.getContext('2d')
    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
    const base64 = canvas.toDataURL('image/jpeg')
    this.checkUserPhoto(base64, cb)
  },
  // 人脸图片校验
  async checkUserPhoto(baseImg, cb) {
		const _self = this
		var source_img_obj = new Image();
		source_img_obj.src = baseImg;
		source_img_obj.onload = async function() {
			var cvs = document.createElement('canvas');
			var scale = this.height / this.width;
			cvs.width = 500;
			cvs.height = 500 * scale;
			var ctx = cvs.getContext("2d");
			ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
			var newImageData = cvs.toDataURL('image/jpeg', 0.6);
			try {
			  const res = await $ajax.postForm({
			    url: `${hostEnv.hpb_face}/facePhoto`,
			    params: {
			      userCode: Math.floor(Math.random() * 100000),
			      file: newImageData.split(',')[1]
			    }
			  })
			  if (res.data.result) {
			    cb(res.data.url)
			  } else {
			    _self.confirm('人脸照片不符合规范，请重新上传', null, false)
			  }
			} catch (err) {}
		}
  },
  // 查最新学年
  async getSchoolYear(userInfo, callBack) {
    let schoolYearInfo = {}
    let res = await $ajax.postForm({
      url: `${hostEnv.lz_user_center}/schoolYearSemester/list`,
      params: {
        schoolCode: userInfo.schoolCode
      }
    })
    if (res.data) {
      schoolYearInfo.schoolYear = res.data.list[0].schoolYear
      schoolYearInfo.schoolYearId = res.data.list[0].id
    } else {
      schoolYearInfo = null
    }
    if (callBack) callBack(schoolYearInfo)
    return schoolYearInfo
  },
  // 验证是否是校医
  async isDoctor(userInfo) {
    let userDetail = {}
    let res = await $ajax.get({
      url: `${hostEnv.zk_ncov}/mobile/day/report/getSchoolDoctor`,
      params: {
        userCode: userInfo.userCode,
        schoolCode: userInfo.schoolCode
      }
    })
    userDetail.isDoctor = res.data
    return userDetail
  },
  // 验证是否是班主任
  async isBZR(userInfo, callBack) {
    let userDetail = {}
    let res = await $ajax.get({
      url: `${hostEnv.zx_mobile_user}/mobile/user/info/bind/clazz/info`,
      params: {
        schoolCode: userInfo.schoolCode,
        userType: userInfo.typeCode,
        userCode: userInfo.userCode
      }
    })
    if (res.data.classInfos) {
      userDetail = res.data.classInfos
    } else {
      userDetail = null
    }
    if (callBack) callBack(userDetail)
    return userDetail
  },
  // html图片转换格式的方法
  dataURLToBlob(dataurl) {
    // console.log(dataurl)
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {
      type: mime
    })
  },
  // 验证是否是宿管
  async isDormMamage(userInfo) {
    let userDetail = {}
    let res = await $ajax.get({
      url: `${hostEnv.ljj_dorm}/role/dorm/get`,
      params: {
        schoolCode: userInfo.schoolCode,
        staffCode: userInfo.userCode
      }
    })
    if (res.data) {
      userDetail.buildingCode = res.data.buildingCode
      userDetail.buildingName = res.data.buildingName
    } else {
      userDetail = null
    }
    return userDetail
  },
  // // 获取家长类型
  getParentType(type) {
    let msg = ''
    switch (parseInt(type)) {
      case 1:
        msg = '爸爸'
        break
      case 2:
        msg = '妈妈'
        break
      case 3:
        msg = '爷爷'
        break
      case 4:
        msg = '奶奶'
        break
      case 5:
        msg = '其他'
        break
      default:
        msg = '其他'
        break
    }
    return msg
  },
  inputScroll() {
    // 处理界面错位问题
    document.body.addEventListener('focusin', () => {
      this.isReset = false
    })
    document.body.addEventListener('focusout', () => {
      this.isReset = true
      setTimeout(() => {
        if (this.isReset) {
          window.scrollTo(0, 0)
        }
      }, 100)
    })
  },
  // 判断男女
  getSex(type) {
    let msg = ''
    switch (parseInt(type)) {
      case 1:
        msg = '男'
        break
      case 2:
        msg = '女'
        break
      default:
        msg = '未知'
        break
    }
    return msg
  },
  //截取base64
  splitBase64(photoUrls) {
    return photoUrls.map((el) => {
      return el.split(',')[1]
    })
  },
  // 事故等级
  accidentLevel(text) {
    text = parseInt(text)
    if (text === 1) {
      return '特大重大事故'
    } else if (text === 2) {
      return '重大事故'
    } else if (text === 3) {
      return '较大事故'
    } else if (text === 4) {
      return '一般事故'
    }
  },
  // 事故性质
  accidentNature(text) {
    text = parseInt(text)
    if (text === 1) {
      return '责任事故'
    } else if (text === 2) {
      return '自然事故'
    } else if (text === 3) {
      return '技术事故'
    } else if (text === 4) {
      return '其它'
    }
  },
  // 事故类型
  accidentType(text) {
    text = parseInt(text)
    if (text === 1) {
      return '交通事故'
    } else if (text === 2) {
      return '踩踏事故'
    } else if (text === 3) {
      return '溺水事故'
    } else if (text === 4) {
      return '火灾事故'
    } else if (text === 5) {
      return '触电事故'
    } else if (text === 6) {
      return '校园伤害'
    } else if (text === 7) {
      return '其它'
    }
  },
  // 事故状态
  accidentStatus(text) {
    text = parseInt(text)
    if (text === 1) {
      return '新填报'
    } else if (text === 2) {
      return '处理中'
    } else if (text === 3) {
      return '已结案'
    }
  }
}

export default tools

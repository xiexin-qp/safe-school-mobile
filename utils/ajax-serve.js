/**
 * @description 封装http请求功能
 * @author zhangli
 */

import axios from 'axios'
import qs from 'qs'

// 请求超时时间
axios.defaults.timeout = 15000
axios.defaults.withCredentials = true // 让ajax携带cookie

// 拦截请求
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 拦截响应
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

const showToast = (tip = '努力加载中.') => {
	uni.showLoading({
	    title: tip
	});
}

// 处理响应结果
function responseRes (res) {
  // 清除加载
	uni.hideLoading()
  return new Promise((resolve, reject) => {
    if (res.code === 200 || res.status === true) {
      resolve(res)
    } else if (res.code === 401) {
    } else {
      reject(res)
    }
  })
}
const $ajax = {
  async get (obj, tag = true) {
    if (tag) showToast()
    try {
      let res = await axios.get(obj.url, {
        params: obj.params || ''
      })
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err)
    }
  },
  async postForm (obj, tag = true) {
    if (tag) showToast()
    try {
      let res = await axios.post(obj.url, qs.stringify(obj.params))
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err)
    }
  },
   async getWithPara (obj, tag = true) {
      if (tag) showToast()
      try {
        let res = await axios({
          url: obj.url + obj.params,
          method: 'get'
        })
        res = res.data
        return responseRes(res)
      } catch (err) {
        return responseRes(err.response.data, false)
      }
    },
  async post (obj, tag = true) {
    try {
      let res = await axios({
        url: obj.url,
        method: 'post',
        data: obj.params,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err)
    }
  },
   async postQuery(obj, tag = true) {
     if (tag) showToast()
     let url = obj.url + '?'
     for (const key in obj.params) {
       url += key + '=' + obj.params[key] + '&'
     }
     try {
       let res = await axios.post(url, qs.stringify({}))
       res = res.data
       return responseRes(res)
     } catch (err) {
       return responseRes(err.response.data)
     }
   },
   async del(obj, tag = true) {
     if (tag) showToast()
     try {
       let res = await axios.delete(obj.url, {})
       res = res.data
       return responseRes(res)
     } catch (err) {
       return responseRes(err.response.data)
     }
   },
   async delQuery(obj, tag = true) {
     if (tag) showToast()
     let url = obj.url + '?'
     for (const key in obj.params) {
       url += key + '=' + obj.params[key] + '&'
     }
     try {
       let res = await axios.delete(url, {})
       res = res.data
       return responseRes(res)
     } catch (err) {
       return responseRes(err.response.data)
     }
   },
   async put(obj, tag = true) {
     if (tag) showToast()
     try {
       let res = await axios.put(obj.url, qs.stringify(obj.params))
       res = res.data
       return responseRes(res)
     } catch (err) {
       return responseRes(err.response.data)
     }
   },
   async getWithPara(obj, tag = true) {
     if (tag) showToast()
     try {
       let res = await axios({
         url: obj.url + obj.params,
         method: 'get'
       })
       res = res.data
       return responseRes(res)
     } catch (err) {
       return responseRes(err.response.data)
     }
   }
 }
 
 export default $ajax

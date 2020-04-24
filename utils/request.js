import uniRequest from 'uni-request'
import qs from 'qs'
import axios from 'axios'
// 请求拦截
uniRequest.interceptors.request.use(
    request => {
        return request;
    },
    err => {
        return Promise.reject(err);
    });

// 响应拦截A
uniRequest.interceptors.response.use(function(response) {
    return Promise.resolve(response);
}, function(error) {
    return Promise.reject(error);
});

const showToast = (tip = '努力加载中.') => {
	uni.showLoading({
	    title: tip
	});
}

function responseRes (res) {
  // 清除加载
	uni.hideLoading()
  return new Promise((resolve, reject) => {
    if (res.code === 200 || res.status === true) {
      resolve(res)
    } else if (res.code === 401) {
    } else {
			uni.showToast({
				title: res.message,
				icon: 'none'
			});
      reject(res)
    }
  })
}

const $ajax = {
  async get (obj, tag = true) {
    if (tag) showToast()
    try {
      let res = await uniRequest.get(obj.url, {
        params: obj.params || ''
      })
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err)
    }
  },
	async getUrl (obj, tag = true) {
	  if (tag) showToast()
	  try {
	    let res = await uniRequest.get(obj.url)
	    res = res.data
	    return responseRes(res)
	  } catch (err) {
	    return responseRes(err)
	  }
	},
  async postForm (obj, tag = true) {
    if (tag) showToast()
    try {
      let res = await uniRequest.post(obj.url, qs.stringify(obj.params))
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
	    let res = await uniRequest.post(url, qs.stringify({}))
	    res = res.data
	    return responseRes(res)
	  } catch (err) {
	    return responseRes(err.response.data)
	  }
	},
  async post (obj, tag = true) {
		if (tag) showToast()
    try {
      let res = await uniRequest({
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
  async del(obj, tag = true) {
    if (tag) showToast()
    try {
      let res = await uniRequest.delete(obj.url, {})
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
      let res = await uniRequest.delete(url, {})
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err.response.data)
    }
  },
}

export default $ajax
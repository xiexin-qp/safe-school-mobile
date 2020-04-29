import uniRequest from 'uni-request'
import qs from 'qs'
// 请求拦截
uniRequest.interceptors.request.use(
	request => {
		return request;
	},
	err => {
		return Promise.reject(err);
	});

// 响应拦截
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

function responseRes(res) {
	// 清除加载
	uni.hideLoading()
	return new Promise((resolve, reject) => {
		if (res.code === 200 || res.status === true) {
			resolve(res)
		} else if (res.code === 401) {} else {
			uni.showToast({
				title: res.message || '请求服务失败~',
				icon: 'none'
			});
		}
	})
}

// post请求
const post = (obj) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: obj.url,
			data: JSON.stringify(obj.params),
			header: {
				'Content-Type': 'application/json',
			},
			method: 'post',
			success: (data) => {
				const res = data.data
				if (res.code === 200) {
					resolve(res)
				} else {
					responseRes(res)
				}
			},
		})
	})
} 

const $ajax = {
	async get(obj, tag = true) {
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
	async getUrl(obj, tag = true) {
		if (tag) showToast()
		try {
			let res = await uniRequest.get(obj.url)
			res = res.data
			return responseRes(res)
		} catch (err) {
			return responseRes(err)
		}
	},
	async postForm(obj, tag = true) {
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
			let res = await uniRequest.post(url)
			res = res.data
			return responseRes(res)
		} catch (err) {
			return responseRes(err.response.data)
		}
	},
	async post(obj, tag = true) {
		if (tag) showToast()
		try {
			let res = await post(obj)
			return responseRes(res)
		} catch (err) {
			return responseRes(err.response.data)
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

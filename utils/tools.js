/**
 * @description 公共函数模块
 */

const tools = {
	// 路由跳转
	navTo({
		url,
		title = '平安校园'
	} = params) {
		document.title = title
		uni.navigateTo({
			url
		})
	},
	// 路由返回
	goBack(delta = 1) {
		uni.navigateBack({
			delta
		});
	},
	// 获取url传到参数
	getQuery () {
		const url = window.location.href
		const params = url.substr(url.lastIndexOf('?')).replace('#/', '')
		console.log(params)
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
			success: function(res) {
				if (res.confirm) {
					cb()
				}
			}
		});
	},
	// 延迟执行
	goNext: fn => {
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
		}else if (type === 'date') {
			return date.substring(0, 10)
		} else if (type === 'time') {
			return date.substring(11, 16)
		} else if (type === 'noSecond') {
			return date.substring(0, 16)
		}
	},
	// 弹出确认框
	confirm(content, cb) {
		uni.showModal({
			title: '提示',
			content: content,
			success: function(res) {
				if (res.confirm) {
					cb()
				}
			}
		});
	},
	// 轻提示
	toast(title, cb= 'none') {
		uni.showToast({
			title: title,
			icon: cb
		});
	},
	// 底部弹出菜单
	actionsheet(arr, cb) {
		if (arr.length === 0) return
		let newArr
		if (typeof arr[0] === 'object') {
				newArr = arr.map(item => {
					return item.label
				})
		} else {
			newArr = arr
		}
		uni.showActionSheet({
			itemList: newArr,
			success: function(res) {
				if (typeof arr[0] === 'object') {
					cb(arr[res.tapIndex])
				} else {
					cb(res.tapIndex)
				}
			},
			fail: function(res) {}
		});
	}
}

export default tools

/**
 * @description 注册全局过滤器
 */

import Vue from 'vue'

const filters = {
	// 去掉时间中的.0
	getFullDate: val => {
		return val.split('.').length > 0 ? val.split('.')[0] : val
	},
	// 日期转化
	gmtToDate(date, type = 'dateTime') {
		if (!date) {
			return '--'
		}
		const d = new Date(date)
		const time = d.getFullYear() + '-' + ((d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' +
			(d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) + ' ' +
			(d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) + ':' + (d.getMinutes() > 9 ? d.getMinutes() : '0' +
				d.getMinutes()) +
			':' + (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
		if (type === 'dateTime') {
			return time
		} else if (type === 'date') {
			return time.substring(0, 10)
		} else if (type === 'time') {
			return time.substring(11, 16)
		}
	},
	// 访客状态
	visitState: val => {
		if (val == '0') {
			return '待访问'
		} else if (val == '1') {
			return '在访'
		} else if (val == '2') {
			return '签离'
		}
	},
	// 审批状态
	approveState: val => {
		if (val == 0) {
			return '待审批'
		} else if (val == 1) {
			return '同意'
		} else if (val == 2) {
			return '不同意'
		} else if (val == 3) {
			return '撤销'
		} else if (val == 4) {
			return '失效'
		}
	},
	getState: value=> {
		if (value === 1) {
			return '迟到'
		} else if (value === 2) {
			return '早退'
		} else if (value === 3) {
			return '上学缺卡'
		} else if (value === 4) {
			return '请假'
		} else if (value === 5) {
			return '正常'
		} else if (value === 6) {
			return '放学缺卡'
		} else {
			return '缺卡'
		}
	}
}

for (let key in filters) {
	Vue.filter(key, filters[key])
}

/**
 * @description 注册全局过滤器
 */

import Vue from 'vue'

const filters = {
  // 示例
  setTime: val => {
    return val.substring(0, 10)
  },
  // 访客状态
  visitState: val => {
    if(val === '0'){
		return '待访问'
	} else if(val === '1'){
		return '在访'
	} else if(val === '2'){
		return '签离'
	}
  },
  // 审批状态
  approveState: val => {
    if(val === 0){
  		return '待审批'
  	} else if(val === 1){
  		return '同意'
  	} else if(val === 2){
  		return '不同意'
  	} else if(val === 3){
  		return '撤销'
  	} else if(val === 4){
  		return '失效'
  	}
  }
}

for (let key in filters) {
  Vue.filter(key, filters[key])
}

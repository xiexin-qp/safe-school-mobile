/**
 * @des 接口配置列表
 */
import hostEnv from '@config/index.js'
import home from './home'
import message from './message'


let apiList = {
  ...home,
	...message,
	unbindChild: `${hostEnv.ljj_user_center}/parent/children/unbind/by/childcode/and/parentcode#get`
}

export default apiList

/**
 * @des 接口配置列表
 */

import home from './home'
import hostEnv from '@config/index.js'

let apiList = {
  ...home,
	unbindChild: `${hostEnv.ljj_user_center}/parent/children/unbind/by/childcode/and/parentcode#get`
}

export default apiList

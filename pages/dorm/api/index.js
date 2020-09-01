/**
 * @des 接口配置列表
 */

import homeApi from './home'
import totalApi from './total'
import manageApi from './manage'
import bindApi from './bind'
import parentApi from './parent'
const apiList = {
  ...totalApi,
  ...manageApi,
  ...bindApi,
  ...parentApi,
	...homeApi,
}

export default apiList

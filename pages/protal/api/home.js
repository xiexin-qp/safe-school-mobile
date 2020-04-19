/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../config/index.js'

let homeApi = {
  getAppList: 'http://ai2.canpoint.net/baseEnv/data/query/menu/tree/list?schoolCode=CANPOINT&roleCode=BZR#get', // 获取应用列表
}

for (let val in homeApi) {
  homeApi[val] = `${hostEnv.hostEnv}${homeApi[val]}`
}

export default homeApi

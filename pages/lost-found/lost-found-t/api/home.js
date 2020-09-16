/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../../config/index.js'

let homeApi = {
  addlost: '/lost/and/found/add#post', // 新增
  lostList: '/lost/and/found/list#post' ,// 列表
  delLost:'/lost/and/found/delete#del'
}

for (let val in homeApi) {
  homeApi[val] = `${hostEnv.cl_class}${homeApi[val]}`
}
export default homeApi
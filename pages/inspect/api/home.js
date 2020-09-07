/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../config/index'

let homeApi = {
  getInspectList: '/patrol/page/mobile#post', // 移动端巡查值班分页查询

}
for (let val in homeApi) {
  homeApi[val] = `${hostEnv.lz_safe}${homeApi[val]}`
}
export default homeApi
/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../config/index'

let homeApi = {
  getAccidentList: '/accident/page/mobile#post', // 移动端分页条件查询事故列表
  getSpecialDetail: '/specialTask/info#getUrl', // 局端/校端查看任务详情
  getGroupDetail: '/danger/group/info#get', // 隐患小组详情
  reportDanger: '/dangerTask/add/special/mobile#post' // 专项检查-移动端上报隐患

}
for (let val in homeApi) {
  homeApi[val] = `${hostEnv.lz_safe}${homeApi[val]}`
}
export default homeApi
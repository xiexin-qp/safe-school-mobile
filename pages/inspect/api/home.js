/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../config/index'

let homeApi = {
  startDuty: '/patrol/start#post', // 开始巡查值班
  addInspectTask: '/dangerTask/add/patrol/mobile#post', // 巡查值班-移动端上报隐患
  getGroupDetail: '/danger/group/info#get', // 隐患小组详情
  getInspectDetail: '/patrol/info/mobile#getUrl', // 移动端根据id查询巡查详情
  submitInspect: '/patrol/result#post', // 提交巡查点结果
  endInspect: '/patrol/end#post', // 结束巡查值班

}
for (let val in homeApi) {
  homeApi[val] = `${hostEnv.lz_safe}${homeApi[val]}`
}
export default homeApi
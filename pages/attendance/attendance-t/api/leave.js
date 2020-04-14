/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../../config/index.js'

let leaveApi = {
  getIndex: 'http://yapi.demo.qunar.com/mock/5691/getDemoList#get', // 获取列表
  getDetail: 'http://yapi.demo.qunar.com/mock/5691/getDemoInfo#get', // 获取详情
  getLeaveReason: '/leave/reason/getList#get', // 请假理由列表
  addTeacherLeave: '/teacher/leave/add#post', // 新增教职工请假
}

for (let val in leaveApi) {
  leaveApi[val] = `${hostEnv.zk}${leaveApi[val]}`
}

export default leaveApi
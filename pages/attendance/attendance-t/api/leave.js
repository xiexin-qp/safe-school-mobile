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
  getTeacherLeave: '/teacher/leave/list#post', // PC 教职工分页查询请假单
  getLeaveDetail: '/teacher/leave/detailByNumbers/#getWithPara', // 根据请假单号获取请假单全部信息
  getApprovalLeave: '/leave/approval/getApprovalLeaveByUserCode#post', // 查询归自己审批的请假单
  getCopyLeave: '/leave/copy/getCopyLeaveByUserCode#post', // 查询抄送给自己的请假单
  recallLeave: '/teacher/leave/withdraw/#get', // 撤回教职工请假单
  approvalLeave: '/leave/approval/approvalTeacherLeave#post' // 审批请假单
 
  
}

for (let val in leaveApi) {
  leaveApi[val] = `${hostEnv.zk}${leaveApi[val]}`
}

export default leaveApi
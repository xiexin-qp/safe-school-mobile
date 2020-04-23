/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../../config/index.js'

let applyApi = {
  getOrgUser: '/userinfo/teacher/user/queryTeacherInfo#post', // 获取教职工信息列表
  getClassStudent: '/student/class/list#post' // 班级学生列表查询
}

for (let val in applyApi) {
  applyApi[val] = `${hostEnv.lz_user_center}${applyApi[val]}`
}

export default applyApi
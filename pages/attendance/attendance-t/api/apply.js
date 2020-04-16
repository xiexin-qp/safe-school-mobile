/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../../config/index.js'

let applyApi = {
  getOrgUser: '/userinfo/teacher/user/queryTeacherInfo#post' // 获取教职工信息列表
}

for (let val in applyApi) {
  applyApi[val] = `${hostEnv.apply}${applyApi[val]}`
}

export default applyApi
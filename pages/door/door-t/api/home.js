/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../../config/index.js'

let homeApi = {
  addgroupList: '/setting/rule/group/add#post', // 添加/编辑权限组列表
  delgroupList: '/setting/rule/group/delete#post', // 权限组删除
  getrecordDetail: '/setting/rule/group/detail#get', // 权限组详细信息
  getrecordList: '/setting/rule/group/list#post', // 权限组列表
  addgroupuserList: '/setting/rule/group/user/add#post', // 权限组添加人员
  delgroupuserList: '/setting/rule/group/user/delete#post', // 权限组删除人员
  getgroupuserList: '/setting/rule/user/list#post' // 权限组人员列表
}

for (let val in homeApi) {
  homeApi[val] = `${hostEnv.zx}${homeApi[val]}`
}

export default homeApi
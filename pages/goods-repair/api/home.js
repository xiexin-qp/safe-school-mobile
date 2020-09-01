/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../config/index.js'
const baseData1Api = {
  // 场地管理
  getSiteList: '/place/manage/getFirstStagePlaceList#get', // 查询场地信息列表
  getChildSite: '/place/manage/getPlaceManageList#post', // 查询场地子节点列表

}
const baseData2Api = {
  // 组织机构
  getOrgBySchool: '/school/org/getSchoolRoot#getUrl', // 查询组织机构
  getOrgList: '/school/org/detail#getUrl', // 通过组织结构Id查询组织结构

  // 年级管理
  getSchoolYear: '/schoolYearSemester/list#postForm', // 查询学年列表
  getGradeData: '/grade/manage/list#postForm', // 查询年级列表

  // 班级管理
  getClassData: '/classManage/list#post', // 查询班级列表

  //教师管理
  getTeacherList: '/userinfo/teacher/user/queryTeacherInfo#post', // 查询教职工列表
  getNoneTeacher: '/userinfo/teacher/user/node/teachers#post', // 查询无组织机构教职工
}
let zkApi = {
  // 物品报修
  getRepairList: '/repair/record/getPageList#post', // 报修单列表查询
  addRepair: '/repair/record/saveOrUpdate#post', // 新增修改报修单
  getTypeList: '/material/type/getPage#post', // 物品分类列表
  getNameList: '/material/name/getPage#post', // 物品分类列表
  getRepairDetail: '/repair/record/getRepairRecordAllINfoById/#getUrl', //查报修详情
  changeState: '/repair/state/changeState#post', //撤回，审批，拒绝
  appointApproval: '/repair/approval/appointApproval#post', //指定他人审批
}

for (const val in baseData1Api) {
  baseData1Api[val] = `${hostEnv.zk_school}${baseData1Api[val]}`
}
for (const val in baseData2Api) {
  baseData2Api[val] = `${hostEnv.lz_user_center}${baseData2Api[val]}`
}
for (let val in zkApi) {
  zkApi[val] = `${hostEnv.zk_oa}${zkApi[val]}`
}

export default {
  ...baseData1Api,
  ...baseData2Api,
  ...zkApi
}
/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../config/index.js'
let schoolApi = {
	getSchoolList: `${hostEnv.zk_school}/school/info/getSchoolInfoListPage#post`, // 获取学校列表
}
let gradeApi = {
	getGradeList: `${hostEnv.lz_user_center}/grade/manage/list#postQuery`, // 获取年级列表
	getClassList: `${hostEnv.lz_user_center}/classManage/list#post` // 获取班级列表
}
let homeApi = {
	login: '/mobile/user/info/login#post', // 用户登录
	loginOut: '/mobile/user/info/signOut#getUrl', // 用户退出登录
	addLog: '/mobile/user/info/log/add#get', // 添加日志
	getUserInfo: '/mobile/user/info#getUrl', // 通过openid查询用户信息
	getCode: '/mobile/user/info/code/send#getUrl', // 获取验证码
	parentAdd: '/mobile/user/info/parent/add#post', // 家长注册
	bindChild: '/mobile/user/info/parent/student/add#post', // 家长绑定学生
	delChild: '/mobile/user/info/parent/student/del#del', // 家长删除绑定学生
	typeList: '/mobile/user/info/type/list#get', // 查询身份类型
	getChildList: '/mobile/user/info/bind/stu/info#get', // 查询绑定学生信息
	getClassInfo: '/mobile/user/info/bind/clazz/info#get' // 查询绑定的班级信息
}

for (let val in homeApi) {
  homeApi[val] = `${hostEnv.zx_mobile_user}${homeApi[val]}`
}

homeApi = {
	...homeApi,
	...schoolApi,
	...gradeApi
}

export default homeApi

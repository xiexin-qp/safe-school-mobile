/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '@config/index.js'
let schoolApi = {
	getSchoolList: `${hostEnv.zk_school}/school/info/getSchoolInfoListPage#post`, // 获取学校列表
}
let gradeApi = {
	getGradeList: `${hostEnv.lz_user_center}/grade/manage/list#postQuery`, // 获取年级列表
	getClassList: `${hostEnv.lz_user_center}/classManage/list#post`, // 获取班级列表
	getClassListByTeacher: `${hostEnv.lz_user_center}/userinfo/teacher/user/classinfo#get`, // 获取教职工任课班级
}
let homeApi = {
	login: '/mobile/user/info/login#post', // 用户登录
	loginOut: '/mobile/user/info/signOut#getUrl', // 用户退出登录
	addLog: '/mobile/user/info/log/add#post', // 添加日志
	getUserInfo: '/mobile/user/info#getUrl', // 通过openid查询用户信息
	getCode: '/mobile/user/info/code/send#getUrl', // 获取验证码
	parentAdd: '/mobile/user/info/parent/add#post', // 家长注册
	bindChild: '/mobile/user/info/parent/student/add#post', // 家长绑定学生
	addBindChild: '/mobile/user/info/parent/addAndbind#post', // 家长先注册再绑定孩子
	delChild: '/mobile/user/info/parent/student/del#del', // 家长删除绑定学生
	typeList: '/mobile/user/info/type/list#get', // 查询身份类型
	getChildList: '/mobile/user/info/bind/stu/info#get#false', // 查询绑定学生信息/mobile/user/info/parent/addAndbindbindChild
	getClassInfo: '/mobile/user/info/bind/clazz/info#get', // 查询绑定的班级信息
	getTypeList: '/mobile/user/info/type/list#get#false', // 查询用户拥有的身份
	changePhone: '/mobile/user/info/mobile/update#postQuery'
}
let newsApi = {
	getNewsList: `${hostEnv.zq_news}/news/list#post`, // 新闻列表
	getlistByUser: `${hostEnv.zq_news}/notice/listByUser#post`, // 用户查询公告列表
	getlistByTeacher: `${hostEnv.zq_news}/notice/listByTeacher#post` // 老师查询公告列表
}
let introApi = {
	getChildIntro: `${hostEnv.ljj_user_center}/user/introduction/query/student/introduction#get`, // 家长获取孩子简介
	getIntro: `${hostEnv.ljj_user_center}/user/introduction/query/user/introduction#get`, // 查询个人简介
	editIntro: `${hostEnv.ljj_user_center}/user/introduction/save/and/update#post` // 编辑修改个人简介
}
for (let val in homeApi) {
	homeApi[val] = `${hostEnv.zx_mobile_user}${homeApi[val]}`
}

homeApi = {
	...homeApi,
	...schoolApi,
	...gradeApi,
	...newsApi,
	...introApi,
	getMenuList: `${hostEnv.zx_protal}/role/manage/menu/multiple/tree/list#get`
}

export default homeApi

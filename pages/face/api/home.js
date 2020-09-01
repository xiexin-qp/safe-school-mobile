/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '@config'

let homeApi = {
	facePhoto: '/facePhoto#postForm'
}
let gradeApi = {
	gradeList: '/grade/manage/list#postForm', // 
	classList: '/classManage/list#post', // 获取班级
	studentList: '/userinfo/student/user/queryStudentInfoList#post', // 学生列表
	updateStudent: '/userinfo/student/user/update#post', // 更新学生
	updateTeacher: '/userinfo/teacher/user/update#post', // 更新教职工
	updatePhoto: '/userinfo/update/photo#post' // 更新人脸
}

for (let val in gradeApi) {
  gradeApi[val] = `${hostEnv.lz_user_center}${gradeApi[val]}`
}
for (let val in homeApi) {
  homeApi[val] = `${hostEnv.hpb_face}${homeApi[val]}`
}

export default { ...homeApi, ...gradeApi }

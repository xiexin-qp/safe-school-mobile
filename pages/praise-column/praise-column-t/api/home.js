/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../../config/index.js'

let gradeApi = {
  getGradeList: '/grade/manage/list#postForm', //
  getClassList: '/classManage/list#post', // 获取班级
  getStudentList: '/userinfo/student/user/queryStudentInfoList#post', // 获取所有学生
}
let showApi = {
  // 表扬语
  addPraise: '/praise/label/set/add#post', // 添加表扬语
  delPraise: '/praise/label/set/delete#delForm', // 删除
  praiseList: '/praise/label/set/list#post', // 表扬语列表
  updatePraise: '/praise/label/set/update#putJson', // 更新表扬语
  //表扬栏
  addsetPraise: '/praise/add#post', // 添加
  delsetPraise: '/praise/delete#delForm', // 删除
  praisesetList: '/praise/list#post', // 列表
  updatesetPraise: '/praise/update#putJson', // 更新
  getpraiseDetail:'/praise/detail#getUrl',//详情
  getfindPraise:'/praise/findCountByUserId#post'//查看学生表扬
}

for (let val in gradeApi) {
  gradeApi[val] = `${hostEnv.lz_user_center}${gradeApi[val]}`
}
for (let val in showApi) {
  showApi[val] = `${hostEnv.cl_class}${showApi[val]}`
}

export default {
  ...gradeApi,
	...showApi,
<<<<<<< HEAD
	delFile: `${hostEnv.cl_oa}/study/theme/file/delete#delWithQuery` // 文件删除
=======
>>>>>>> 7f8bba79fd31b87e4116aa2b703b966b0335091b
}
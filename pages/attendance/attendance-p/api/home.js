/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../../config/index.js'

let homeApi = {
  getChildAttendance: '/attendance/mobile/child/day/record#get', // 孩子考勤,查询孩子某一天的打卡记录
  getChildStatic: '/attendance/mobile/child/month/state#get', // 孩子考勤,查询孩子一个月每天的状态
  childStaticDetail: '/attendance/mobile/child/month/static/detail#get', // 孩子考勤,查询孩子某月的状态天数
  classDayStatic: '/attendance/mobile/class/day/static#get', // 学生的考勤,查询某一天学生的出勤情况
  classDayStaticDetail: '/attendance/mobile/class/day/static/detail#get', // 学生的考勤,查询某一天具体状态的学生详情
  studentMonthRecord: '/attendance/mobile/student/month/record#get' // 考勤记录,查询一个月学生的考勤记录


  // getTeacherAttendance: '/attendance/mobile/my/day/record#get', // 我的考勤,查询教职工一天的出勤打卡记录
  // getTeacherStatic: '/attendance/mobile/my/month/static#get', // 我的统计,查询一个月出勤统计
  // teacherStaticDetail: '/attendance/mobile/my/month/static/detail#get', // 我的统计,查询一个月出勤统计明细
  // classDayStatic: '/attendance/mobile/class/day/static#get', // 学生的考勤,查询某一天学生的出勤情况
  // classDayStaticDetail: '/attendance/mobile/class/day/static/detail#get', // 学生的考勤,查询某一天具体状态的学生详情
  // studentMonthRecord: '/attendance/mobile/student/month/record#get' // 考勤记录,查询一个月学生的考勤记录
}

for (let val in homeApi) {
  homeApi[val] = `${hostEnv.lz}${homeApi[val]}`
}

export default homeApi

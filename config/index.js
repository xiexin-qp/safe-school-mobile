/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.NODE_ENV
let zx_mobile_user = ''
let wxz_contorl = ''
let zk_school = ''
let zk_leave = ''
let zk_ncov = ''
let zx_visitor = ''
let zx_door = ''
let zx_protal = ''
let lz_attendance = ''
let lz_user_center = ''
let ljj_user_center = ''
let mobile_img = ''
let ljj_dorm = ''
let baseEnv = ''
let hpb_face = ''
let zq_news = ''
let zk_moral = ''
let zk_message = ''
let zq_class = ''
let zq_schedule = ""
let zk_examplan = ''
let ljj_visitor = ''
let zq_behavior = ''
let wxz_control = ''
let zk_oa = ''
let host = ''
let lz_safe = ''
let cl_oa = ''

if (ConfigEnv === 'production') {
  host = 'http://canpointlive.com'
  zx_mobile_user = '/zx_mobile_user'
  wxz_contorl = '/wxz_contorl'
  zk_school = '/zk_school'
  zk_leave = '/zk_leave'
  zk_ncov = '/zk_ncov'
  zx_visitor = '/zx_visitor'
  zx_door = '/zx_door'
  zx_protal = '/zx_protal'
  lz_attendance = '/lz_attendance'
  lz_user_center = '/lz_user_center'
  ljj_user_center = '/ljj_user_center'
  zq_news = '/zq_news'
  hpb_face = '/hpb_face'
  ljj_dorm = '/ljj_dorm'
  baseEnv = '/baseEnv'
  zk_moral = '/zk_moral'
  zk_message = '/zk_message'
  zq_class = '/zq_class'
  zq_schedule = '/zq_schedule'
  zk_examplan = '/zk_examplan'
  ljj_visitor = '/ljj_visitor'
  zq_behavior = '/zq_behavior'
  cl_oa = '/cl_oa'
  wxz_control = '/wxz_control'
  zk_oa = '/zk_oa'
  lz_safe = '/lz_safe'
} else if (ConfigEnv === 'development') {
  host = 'http://canpointlive.com'
  zx_mobile_user = '/zx_mobile_user'
  wxz_contorl = '/wxz_contorl'
  zk_school = '/zk_school'
  zk_leave = '/zk_leave'
  zk_ncov = '/zk_ncov'
  zx_visitor = '/zx_visitor'
  zx_door = '/zx_door'
  zx_protal = '/zx_protal'
  lz_attendance = '/lz_attendance'
  lz_user_center = '/lz_user_center'
  ljj_user_center = '/ljj_user_center'
  zq_news = '/zq_news'
  hpb_face = '/hpb_face'
  ljj_dorm = '/ljj_dorm'
  baseEnv = '/baseEnv'
  zk_moral = '/zk_moral'
  zk_message = '/zk_message'
  zq_class = '/zq_class'
  zq_schedule = '/zq_schedule'
  zk_examplan = '/zk_examplan'
  ljj_visitor = '/ljj_visitor'
  zq_behavior = '/zq_behavior'
  wxz_control = '/wxz_control'
  zk_oa = '/zk_oa'
  lz_safe = '/lz_safe'
  cl_oa = '/cl_oa'

}

export default {
  host,
  zx_mobile_user,
  wxz_contorl,
  zk_school,
  zk_leave,
  zk_ncov,
  zx_visitor,
  zx_door,
  zx_protal,
  lz_attendance,
  lz_user_center,
  ljj_user_center,
  hpb_face,
  mobile_img,
  ljj_dorm,
  baseEnv,
  zq_news,
  zk_moral,
  zk_message,
  zq_class,
  zq_schedule,
  zk_examplan,
  ljj_visitor,
  zq_behavior,
  wxz_control,
  zk_oa,
  lz_safe,
  cl_oa

}
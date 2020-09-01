/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/index.js'

const messageApi = {
  searchPersonNotice: '/notice/user/query/person/plateform/notice#post', // 查询个人接受的消息
  searchNotice: '/noticeInfo/platform/list/by/condition#post', // 查询公告
	searchPersonTz: '/notice/user/query/person/notice#post', // 查看个人的通知
	searchPersonApp: '/notice/user/query/person/application/notice#post', // 查询个人的应用消息
  readPersonNotice: '/notice/user/read#post'
}
for (const val in messageApi) {
  messageApi[val] = `${hostEnv.zk_leave}${messageApi[val]}`
}
export default messageApi

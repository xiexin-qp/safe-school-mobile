/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../config/index.js'

const baseData3Api = {
	getDeviceList: '/device/info/queryDeviceInfos#post', // 获取设备列表
}
let zqApi = {
	// 场地预定
	getReserveListMobile: '/place/reserve/listMobile#post', // 场地预定列表查询
	getReserveList: '/place/reserve/list#post', // 场地预定列表查询
	checkReserve: '/place/reserve/dateIsAllow#post', // 查询场地预定时段是否有预定
	reserveDetail: '/place/reserve/detail#getUrl', // 查询场地预定详情
	addReserve: '/place/reserve/save#post', // 场地预定新增编辑
	delReserve: '/place/reserve/delete#delWithQuery', // 删除场地预定
	getSignDetail: '/place/reserve/signdetail#get', // 签到详情

	// 会议发布
	addMeetRecord: '/place/reserve/summary/add#post', // 新增会议纪要
	getMeetRecordById: '/place/reserve/summary/detail#getUrl', // 会议纪要
	signInById: '/place/reserve/addActiveUser#postQuery' ,// 签到人员录入
	
	delFile: '/study/theme/file/delete#delWithQuery' // 文件删除
}

for (const val in baseData3Api) {
	baseData3Api[val] = `${hostEnv.wxz_control}${baseData3Api[val]}`
}
for (let val in zqApi) {
	zqApi[val] = `${hostEnv.cl_oa}${zqApi[val]}`
}

export default {
	...baseData3Api,
	...zqApi
}

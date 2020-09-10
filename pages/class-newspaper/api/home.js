/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../config/index.js'

let showApi = {
  getNewspaperList: '/electronic/newspaper/list#post', // 查询班级电子板报列表
  addNewspaper: '/electronic/newspaper/add#post', // 添加电子板报
  deleNewspaper: '/electronic/newspaper/delete#delWithQuery' // 删除电子板报
}

for (let val in showApi) {
  showApi[val] = `${hostEnv.zq_class}${showApi[val]}`
}

export default {
  ...showApi,
	delFile: `${hostEnv.cl_oa}/study/theme/file/delete#delWithQuery` // 文件删除
}
/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../../config/index.js'

let showApi = {
	getClassMotto: '/class/info/list#get', // 班级格言
	getAlbumList: '/album/list#post', // 相册列表
	getAlbumPhotoList: '/album/albumContentlist#postWithQuery' // 相册相片列表
}

for (let val in showApi) {
  showApi[val] = `${hostEnv.zq_class}${showApi[val]}`
}


export default {
  ...showApi
}
/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */
import hostEnv from '../../../config/index'
// import hostEnv from '../../../../config/index.js'

let homeApi = {
  getEduRank: '/class/edu/category/copy/getRankingInfoById#get', // 根据评分项目id查询排名 
  getEduList: '/class/edu/category/copy/list#post', // 查询打分项目任务列表
  getEduDetail: '/class/edu/category/copy/selectAllInfoById#getUrl', // 打分项目 全部信息
  getScoreRecord: '/class/edu/category/copy/selectScoreInfoById#getUrl', // 打分项目 打分记录
  addScore: '/scoring/record/add#post', // 评分记录保存
  getScoreList: '/scoring/record/list#post' // 评分记录列表查询
}
for (let val in homeApi) {
  homeApi[val] = `${hostEnv.zk_moral}${homeApi[val]}`
}
export default homeApi

/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.NODE_ENV
let hostEnv = ''
let lz = ''
let zk = ''
let zx= ''
let mj= ''
let apply= ''

if (ConfigEnv === 'production') {
	hostEnv = ''
	lz = '/lz'
	zk = '/zk'
	zx = '/zx'
	mj = '/mj'
	apply = '/apply'
} else if (ConfigEnv === 'development') {
  hostEnv = ''
  lz = '/lz'
  zk = '/zk'
  zx = '/zx'
  mj = '/mj'
  apply = '/apply'
}

export default {
	hostEnv,
  lz,
  zk,
  zx,
  mj,
  apply
}

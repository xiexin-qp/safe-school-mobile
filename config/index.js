/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.NODE_ENV
let hostEnv = ''
let lz = ''
let zk = ''

if (ConfigEnv === 'production') {
  hostEnv = ''
} else if (ConfigEnv === 'development') {
  hostEnv = ''
  lz = '/lz'
  zk = '/zk'
}

export default {
	hostEnv,
  lz,
  zk
}

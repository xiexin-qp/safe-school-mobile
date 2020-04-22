/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.NODE_ENV
let hostEnv = ''
let zxprotal = ''
let lz = ''
let zk = ''
let zx = ''
let mj = ''
let apply = ''
let zkschool = ''
let lzadmin = ''

if (ConfigEnv === 'production') {
	hostEnv = ''
	zxprotal = ''
	lz = '/lz'
	zk = '/zk'
	zkschool = '/zkschool'
	lzadmin = ''
	zx = '/zx'
	mj = '/mj'
	apply = '/apply'
} else if (ConfigEnv === 'development') {
	hostEnv = ''
	zxprotal = '/zxprotal'
	lz = '/lz'
	zk = '/zk'
	zkschool = '/zkschool'
	lzadmin = '/lzadmin'
	zx = '/zx'
	mj = '/mj'
	apply = '/apply'
}

export default {
	hostEnv,
	zxprotal,
	lz,
	lzadmin,
	zk,
	zkschool,
	zx,
	mj,
	apply
}

import { store, setStore, actions } from './index.js'
const apiFun = {
	// 获取菜单权限
	async getMenuList () {
		const res = await actions.getMenuList({
			plateformType: 1,
			schoolCode: store.userInfo.schoolCode,
			userId: store.userInfo.userId,
			userType: store.userInfo.typeCode
		})
		setStore({
			key: 'appList',
			data: res.data
		})
	},
	// 获取绑定的孩子
	async getChildList () {
		const {schoolCode, userCode, typeCode} = store.userInfo
		const res = await actions.getChildList({
			schoolCode,
			userCode,
			userType: typeCode
		})
		setStore({
			key: 'childList',
			data: res.data
		})
	},
	// 判断是否有菜单权限
	isRoleApp (url) {
		const menuStr = JSON.stringify(store.appList)
		const tag = menuStr.indexOf(url) > -1 ? true : false
		return tag
	}
}

export default apiFun
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
	}
}

export default apiFun
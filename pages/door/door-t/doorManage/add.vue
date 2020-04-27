<template>
	<view class="qui-page">
		<view class="list">
			<view class="head"><uni-search-bar class="search" placeholder="输入姓名/手机号/工号搜索" @confirm="search"></uni-search-bar></view>
			<view class="th qui-fx-jsa qui-fx-ac qui-fx-jc title_">
				<text class="right">选择</text>
				<text class="right">姓名</text>
				<text class="right">工号</text>
				<text class="right">手机号</text>
			</view>
			<scroll-view scroll-y="true" class="scroll-h" @scrolltolower="loadMore">
				<checkbox-group @change="checkUser">
					<label class="tbody qui-bd-b qui-fx-jsb" v-for="(item, index) in dataList" :key="index">
						<checkbox :value="`${item.userCode}^${item.userName}`" class="left" :checked="item.checked"></checkbox>
						<label :for="item.userName">
							<text class="right">{{ item.userName }}</text>
						</label>
						<label :for="item.workNo"><text class="right">11</text></label>
						<label :for="item.mobile">
							<text class="right">{{ item.mobile }}</text>
						</label>
					</label>
				</checkbox-group>
			</scroll-view>
		</view>
		<view class="foot">
			<button class="mini-btn" type="default" size="mini" @click="cancel()">取消</button>
			<button class="mini-btn" type="primary" size="mini" @click="addInfo()">保存</button>
		</view>
	</view>
</template>

<script>
import { actions, store } from '../store/index';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
export default {
	components: {
		uniSearchBar
	},
	data() {
		return {
			dataList: [],
			userInfoList: [],
			pageList: {
				page: 1,
				size: 20
			},
			morePage: false,
			ruleGroupCode: '',
			userGroupCode: '',
			keyword: '',
			hasUserList: []
		};
	},
	onLoad(options) {
		this.ruleGroupCode = options.ruleGroupCode;
		this.userGroupCode = options.userGroupCode;
	},
	async mounted() {
		await this.hasUser();
		this.showList();
	},
	methods: {
		async showList(tag = false) {
			if (tag) {
				this.pageList.page += 1;
			} else {
				this.pageList.page = 1;
			}
			const req = {
				...this.pageList,
				keyword: this.keyword,
				orgCode: '',
				schoolCode: store.userInfo.schoolCode
			};
			const res = await actions.getOrgUser(req);
			if (tag) {
				this.dataList = this.dataList.concat(res.data.list);
			} else {
				this.dataList = res.data.list;
			}
			this.dataList.forEach(ele => {
				this.hasUserList.forEach(item => {
					if(ele.userCode === item.userCode){
						ele.checked = true
					}
				})
			})
			this.morePage = res.data.hasNextPage;
		},
		loadMore() {
			if (!this.morePage) {
				this.$tools.toast('数据已加载完毕');
				return;
			}
			this.showList(true);
		},
		async hasUser(tag = false) {
			const req = {
				schoolCode: store.userInfo.schoolCode,
				ruleGroupCode: this.ruleGroupCode,
				userGroupCode: this.userGroupCode
			};
			const res = await actions.getgroupuserList(req);
			res.data.list.forEach(ele => {
				this.hasUserList.push({
					userCode: ele.userCode,
					userName: ele.userName,
					userType: ele.userType
				});
			});
			console.log(this.hasUserList);
		},
		cancel() {
			this.userInfoList = [];
			this.$tools.navTo({
				url: './detail?ruleGroupCode=' + this.ruleGroupCode + '&userGroupCode=' + this.userGroupCode,
				title: '查看人员列表'
			});
		},
		checkUser(e) {
			const data = e.target.value;
			console.log(e)
			this.userInfoList = [];
			data.map(el => {
				this.userInfoList.push({
					userCode: el.split('^')[0],
					userName: el.split('^')[1].split('=')[0],
					userType: '1'
				});
				console.log(this.userInfoList);
			});
		},
		addInfo() {
			if (this.userInfoList.length != 0) {
				const req = {
					schoolCode: store.userInfo.schoolCode,
					ruleGroupCode: this.ruleGroupCode,
					userGroupCode: this.userGroupCode,
					userInfoList: this.userInfoList,
					userType: '1'
				};
				actions.addgroupuserList(req).then(res => {
					this.$tools.toast('操作成功');
					this.$tools.navTo({
						url: './detail?ruleGroupCode=' + this.ruleGroupCode + '&userGroupCode=' + this.userGroupCode,
						title: ''
					});
				});
			} else {
				this.$tools.toast('请选择人员');
			}
		},
		search(value) {
			console.log(value);
			this.keyword = value.value;
			this.showList();
		}
	}
};
</script>

<style lang="scss">
.scroll-h {
	height: calc(100vh - 330rpx);
}
.head {
	height: 100rpx;
}
.foot {
	height: 150rpx;
	text-align: center;
	button {
		margin: 0 30rpx;
		background: #7b92f5;
		color: #fff;
	}
}
.title_ {
	height: 80rpx;
}
.list {
	padding: 25rpx 20rpx;
	font-size: 28rpx;
	.th {
		background: #7b92f5;
		padding: 20rpx 0;
		border-radius: 8rpx;
		color: #fff;
	}
	.tbody {
		position: relative;
		padding: 25rpx 10rpx;
		background: $uni-bg-color;
	}
	.tbody:nth-child(even) {
		background: $u-bg-color;
	}
	.left {
		width: 20%;
		text-align: center;
	}
	.md {
		width: calc(35% - 40rpx);
		text-align: center;
	}
	.right {
		width: 35%;
		text-align: center;
	}
}
</style>

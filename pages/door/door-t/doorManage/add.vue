<template>
	<view class="qui-page">
		<view class="list">
			<!-- <view class="head"><uni-search-bar class="search" placeholder="输入姓名/手机号/工号搜索" @confirm="search"></uni-search-bar></view> -->
			<view class="th qui-fx-jsa qui-fx-ac qui-fx-jc title_">
				<text class="left">选择</text>
				<text class="mdl">姓名</text>
				<text class="mdr">工号</text>
				<text class="right">手机号</text>
			</view>
			<scroll-view scroll-y="true" class="scroll-h" @scrolltolower="loadMore">
				<checkbox-group @change="checkUser">
					<label class="tbody qui-bd-b qui-fx" v-for="(item, index) in dataList" :key="index">
						<checkbox :value="`${item.userCode}^${item.userName}`" class="left" :checked="item.checked"></checkbox>
						<label :for="item.userName" class="mdl">
							<text>{{ item.userName }}</text>
						</label>
						<label :for="item.workNo" class="mdr">
							<text>{{ item.workNo || '--' }}</text>
						</label>
						<label :for="item.mobile" class="right">
							<text>{{ item.mobile }}</text>
						</label>
					</label>
				</checkbox-group>
			</scroll-view>
		</view>
		<view class="submit-box qui-fx">
			<view class="btn1" @click="cancel()">取消</view>
			<view class="btn2" @click="addInfo()">保存</view>
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
				size: 99999
			},
			morePage: false,
			ruleGroupCode: '',
			userGroupCode: '',
			keyword: '',
			hasUserList: [],
			changeList: []
		};
	},
	watch: {
		dataList: {
			handler: function(val, oldval) {
				console.log(oldval);
				oldval.forEach(ele => {
					if (ele.checked) {
						this.changeList.push({
							userCode: ele.userCode,
							userName: ele.userName,
							userType: ele.userType
						});
					}
				});
				console.log(1111, this.changeList);
				this.changeList.map(()=>{
					val.forEach(ele => {
						const index = this.changeList.findIndex(list => {
							return list.userCode === ele.userCode;
						});
						this.changeList.splice(index, 1);
					});
				})

				console.log(22222, this.changeList);
			},
			deep: true
		}
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
					if(!ele.checked){
						if (ele.userCode === item.userCode) {
							ele.checked = true;
						}else{
							ele.checked = null;
						}
					}
				});
			});
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
			// console.log(this.hasUserList);
		},
		cancel() {
			this.userInfoList = [];
			this.hasUserList = [];
			this.$tools.navTo({
				url: './detail?ruleGroupCode=' + this.ruleGroupCode + '&userGroupCode=' + this.userGroupCode,
				title: '查看人员列表'
			});
		},
		checkUser(e) {
			const data = e.target.value;
			console.log(data);
			this.userInfoList = [];
			data.map(el => {
				this.userInfoList.push({
					userCode: el.split('^')[0],
					userName: el.split('^')[1].split('=')[0],
					userType: '1'
				});
			});
			console.log(1, this.userInfoList);
			this.dataList.forEach(ele => {
				this.userInfoList.forEach(item => {
					if (ele.userCode === item.userCode) {
						ele.checked = true;
					}
				});
			});
		},
		addInfo() {
			const req = {
				schoolCode: store.userInfo.schoolCode,
				ruleGroupCode: this.ruleGroupCode,
				userGroupCode: this.userGroupCode,
				userType: '1'
			};
			// 去重
			this.userInfoList = this.userInfoList.concat(this.changeList);
			let object = {};
			let objres = [];
			if (this.userInfoList.length === 0) {
				req.userInfoList = this.hasUserList;
			} else {
				objres = this.userInfoList.reduce((item, next) => {
					object[next.userCode] ? '' : (object[next.userCode] = true && item.push(next));
					return item;
				}, []);
				console.log(3, objres);
				req.userInfoList = objres;
			}
			actions.addgroupuserList(req).then(res => {
				this.$tools.toast('操作成功', 'success');
				this.$tools.goNext(() => {
					this.userInfoList = [];
					this.hasUserList = [];
					this.$tools.navTo({
						url: './detail?ruleGroupCode=' + this.ruleGroupCode + '&userGroupCode=' + this.userGroupCode,
						title: ''
					});
				});
			});
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
	height: calc(100vh - 250rpx);
}
.head {
	height: 100rpx;
}
.submit-box {
	height: 100rpx;
	width: 100%;
	position: fixed;
	bottom: 0;
	.btn1 {
		width: 50%;
		line-height: 100rpx;
		text-align: center;
		letter-spacing: 8rpx;
		background-color: #fff;
		color: #000;
		border-radius: $radius;
	}
	.btn2 {
		width: 50%;
		line-height: 100rpx;
		text-align: center;
		letter-spacing: 8rpx;
		background-color: $main-color;
		color: #fff;
		border-radius: $radius;
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
		padding: 20rpx;
		border-radius: 8rpx;
		color: #fff;
	}
	.tbody {
		position: relative;
		padding: 25rpx 20rpx;
		background: $uni-bg-color;
	}
	.tbody:nth-child(even) {
		background: $u-bg-color;
	}
	.left {
		width: 15%;
		text-align: center;
	}
	.mdl {
		width: 20%;
		text-align: center;
	}
	.mdr {
		width: 30%;
		text-align: center;
	}
	.right {
		width: 35%;
		text-align: center;
	}
}
</style>

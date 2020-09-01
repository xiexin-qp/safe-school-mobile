<template>
	<view class="">
		<choose-child @change="childInfo"></choose-child>
		<tab-menu :data-list="list" @change="tabChange"></tab-menu>
		<dropdown-menu ref="dropdown" @value0Change="value0Change" @searchChange="searchChange"></dropdown-menu>
		<scroll-view v-if="current === 0" scroll-y="true" @scrolltolower="loadMore" class="scroll-h">
			<no-data v-if="false" msg="暂无数据"></no-data>
			<view class="u-padd-20 u-mar-20 u-bg-fff u-border-radius" v-for="(item, i) in 20" :key="item">
				<view class="u-fx-jsb u-fx-ac">
					<view class="title u-main-color u-bold">20200707作业</view>
					<view class="tag"><u-tag mode="dark" type="primary" text="查看" class="u-mar-r20" @click="goAdd(1, item.id)" /></view>
				</view>
			</view>
		</scroll-view>
		<scroll-view v-else scroll-y="true" class="scroll-y">
			<no-data v-if="false" msg="暂无数据"></no-data>
			<view class="u-padd-20">
				<u-table>
					<u-tr>
						<u-th></u-th>
						<u-th>总数</u-th>
						<u-th>未交数</u-th>
						<u-th>操作</u-th>
					</u-tr>
					<u-tr>
						<u-td>累计</u-td>
						<u-td>20</u-td>
						<u-td>5</u-td>
						<u-td><view class="u-type-warning u-font-01" @click="goDetail()">查看未交</view></u-td>
					</u-tr>
					<u-tr v-for="(item, i) in 20" :key="i">
						<u-td>语文</u-td>
						<u-td>5</u-td>
						<u-td>1</u-td>
						<u-td><view class="u-type-warning u-font-01" @click="goDetail(item.id)">查看未交</view></u-td>
					</u-tr>
				</u-table>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import chooseChild from '@/components/choose-child/choose-child.vue';
import eventBus from '@u/eventBus';
import noData from '@/components/no-data/no-data.vue';
import DropdownMenu from './component/DropdownMenu.vue';
import { store, actions } from './store/index.js';
export default {
	name: 'ClassHomeWork-p',
	components: {
		DropdownMenu,
		noData,
		chooseChild
	},
	data() {
		return {
			list: [
				{
					name: '作业'
				},
				{
					name: '统计'
				}
			],
			current: 0,
			pageList: {
				page: 1,
				size: 20
			},
			morePage: false,
			userCode: '',
			dateTime: '',
			dataList: []
		};
	},
	watch: {},
	async created() {
		this.schoolYearId = store.schoolYear.schoolYearId;
	},
	mounted() {},
	methods: {
		childInfo(item) {
			if (item.userCode !== this.userCode) {
				this.userCode = item.userCode;
				this.gradeCode = item.gradeCode;
				this.classCode = item.classCode;
				this.userName = item.userName;
				this.showList();
			}
		},
		searchChange(val) {
			this.dateTime = val;
			console.log(this.dateTime);
			this.showList();
		},
		tabChange(item) {
			this.current = item;
			this.$refs.dropdown.current = item;
			console.log(item);
			this.showList();
		},
		async showList(tag = false) {
			if (tag) {
				this.pageList.page += 1;
			} else {
				this.pageList.page = 1;
			}
			const req = {
				...this.pageList,
				dateTime: this.dateTime,
				schoolCode: store.userInfo.schoolCode,
				classCode: this.classCode,
				schoolYearId: this.schoolYearId
			};
			console.log(req);
			const res = await actions.getClassMotto(req);
			if (!res.data) {
				return;
			}
			if (tag) {
				this.dataList = this.dataList.concat(res.data.list);
			} else {
				this.dataList = res.data.list;
			}
			this.morePage = res.data.hasNextPage;
		},
		loadMore() {
			if (!this.morePage) {
				this.$tools.toast('数据已加载完毕');
				return;
			}
			this.showList(true);
		},
		goAdd(type, id) {
			this.$tools.navTo({
				url: `./form?type=${type}&id=${id}`
			});
		},
		goDetail(id) {
			this.$tools.navTo({
				url: `./detail?id=${id}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-h {
	height: calc(100vh - 162rpx);
}
.scroll-y {
	height: calc(100vh - 80rpx);
}
.list:nth-child(odd) {
	.sub {
		color: $u-type-primary;
		background-color: $u-type-primary-light;
	}
}
.list:nth-child(even) {
	.sub {
		color: $u-type-success;
		background-color: $u-type-success-light;
	}
}
.img {
	width: 100rpx;
	height: 100rpx;
}
</style>

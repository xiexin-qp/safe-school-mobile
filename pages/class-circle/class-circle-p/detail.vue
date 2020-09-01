<template>
	<view class="u-page">
		<scroll-view scroll-y="true" class="scroll-h">
			<no-data v-if="false" msg="暂无数据"></no-data>
			<view class="list u-padd-20 u-mar-20 u-bg-fff u-border-radius" v-for="(item, i) in 10" :key="item">
				<view class="u-fx-jsb u-fx-ac">
					<view class="u-fx u-fx-ac">
						<view class="sub u-padd-20 u-padd-t30 u-padd-b30 u-mar-r20 u-border-radius">语文</view>
						<view class="">
							<view class="title u-main-color u-bold u-mar-b20">20200707作业</view>
							<view class="u-tips-color u-font-02">高三（1）班</view>
						</view>
					</view>
					<view class="tag"><u-tag mode="dark" type="primary" text="查看" class="u-mar-r20" @click="goAdd(2, item.id)" /></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import eventBus from '@u/eventBus';
import noData from '@/components/no-data/no-data.vue';
import DropdownMenu from './component/DropdownMenu.vue';
import { store, actions } from './store/index.js';
export default {
	name: 'ClassHomeWork-t',
	components: {
		DropdownMenu,
		noData
	},
	data() {
		return {
			pageList: {
				page: 1,
				size: 20
			},
			morePage: false
		};
	},
	watch: {},
	async created() {
	},
	mounted() {},
	methods: {
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
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-h {
	height: calc(100vh);
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
</style>

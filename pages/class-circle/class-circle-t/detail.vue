<template>
	<view class="">
		<scroll-view scroll-y="true" class="scroll-h">
			<detail-show :newsList="dataList" @handleComment="handleComment" :showNewTag="false"></detail-show>
		</scroll-view>
	</view>
</template>

<script>
import DetailShow from './component/DetailShow.vue'
import { store, actions } from './store/index.js';
export default {
	name: 'detail',
	components: {
		DetailShow
	},
	data() {
		return {
			dataList: []
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
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-h {
	height: calc(100vh);
}
</style>

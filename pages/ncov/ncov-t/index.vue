<template>
	<view>
		<view class="calendar"><uni-calendar @change="change"></uni-calendar></view>
	</view>
</template>

<script>
import { store, actions } from './store/index.js';
export default {
	data() {
		return {};
	},
	components: {},
	computed: {},
	async mounted() {
		const date = new Date()
		let y = date.getFullYear()
		let m = date.getMonth() + 1
		m = m < 10 ? ('0' + m) : m
		let d = date.getDate()
		d = d < 10 ? ('0' + d) : d
		this.day = y + '-' + m + '-' + d
		this.showList()
	},
	methods: {
		async showList(tag = false) {
			const req = {
				userCode: store.userInfo.userCode,
				day: this.day
			};
			const res = await actions.getIndex(req);
			this.dayInfo = res.data;
		},
		change(data) {
			this.day = data.fulldate;
			this.showList();
		}
	}
};
</script>

<style lang="scss"></style>

<template>
	<view class="qui-page">
		<view class="head"><button type="default" @click="onShowDatePicker('rangetime')">选择日期时间范围搜索</button></view>
		<view class="">
			<mx-date-picker
				:show="showPicker"
				:type="type"
				:value="value"
				:show-tips="true"
				:begin-text="'开始'"
				:end-text="'结束'"
				:show-seconds="true"
				@confirm="onSelected"
				@cancel="onSelected"
			/>
		</view>
		<view class="list">
			<view class="th qui-fx-jsa qui-fx-ac qui-fx-jc">
				<text class="left">时间</text>
				<view class="md qui-fx-ac qui-fx-jc">
					<text>进/出</text>
					<view class="icon qui-fx-ver"></view>
				</view>
				<text class="right">地点</text>
			</view>
			<scroll-view scroll-y="true" class="scroll-h">
				<view v-for="list in 20" :key="list.id" class="tbody qui-bd-b qui-fx-jsb">
					<text class="left">张三</text>
					<text class="md">女</text>
					<text class="right">全品文教</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue';
import eventBus from '@u/eventBus.js';
export default {
	components: {
		MxDatePicker
	},
	data() {
		return {
			showPicker: false,
			date: '2019/01/01',
			time: '15:00:12',
			datetime: '2019/01/01 15:00:12',
			range: ['2019/01/01', '2019/01/06'],
			rangetime: ['2019/01/08 14:00', '2019/01/16 13:59'],
			type: 'rangetime',
			value: ''
		};
	},
	methods: {
		onShowDatePicker(type) {
			//显示
			this.type = type;
			this.showPicker = true;
			this.value = this[type];
		},
		onSelected(e) {
			//选择
			this.showPicker = false;
			if (e) {
				this[this.type] = e.value;
				//选择的值
				console.log('value => ' + e.value);
				//原始的Date对象
				console.log('date => ' + e.date);
			}
		}
	},
	mounted() {}
};
</script>
<style lang="scss" scoped>
.head {
	height: 80rpx;
	button {
		margin: 20upx;
		font-size: 28upx;
	}
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
	}
	.tbody:nth-child(even) {
		background: #f5f5f5;
	}
	.left {
		width: 25%;
		text-align: center;
	}
	.md {
		width: calc(50% - 40rpx);
		text-align: center;
	}
	.right {
		width: 25%;
		text-align: center;
	}
}
.scroll-h {
	height: calc(100vh - 80rpx);
}
</style>

<template>
	<view class="qui-page">
		<view class="detail">
			<view class="btn" @click="add"><button type="primary" size="mini">添加成员</button></view>
		</view>
		<no-data v-if="false" msg="暂无数据"></no-data>
		<view class="list">
			<view class="th qui-fx-jsa qui-fx-ac qui-fx-jc">
				<text class="left">姓名</text>
				<view class="md qui-fx-ac qui-fx-jc">
					<text>性别</text>
					<view class="icon qui-fx-ver"></view>
				</view>
				<text class="right">组织机构</text>
				<text class="right">手机号</text>
				<text class="right">操作</text>
			</view>
			<scroll-view @refresherpulling="haha" scroll-y="true"  class="scroll-h">
				<view v-for="list in dataList" :key="list.id" class="tbody qui-bd-b qui-fx-jsb">
					<text class="left">{{ list.name }}</text>
					<text class="md">{{ list.sex }}</text>
					<text class="right">{{ list.Organization }}</text>
					<text class="right">{{ list.tel }}</text>
					<text class="right" @click="open()">删除</text>
				</view>
			</scroll-view>
			<uni-popup ref="popup" type="center">
				<view class="modal-ti">提示</view>
				<view class="modal-su">确定删除该成员?</view>
				<view class="modal-btn">
					<button type="default" size="mini" @click="close()">取消</button>
					<button type="primary" size="mini" @click="del()">确定</button>
				</view>
			</uni-popup>
		</view>
	</view>
</template>
<script>
import noData from '@/components/no-data/no-data.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import eventBus from '@u/eventBus.js';
export default {
	components: {
		noData,
		uniPopup
	},
	data() {
		return {
			dataList: [
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				},
				{
					name: '张三',
					sex: '女',
					Organization: '全品文教',
					tel: '123'
				}
			]
		};
	},
	watch: {
	},

	mounted() {},
	methods: {
		open() {
			this.$refs.popup.open();
		},
		close() {
			this.$refs.popup.close();
		},
		//删除
		del() {},

		goBack() {
			this.$tools.goBack();
		},
		add() {
			uni.navigateTo({
				url: './add'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
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
.scroll-h {
	height: 100vh;
}
.detail {
	padding: 0rpx 20rpx;
	font-size: 28rpx;
	margin-top: 20px;
	// .btn {
	//   border-radius: $radius;
	//   background-color: $main-color;
	//   line-height: 50rpx;
	//   height: 50rpx;
	//   color:#fff;
	//   text-align: center;
	//   display: inline-block;
	// }
	// .back_{
	//   display: inline-block;
	//   color: #0079FF;
	// }
	// .text_{
	//   display: inline-block;
	//   font-size: 16px;
	//   width: calc(77.5% - 40rpx);
	//   text-align: center;
	// }
}
.uni-popup__wrapper-box {
	width: 270px;
	height: 179px;
	background: inherit;
	background-color: rgba(255, 255, 255, 1);
	border-width: 1px;
	border: 1px solid rgba(204, 204, 204, 1);
	border-radius: 8px;
	box-shadow: none;
	.modal-ti {
		text-align: center;
		margin-top: 20rpx;
		font-size: 22px;
	}
	.modal-su {
		text-align: center;
		margin-top: 20rpx;
		font-size: 15px;
	}
	.modal-btn {
		text-align: center;
		border-top: 1px solid rgba(204, 204, 204, 1);
		margin-top: 70rpx;
		button {
			margin: 30rpx;
		}
	}
}
</style>

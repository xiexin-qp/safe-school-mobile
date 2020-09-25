<template>
	<view class="u-type-primary-light-bg   ">
		<scroll-view scroll-y="true" class="scroll-h">
			<u-collapse 
			event-type="close" :arrow="arrow" 
			:accordion="accordion" 
			:body-style='bodyStyle'
			:head-style='headStyle'
			@change="change">
				<u-collapse-item :open='true' class='u-type-primary-light-bg' :index="index" @change="itemChange" :title="item.head" v-for="(item, index) in dataList" :key="index">
					<view class="collapse-item u-fx-wp">
						<view class="card" v-for="(el) in item.list" :key="el.code">
							<view class="title u-fx-ac-jc u-mar-t20">{{el.userName}}</view>
							<view class="u-fx-ac-jc u-mar-t20">
								<!-- <u-button type="success" class="u-fx-ac-jc" size='mini'>{{el.state | safetyTaskStatus}}</u-button> -->
							</view>
						</view>
					</view>
				</u-collapse-item>
			</u-collapse>
		</scroll-view>
	</view>
</template>

<script>
	import eventBus from '@u/eventBus'
	import {
		store,
		actions
	} from './store/index.js'
	import hostEnv from '../../config/index.js';
	export default {
		components: {
		},
		computed: {
			publisher() {
				return store.userInfo.userName
			}
		},
		data() {
			return {
				itemStyle: {
					color: '#343434',
					marginTop:'10rpx',
				},
				bodyStyle:{
						background:'#ecf5ff',
						paddingRight:'20rpx',
						paddingLeft:'30rpx',
						paddingTop:'30rpx',
						// paddingBottom:'30rpx',
				},
				headStyle:{
						fontSize: '32rpx',
						background:'#fff',
						paddingLeft:'20rpx',
				},
				arrow: true,
				accordion: false,
				// type: Number(this.$tools.getQuery().get('type')),
				customStyle: {
					border: '1px dashed #ccc',
				},
				dataList: [{
					head: "赏识在于角度的转换",
					body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来",
					open: true,
					disabled: true
				}, {
					head: "生活中不是缺少美，而是缺少发现美的眼睛",
					body: "学会欣赏，实际是一种积极生活的态度，是生活的调味品，会在欣赏中发现生活的美",
					open: false,
				}, {
					head: "周围一些不起眼的人、事、物，...",
					body: "但是据说雕刻大卫像所用的这块大理石，曾被多位雕刻家批评得一无是处，有些人认为这块大理石采凿得不好，有些人嫌它的纹路不够美",
					open: false,
				}],
			}
		},
		created() {},
		mounted() {
				this.taskId = this.$tools.getQuery().get('myTaskId'),
				this.taskTemplateCode = this.$tools.getQuery().get('taskTemplateCode')
				// this.getUserList()
		},
		methods: {
			async getUserList() {
				const req = {
        state: [],
        taskTemplateCode: this.taskTemplateCode,
      }
      const res = await actions.schTaskCompleted(req)
      console.log(res)
      const { compNum, outCompInfoOfTaskByOrgDtoList, sum } = res.data
      this.compNum = compNum
      this.sum = sum
      this.dataList = outCompInfoOfTaskByOrgDtoList
			},
			cancel() {
				this.$router.go(-1)
			},
			itemChange(){},
			change(){},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-h {
		height: calc(100vh - 10rpx);
		.collapse-item {
			padding-bottom: 10px;
			.card{
				border-top: 4rpx solid green;
				margin-right: 15rpx;
				margin-bottom: 16rpx;
				width: 160rpx;
				height: 158rpx;
				background: #FFFFFF;
				box-shadow: 1rpx 2rpx 17rpx 2rpx rgba(52, 52, 52, 0.08);
				border-radius: 8rpx;
				.u-size-mini{
					padding:0 10rpx;
				}
			}
		}
	}
</style>

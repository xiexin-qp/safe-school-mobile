<template>
	<view class="u-type-primary-light-bg   ">
		<no-data class="u-mar-l20 u-mar-r20 u-mar-t20" v-if="itemList.length === 0" msg="暂无数据"></no-data>
		<scroll-view v-else scroll-y="true" class="scroll-h">
			<view class="u-padd-15 u-fx-ac-jc">
				(已完成数/总数:{{ compNum }}/{{ sum }})
			</view>
			<u-collapse 
			event-type="close" :arrow="arrow" 
			:accordion="accordion" 
			:body-style='bodyStyle'
			:head-style='headStyle'
			@change="change">
				<u-collapse-item :open='item.open' class='u-type-primary-light-bg' :index="index" @change="itemChange"  v-for="(item, index) in itemList" :key="index">
					<view slot='title-all'>
						 {{item.orgName}}&nbsp;{{ number(item.list) }}
					</view>
					<view class="collapse-item u-fx-wp">
						<view class="card" v-for="(el,i) in item.list" :key="i">
							<!-- <view class="title u-fx-ac-jc u-mar-t20">{{el.userName}}</view> -->
							<view class="title u-fx-ac-jc u-mar-t20">{{el.userName}}</view>
							<view class="u-fx-ac-jc u-mar-t20">
								<!-- <u-button type="success" class="u-fx-ac-jc" size='mini'>{{el.state|safetyTaskStatus}}</u-button> -->
								<u-button type="success" class="u-fx-ac-jc" size='mini'>dfdsfh</u-button>
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
				compNum:'',
				sum:'',
				arrow: true,
				accordion: false,
				// type: Number(this.$tools.getQuery().get('type')),
				customStyle: {
					border: '1px dashed #ccc',
				},
				itemList: [],
			}
		},
		created() {},
		mounted() {
				this.taskId = this.$tools.getQuery().get('myTaskId'),
				this.taskTemplateCode = this.$tools.getQuery().get('taskTemplateCode')
				this.getUserList()
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
      this.itemList = outCompInfoOfTaskByOrgDtoList.map(v=>{
				return {
					...v,
					open:v.list.some(i=>i.state==='3')?true:false
				}
			})
			},
			number(list) {
      console.log(list)
      const a = list.length
      const b = list.filter(v => v.state === '3' || v.state === '7').length
      return `(${b}/${a})`
      // return `a`
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

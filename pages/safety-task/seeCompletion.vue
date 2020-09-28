<template>
	<view class="">
		<no-data class="" v-if="itemList.length === 0" msg="暂无数据"></no-data>
		<scroll-view v-else scroll-y="true" class="scroll-h">
			<view class="u-padd-15  head">
				(已完成数/总数：<text class="u-type-primary">{{ compNum }}</text>/{{ sum }})
			</view>
			<u-collapse event-type="close" :arrow="arrow" :accordion="accordion" :body-style='bodyStyle' :head-style='headStyle'
			 @change="change">
				<u-collapse-item class='u-bd-b u-mar-b10' :open='item.open' :index="index" @change="itemChange" v-for="(item, index) in itemList"
				 :key="index">
					<view slot='title-all' class="title-all  u-main-color">
						{{item.orgName}}&nbsp;{{ number(item.list) }}
						<view class="open-icon u-light-color">
							<u-icon name="arrow-down-fill" size='10'></u-icon>
						</view>
					</view>
					<view class="collapse-item ">
						<view class="card u-bd-b u-fx-jsb u-fx-ac " v-for="(el,i) in item.list" :key="i">
							<view v-if="el.state==='1'" class="red">
							</view>
							<view class="title  ">{{el.userName}}</view>
							<view class="">
								<u-tag :text="el.state|completeStatusToText" :border-color='el.state|completeStatusToText|safetyTaskToColor'
								 :bg-color='el.state|completeStatusToText|safetyTaskToColor' color='#fff' />
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
		components: {},
		computed: {
			publisher() {
				return store.userInfo.userName
			}
		},
		data() {
			return {
				itemStyle: {
					color: '#343434',
					marginTop: '10rpx',
					background: '#fff',
				},
				bodyStyle: {
					background: '#fff',
				},
				headStyle: {
					fontSize: '32rpx',
					paddingLeft: '30rpx',
					paddingRight: '30rpx',
						background: '#fff',
				},
				compNum: '',
				sum: '',
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
				const {
					compNum,
					outCompInfoOfTaskByOrgDtoList,
					sum
				} = res.data
				this.compNum = compNum
				this.sum = sum
				this.itemList = outCompInfoOfTaskByOrgDtoList.map(v => {
					return {
						...v,
						open: v.list.some(i => i.state === '3') ? true : false
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
			itemChange() {},
			change() {},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-h {
		height: calc(100vh - 10rpx);

		.head {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 88rpx;
			background: #FEF9ED;
		}

		.title-all {
			width: 100%;
			display: flex;
			justify-content: space-between;
		}

		.collapse-item {

			// padding-bottom: 10px;
			.card {
				margin-left: 69rpx;
				margin-right: 70rpx;
				height: 99rpx;
				background: #FFFFFF;
				position: relative;

				// box-shadow: 1rpx 2rpx 17rpx 2rpx rgba(52, 52, 52, 0.08);
				// border-radius: 8rpx;
				.red {
					position: absolute;
					top: 0;
					left: 0;
					transform: translate(-400%, 350%);
					width: 12rpx;
					height: 12rpx;
					background: #FF5454;
					border-radius: 50%;
				}

				.u-size-mini {
					padding: 0 10rpx;
				}
			}
		}
	}
</style>

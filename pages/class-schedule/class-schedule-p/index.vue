<template>
	<view class="home u-page u-fx-ver">
		<choose-child @change="childInfo"></choose-child>
		<scroll-view class="scroll-h" :scroll-y="true">
			<view class="time-table u-fx-jsb u-tx-c" :style="tableHeight">
				<view class="time u-fx-ver u-fx-jsb" :style="tableHeight">
					<text class="early u-bd-1px u-fx-ac-jc u-type-primary-disabled-bg u-type-white" v-if="classHourList.morningNum !== 0" :style="{ height: ((classHourList.morningNum + 1) * 100) / 28 + 'rem' }">
						{{ earlyTime }}
					</text>
					<text class="morning u-bd-1px u-fx-ac-jc u-type-primary-disabled-bg u-type-white" v-if="classHourList.morningNum !== 0" :style="{ height: (classHourList.forenoonNum * 100) / 28 + 'rem' }">{{ morningTime }}</text>
					<text class="morning u-bd-1px u-fx-ac-jc u-type-primary-disabled-bg u-type-white" v-else :style="{ height: ((classHourList.forenoonNum + 1) * 100) / 28 + 'rem' }">{{ morningTime }}</text>
					<text class="afternoon u-bd-1px u-fx-ac-jc u-type-primary-disabled-bg u-type-white" :style="{ height: (classHourList.afternoonNum * 100) / 28 + 'rem' }">{{ afternoonTime }}</text>
					<text class="night u-bd-1px u-fx-ac-jc u-type-primary-disabled-bg u-type-white" v-if="classHourList.nightNum !== 0" :style="{ height: (classHourList.nightNum * 100) / 28 + 'rem' }">{{ nightTime }}</text>
				</view>
				<view class="class-day u-bd-r">
					<view class="td u-bd-1px u-fx-ac-jc"><text>课节</text></view>
					<view class="td u-bd-1px u-fx-ac-jc" v-for="(item, i) in classHourList.morningNum" :key="i + '11'">
						<text>第{{ i + 1 }}节</text>
						<text :id="i + 1" class="num"></text>
					</view>
					<view class="td u-bd-1px u-fx-ac-jc" v-for="(item, i) in classHourList.forenoonNum" :key="i + '22'">
						<text>第{{ i + 1 + classHourList.morningNum }}节</text>
						<text :id="i + 1 + classHourList.morningNum" class="num"></text>
					</view>
					<view class="td u-bd-1px u-fx-ac-jc" v-for="(item, i) in classHourList.afternoonNum" :key="i + '33'">
						<text>第{{ i + 1 + classHourList.morningNum + classHourList.forenoonNum }}节</text>
						<text :id="i + 1 + classHourList.morningNum + classHourList.forenoonNum" class="num"></text>
					</view>
					<view class="td u-bd-1px u-fx-ac-jc" v-for="(item, i) in classHourList.nightNum" :key="i + '44'">
						<text>第{{ i + 1 + classHourList.morningNum + classHourList.forenoonNum + classHourList.afternoonNum }}节</text>
						<text :id="i + 1 + classHourList.morningNum + classHourList.forenoonNum + classHourList.afternoonNum" class="num"></text>
					</view>
				</view>
				<view class="scroll-list u-fx-ver" :style="tableHeight">
					<scroll-view :scroll-x="true" class="scroll-x">
						<ul class="level-list" :style="{ width: (weekDay.length * 6.55) + 'rem' }">
							<li v-for="(elem, i) in weekDay" :key="i + '0'" :class="i === 0 ? 'active' : ''">
								<view class="td u-bd-1px u-fx-ac-jc">
									<text>{{ weekDays[i] | chnNumChar() }}</text>
								</view>
								<view :id="'10' + 'w' + elem + 'n' + +(i + 1)" class="reset td u-bd-1px u-fx-ac-jc" v-for="(item, i) in classHourList.morningNum" :key="i + '1'"></view>
								<view
									:id="'20' + 'w' + elem + 'n' + +(i + 1 + classHourList.morningNum)"
									class="reset td u-bd-1px u-fx-ac-jc"
									v-for="(item, i) in classHourList.forenoonNum"
									:key="i + '2'"
								></view>
								<view
									:id="'30' + 'w' + elem + 'n' + +(i + 1 + classHourList.morningNum + classHourList.forenoonNum)"
									class="reset td u-bd-1px u-fx-ac-jc"
									v-for="(item, i) in classHourList.afternoonNum"
									:key="i + '3'"
								></view>
								<view
									:id="'40' + 'w' + elem + 'n' + +(i + 1 + classHourList.morningNum + classHourList.forenoonNum + classHourList.afternoonNum)"
									class="reset td u-bd-1px u-fx-ac-jc"
									v-for="(item, i) in classHourList.nightNum"
									:key="i + '4'"
								></view>
							</li>
						</ul>
					</scroll-view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import chooseChild from '@/components/choose-child/choose-child.vue';
import eventBus from '@u/eventBus';
import { store, actions } from './store/index.js';
export default {
	name: 'ClassStyle',
	components: {
		chooseChild
	},
	data() {
		return {
			currentWeek: new Date().getDay(),
			classTableList: [],
			classHourList: [],
			classNum: 0,
			tableHeight: {},
			weekDay: [],
			weekDays: [],
			classTime: [],
			earlyTime: '',
			morningTime: '',
			afternoonTime: '',
			nightTime: '',
			type: false,
			text: '我的课表',
			schoolYearId: '',
			userType: '0', //1班主任，0教职工
			classCode: '',
			gradeCode: ''
		};
	},
	watch: {},
	mounted() {
		this.classCode = store.childList[0].classCode;
		this.schoolYearId = store.schoolYear.schoolYearId;
		this.getClassHourList();
	},
	methods: {
		childInfo(item) {
			if (item.classCode !== this.classCode) {
				this.classCode = item.classCode;
				this.$tools.goNext(() => {
					this.getClassHourList();
				});
			}
		},
		/* 查询课节 */
		getClassHourList() {
			actions.getClassNum({ schoolCode: store.userInfo.schoolCode }).then(res => {
				if (!res.data) {
					this.classHourList = [];
					return;
				}
				this.classHourList = res.data;
				this.weekDays = res.data.week.split(',')
				const i = this.weekDays.findIndex(list => {
					return list === '1'
				})
				if (i !== -1) {
					this.weekDays.splice(i, 1)
					this.weekDays.push('1')
				}
				this.weekDay = res.data.week.split(',');
				const index = this.weekDay.findIndex(list => {
					return parseInt(list) === parseInt(new Date().getDay());
				});
				this.weekDay.splice(index, 1);
				this.weekDay.unshift(res.data.week.split(',')[index]);
				this.classNum = this.classHourList.morningNum + this.classHourList.forenoonNum + this.classHourList.afternoonNum + this.classHourList.nightNum;
				this.tableHeight = { height: ((this.classNum + 1) * 100) / 28 + 'rem' };
				this.earlyTime = '早上';
				this.morningTime = '上午';
				this.afternoonTime = '下午';
				this.nightTime = '晚上';
				this.$nextTick(() => {
					this.getClassTime();
					this.showTimetable({
						classCode: this.classCode
					});
				});
			});
		},
		/* 上下课时间详情 */
		getClassTime() {
			actions.getCourseList({ schoolCode: store.userInfo.schoolCode }).then(res => {
				if (!res.data) {
					this.classTime = [];
					return;
				}
				this.classTime = res.data;
				let id = '';
				for (let i = 0; i < this.classTime.length; i++) {
					id = this.classTime[i].classNode;
					let timehtml = document.getElementById(id);
					let startTime = this.classTime[i].startTime ? this.classTime[i].startTime : '';
					let endTime = this.classTime[i].endTime ? this.classTime[i].endTime : '';
					if (timehtml) {
						timehtml.innerHTML = `
	                  ${startTime}-${endTime}
	                `;
					}
				}
			});
		},
		// 切换课表
		change() {
			let req;
			let html = document.getElementsByClassName('reset');
			for (let i = 0; i < html.length; i++) {
				html[i].innerHTML = '';
			}
			if (this.text === '我的课表') {
				this.text = '班级课表';
				req = {
					classCode: this.classCode
				};
				this.showTimetable(req);
			} else {
				this.text = '我的课表';
				req = {
					userCode: store.userInfo.userCode
				};
				this.showTimetable(req);
			}
		},
		/* 获取课表 */
		showTimetable(req) {
			req.schoolYearId = this.schoolYearId;
			req.schoolCode = store.userInfo.schoolCode;
			actions.getClassList(req).then(res => {
				if (!res.data) {
					let courseId = '';
					for (let i = 0; i < this.classTableList.length; i++) {
						courseId = this.classTableList[i].timeInterval + '0' + 'w' + this.classTableList[i].week + 'n' + this.classTableList[i].classNode;
						let html = document.getElementById(courseId);
						if (html) {
							html.innerHTML = ``;
						}
					}
					this.classTableList = []
					return;
				}
				this.classTableList = res.data;
				this.$nextTick(() => {
					if (this.classTableList) {
						let courseId = '';
						for (let i = 0; i < this.classTableList.length; i++) {
							courseId = this.classTableList[i].timeInterval + '0' + 'w' + this.classTableList[i].week + 'n' + this.classTableList[i].classNode;
							let html = document.getElementById(courseId);
							let placeName = this.classTableList[i].placeName.length > 8 ? this.classTableList[i].placeName.substring(0, 8) + '...' : this.classTableList[i].placeName;
							if (html) {
								html.innerHTML = `
											                  <text class="course" style="font-size:16px">${this.classTableList[i].subjectName}</text>
																			`;
							}
						}
					}
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.u-page {
	background-color: #fff;
}
.scroll-h {
	height: calc(100vh - 0rpx);
}
.home {
	.year-header {
		position: relative;
		height: 90rpx;
		padding: 0 20rpx;
		color: #fff;
		background-color: $u-type-primary;
		.arrow-img {
			position: absolute;
			right: 10px;
			width: 30rpx;
			height: 20rpx;
			margin-left: 10rpx;
			display: block;
		}
	}
	.time-table {
			white-space: nowrap;
			position: relative;
			width: 100%;
			overflow: hidden;
			.num {
				font-size: 24rpx;
			}
			.name {
				font-size: 24rpx;
				color: $u-main-color;
			}
			.course {
				font-size: 32rpx;
			}
			.time {
				position: absolute;
				padding: 0;
				width: 12%;
				left: 0;
				z-index: 10;
				background: #f9fafe;
				border-top: 1rpx solid #ddd;
				border-bottom: 1rpx solid #ddd;
				p.u-bd-1px:after {
					border-left: none;
				}
			}
			.class-day {
				position: absolute;
				left: 12%;
				width: 26%;
				z-index: 10;
				view {
					width: 100%;
					height: 3.57rem;
					padding: 0.25rem;
					overflow: hidden;
				}
				view:first-child {
					border-top: 1px solid #ddd;
					background: #f9fafe;
				}
				view:last-child {
					border-bottom: 1px solid #ddd;
				}
			}
			.scroll-list {
				position: absolute;
				width: 62%;
				left: 38%;
				.level-list {
					white-space: nowrap;
					li {
						float: left;
						view {
							width: 6.5rem;
							height: 3.57rem;
							padding: 0 10rpx;
							overflow: hidden;
						}
						view:first-child {
							border-top: 1rpx solid #ddd;
							background: #f9fafe;
						}
						view:last-child {
							border-bottom: 2rpx solid #ddd;
						}
					}
					li:last-child {
						border-right: 1rpx solid #ddd;
						view:first-child{
							border-right: 1rpx solid #ddd;
						}
					}
					li:last-child:after{
						 content:"";
						 display:block;
						 clear:both;
					}
				}
				.active {
					background: #bdc8fa;
				}
			}
		}
	}
</style>

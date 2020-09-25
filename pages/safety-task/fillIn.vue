<template>
	<view>
		<scroll-view scroll-y="true" class="scroll-h ">
			<view class="row u-type-white-bg u-fx-ac-jc u-bold u-font-1 u-padd-20 u-line2">
				{{ detailInfo.taskName }}
			</view>
			<view class="cont u-type-white-bg u-padd-l10 u-padd-r10 u-tips-color">
				<u-row class='u-mar-b10 u-mar-r20 u-font-02' gutter="16" justify="center">
					<u-col span="3">
						<view class="demo-layout bg-purple">发布人:{{ !type||type===2?detailInfo.publisherName:detailInfo.userName }}</view>
					</u-col>
					<u-col span="7">
						<view class="demo-layout bg-purple-light">发布于：{{(!type||type===2?detailInfo.publisherDate:detailInfo.publisherTime) | gmtToDate }}</view>
					</u-col>
				</u-row>
				<u-row class='u-mar-b10 u-font-02' gutter="16" justify="center">
					<u-col span="9">
						<view class="demo-layout bg-purple">
							任务时间：{{(!type||type===2?detailInfo.startDate:detailInfo.beginTime) | gmtToDate('date') }}
							至
							{{ (!type||type===2?detailInfo.endDate:detailInfo.endTime) | gmtToDate('date') }}
						</view>
					</u-col>
				</u-row>
				<u-row v-if="!type?detailInfo.des:detailInfo.reason" class='u-mar-b10 u-bold u-main-color' gutter="16" justify="start">
					<u-col span="3">
						任务描述:
					</u-col>
				</u-row>
				<u-row class='u-mar-b30 u-font-01' gutter="16" justify="start">
					<u-col span="12">
						<text class='u-line1' v-html= !type?detailInfo.des:detailInfo.reason>
						</text>
					</u-col> 
				</u-row>
			
				<u-row class='u-mar-b10' justify="between">
					<u-col span="12">
						<u-line color='#ccc' />
					</u-col>
				</u-row>
				<u-row v-if='detailInfo.docUrl' class='u-mar-b10 u-bold u-main-color' justify="start">
					<u-col span="12">
						附件任务:
					</u-col>
				</u-row>
				<u-row class='u-padd-b20' justify="start">
					<!-- <u-col span="6"> -->
					<text class='u-font-03'>{{ detailInfo.docName }}</text>
					<!-- </u-col> -->
					<view span="2" class='u-font-03'>
						<u-link v-if='detailInfo.docUrl' href="#" :under-line="true" @click="exportClick(detailInfo.docUrl)">下载</u-link>
					</view>
				</u-row>
			</view>
			<view class="problem" :class="!type?'u-mar-b30':''">
				<u-row class='u-mar-b10  u-mar-t20 u-bold u-main-color' justify="start">
					<u-col span="12">
						要求上报内容:
					</u-col>
				</u-row>
				<view class="problem-list" v-if="radioList.length !== 0">
					<view class="cont" v-for="(list, i) in radioList" :key="i">
						<u-row class='u-mar-b20 u-bold u-mar-t20 u-main-color' justify="start">
							<u-col span="12">
								{{i+1}}.{{ list.title }}
								<text class='u-font-03 u-tips-color'>(单选题)</text>
							</u-col>
						</u-row>
						<view class="wentiList ">
							<u-radio-group v-if='!type||type===2' :disabled="!type" v-model=list.answers[0] class='u-wh' @change="radioGroupChange">
								<u-cell-group class='u-wh' :border='true'>
									<u-radio @change="radioChange" class="u-padd-15 u-bd-b" v-for="(element,index) in list.content" :name="element">
										{{element}}
									</u-radio>
								</u-cell-group>
							</u-radio-group>
							<u-radio-group v-else :disabled="!type" v-model="list.answer" class='u-wh' @change="radioGroupChange">
								<u-cell-group class='u-wh' :border='true'>
									<u-radio @change="radioChange" class="u-padd-15 u-bd-b" v-for="(element,index) in list.content" :name="element">
										{{element}}
									</u-radio>
								</u-cell-group>
							</u-radio-group>
						</view>
					</view>
				</view>
				<view class="problem-list" v-if="checkList.length !== 0">
					<view class="" v-for="(list, i) in checkList" :key="i">
						<u-row class='u-mar-b20 u-bold u-mar-t20 u-main-color' justify="start">
							<u-col span="12">
								{{i+1}}.{{ list.title }}
								<text class='u-font-03 u-tips-color'>(多选题)</text>
							</u-col>
						</u-row>
						<view class="wentiList ">
              {{checkList}}
							<u-checkbox-group v-if='!type||type===2' :disabled="!type" class='u-wh' @change="checkboxGroupChange">
								<u-cell-group class='u-wh' :border='true'>
									<u-checkbox @change="checkboxChange(list)" v-model="element.disabled" class="u-padd-15 u-bd-b" v-for="(element,index) in list.pointList"
									 :key="index" :name="element.content">
										{{element.content}}
									</u-checkbox>
								</u-cell-group>
							</u-checkbox-group>
							<u-checkbox-group v-else :disabled="!type" class='u-wh' @change="checkboxGroupChange">
								<u-cell-group class='u-wh' :border='true'>
									<u-checkbox @change="checkboxChange(list)" v-model="element.answer" class="u-padd-15 u-bd-b" v-for="(element,index) in list.pointList"
									 :key="index" :name="element.content">
										{{element.content}}
									</u-checkbox>
								</u-cell-group>
							</u-checkbox-group>
						</view>
					</view>
				</view>
				<view class="problem-list" v-if="fillList.length !== 0">
					<view v-for="(list, i) in fillList" :key="i">
						<u-row class='u-mar-b20 u-bold u-mar-t20 u-main-color' justify="start">
							<u-col span="12">
								{{ list.title }}
								<text class='u-font-03 u-tips-color'>(填空题)</text>
							</u-col>
						</u-row>
						<view class="wentiList u-type-white-bg u-padd-l20">
							<u-input v-model="list.answers[0]" v-if='!type||type===2' :disabled="!type" type="textarea"  :auto-height="true" class="" />
							<u-input v-model="list.answer" v-else :disabled="!type" type="textarea" placeholder='请在此填写' :auto-height="true" class="" />
						</view>
					</view>
				</view>
				<view class="problem-list" v-if="fileList.length !== 0">
					<u-row class='u-mar-b20 u-bold u-mar-t20 u-main-color' justify="start">
						<u-col span="12">
							4.附件
						</u-col>
					</u-row>
					<view class="wentiList u-mar-l10 u-padd-t20">
						<an-upload-img :disabled="!type" class='u-type-white-bg' v-model="completePhotoUrls" total="9"></an-upload-img>
					</view>
				</view>
			</view>
			<view class=" u-fx-ac u-mar-b20 u-mar-t30" v-if='type!==0'>
				<u-button :custom-style="customStyle" class="u-fx-f1 u-mar-r u-mar-l" @click="cancel">
					取消
				</u-button>
				<u-button type="primary" class="u-fx-f1 u-mar-l u-mar-r " :disabled="isLoad" @click="submitOk">
					确定
				</u-button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import eventBus from '@u/eventBus'
	import validateForm from '@u/validate';
	import anUploadImg from '@/components/an-uploadImg/an-uploadImg'
	import {
		store,
		actions
	} from './store/index.js'
	import hostEnv from '../../config/index.js';
	export default {
		components: {
			anUploadImg
		},
		data() {
			this.uploadUrl = `${hostEnv.zk_school}/file/freeUpload?schoolCode=${this.schoolCode}`
			return {
				type: Number(this.$tools.getQuery().get('type')),
				customStyle: {
					border: '1px dashed #ccc',
				},
				detailInfo: {},
				radioList: [],
				checkList: [],
				fillList: [],
				fileList: [],
				isLoad: false,
				completePhotoUrls: [],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: 'orange',
			}
		},
		mounted() {
			this.taskId = this.$tools.getQuery().get('myTaskId'),
				this.TaskCode = this.$tools.getQuery().get('myTaskCode'),
				this.taskTemplateCode = this.$tools.getQuery().get('taskTemplateCode'),
				this.getUserList()
		},
		methods: {
			//获取负责人数据
			async getUserList() {
				let res
				if (this.type === 0||this.type === 2) {
          //填报了的预览
					res = await actions.previewMyTask({
						query: this.taskId
					})
					this.detailInfo = res.data
					const questions = res.data.answers.map((el, index) => {
						return {
							...el,
							key: index,
							pointList: el.content ?
								el.content.map((item, i) => {
									return {
										key: i,
										content: item,
										disabled:el.answers.some(v=>v===item)
									}
								}) :
								[]
						}
					})
					questions.map((el) => {
						if (el.questionType === '1') {
							this.radioList.push(el)
						} else if (el.questionType === '2') {
							this.checkList.push(el)
						} else if (el.questionType === '3') {
							this.fillList.push(el)
						} else {
							this.fileList.push({ ...el,
								show: false
							})
						}
					})
				} else {
          //查看为问题详情不带答案
					res = await actions.myTaskDetail({
						id: this.taskId
					})
					this.detailInfo = res.data
					const questions = res.data.questions.map((el, index) => {
						return {
							...el,
							key: index,
							pointList: el.content ? el.content.map((item, i) => {
								return {
									key: i,
									content: item
								}
							}) : []
						}
					})
					questions.map((el) => {
						if (el.questionType === '1') {
							this.radioList.push(el)
						} else if (el.questionType === '2') {
							this.checkList.push(el)
						} else if (el.questionType === '3') {
							this.fillList.push(el)
						} else {
							this.fileList.push({ ...el,
								show: true
							})
						}
					})
				}



			},
			//下载
			exportClick(docUrl) {
				if (docUrl) {
					const url = `${hostEnv.zx_subject}/file/downLoad/doc?url=${docUrl}`
					window.open(url)
				}
			},
			cancel() {
				this.$router.go(-1)
			},
			//提交
			submitOk() {
				const req = {
					taskCode: this.TaskCode,
					taskId: this.taskId,
					taskTemplateCode: this.taskTemplateCode,
					userCode: store.userInfo.userCode
        }
        let answers
        if(this.type===2){
          //修改
          this.checkList.forEach(item => {
            item.answers = item.pointList.filter(v => v.disabled).map(i => i.content)
          })
          const arr = this.radioList.concat(this.checkList).concat(this.fillList).concat(this.fileList)
          console.log(arr)
           answers = arr.map(el => {
            return {
              answers:  el.answers,
              questionTemplateId: el.questionTemplateId,
              questionType: el.questionType
            }
          })
        }else{
          //填报
          this.checkList.forEach(item => {
            item.answer = item.pointList.filter(v => v.answer).map(i => i.content)
          })
          const arr = this.radioList.concat(this.checkList).concat(this.fillList).concat(this.fileList)
          answers = arr.map(el => {
            return {
              answers: Array.isArray(el.answer) ? el.answer : [el.answer],
              questionTemplateId: el.questionTemplateId,
              questionType: el.questionType
            }
          })
        }
				
				answers.forEach(element => {
					element.answers.forEach(el => {
						if (!el) {
							this.$tools.toast("请填写完整题目");
							return false
						}
					})
				})
				req.answers = answers
				this.isLoad = true
				actions.answerTask(req)
					.then(res => {
						this.isLoad = false
						this.$tools.toast("操作成功", "success");
						this.$tools.goNext(() => {
							this.$tools.navTo({
								url: `./index`,
							})
						});
					})
					.catch(res => {
						this.isLoad = false
					})
			},
			//修改
			eidt(){},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(list) {
				// console.log(list);
				// list.answer =list.pointList.filter(v=>v.answer).map(i=>i.content)
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			// 全选
			checkedAll() {
				this.list.map(val => {
					val.checked = true;
				})
			},
			success(value) {
				// console.log(value)
			},

		}
	}
</script>

<style lang="scss" scoped>
	.scroll-h {
		height: calc(100vh - 0rpx);

		.item-text-area {
			height: 120rpx;
			width: 100%;
			line-height: 40rpx;
			color: $u-content-color;
		}
	}
</style>

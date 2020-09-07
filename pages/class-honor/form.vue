<template>
	<view class="u-page u-bg-fff">
		<scroll-view scroll-y="true" class="scroll-h">
			<no-data v-if="subjectList.length === 0" msg="暂无数据~"></no-data>
			<u-collapse v-else @change="change" ref="collapse">
				<u-collapse-item class="u-bd-b u-padd-l20 u-padd-r20 u-padd-t10 u-padd-b10" :title="item.subjectName" v-for="(item, index) in subjectList" :key="index">
					<view class="collapse-item u-padd-b20">
						<u-radio-group v-model="item.chooseTeacher" @change="radioGroupChange($event, item)" :wrap="true" width="100%">
							<u-radio class="u-padd-10" v-for="(elem, index) in item.teacherList" :key="index" :name="elem.teacherCode">{{ elem.teacherName }}</u-radio>
						</u-radio-group>
					</view>
				</u-collapse-item>
			</u-collapse>
		</scroll-view>
		<view class="footer-btn u-fx-ac"><u-button @click="confirm" type="primary" class="u-fx-f1 u-mar-l u-mar-r u-type-primary-dark-bg">提交</u-button></view>
	</view>
</template>

<script>
import eventBus from '@u/eventBus';
import noData from '@/components/no-data/no-data.vue';
import { store, actions } from './store/index.js';
export default {
	name: 'add-teacher',
	components: {
		noData
	},
	data() {
		return {
			subjectList: [],
			chooseList: []
		};
	},
	async created() {
		this.classId = this.$tools.getQuery().get('classId');
		this.getSubjectList();
	},
	methods: {
		async getSubjectList() {
			const req = {
				schoolCode: store.userInfo.schoolCode,
				enable: '1'
			};
			const res = await actions.getSubList(req);
			this.subjectList = res.data.map(el => {
				return {
					...el,
					teacherList: [],
					chooseTeacher: ''
				};
			});
			this.showTeaList();
		},
		async showTeaList() {
			const req = {
				classId: this.classId,
				pageNum: 1,
				pageSize: 999,
				schoolCode: store.userInfo.schoolCode
			};
			const res = await actions.getClassTeacherList(req);
			res.data.list.forEach(ele => {
				if (ele.subjectName.split(',').length > 1) {
					ele.subjectName.split(',').forEach(item => {
						this.chooseList.push({
							teacherCode: ele.teacherCode,
							subjectName: item,
							subjectCode: this.subjectList.filter(el=> el.subjectName === item)[0].subjectCode
						});
					});
				} else {
					this.chooseList.push({
						teacherCode: ele.teacherCode,
						subjectName: ele.subjectName,
						subjectCode: this.subjectList.filter(el=> el.subjectName === ele.subjectName)[0].subjectCode
					});
				}
			});
			console.log(this.chooseList);
		},
		async getTeacherList(index) {
			const req = {
				pageNum: 1,
				pageSize: 999,
				schoolCode: store.userInfo.schoolCode,
				subjectCode: this.subjectCode
			};
			const res = await actions.getSubTeacherList(req);
			this.subjectList[index].teacherList = res.data.list.map(item => {
				return {
					...item,
					id: item.teacherCode,
					subjectName: this.subjectName,
					subjectCode: this.subjectCode
				};
			});
		},
		async change(index) {
			if(this.subjectList[index].teacherList.length > 0){
				return
			}
			this.subjectCode = this.subjectList[index].subjectCode;
			const i = this.chooseList.findIndex(list => {
				return list.subjectName === this.subjectList[index].subjectName;
			});
			if(i !== -1){
				this.subjectList[index].chooseTeacher = this.chooseList[i].teacherCode;
			}
			await this.getTeacherList(index);
			this.$refs.collapse.init();
		},
		radioGroupChange(e, item) {
			const i = this.chooseList.findIndex(list => {
				return list.subjectName === item.subjectName;
			});
			if(i !== -1){
				this.chooseList[i].teacherCode = e
			}else{
				this.chooseList.push({
					teacherCode: e,
					subjectName: item.subjectName,
					subjectCode: item.subjectCode
				})
			}
		},
		async confirm() {
			const req = [];
			await this.chooseList.forEach(ele => {
				req.push({
					classId: this.classId,
					schoolCode: store.userInfo.schoolCode,
					subjectCode: ele.subjectCode,
					teacherCode: ele.teacherCode
				});
			});
			console.log(req)
			await actions.addClassTeacher(req)
			this.$tools.toast('操作成功', 'success');
			this.$tools.goNext(() => {
				eventBus.$emit('getList');
				this.$tools.goBack();
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-h {
	height: calc(100vh - 100rpx);
}
</style>

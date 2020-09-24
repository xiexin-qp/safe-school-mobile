<template>
	<ly-drawer :visible="show" mode="right" width="80%" @close="close">
		<u-tabs-swiper
			ref="uTabs"
			:bold="false"
			:current="current"
			@change="changeMenu"
			:list="tabList"
			:is-scroll="false"
			:show-bar="false"
			active-color="#fff"
			:active-item-style="{ background: '#2979ff', color: '#fff' }"
		></u-tabs-swiper>
		<swiper class="u-page" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<view class="ly-search"><input v-model="classText" placeholder="输入班级名进行过滤" /></view>
				<scroll-view :scroll-y="true" class="scroll-h">
					<no-data msg="暂无班级数据~" v-if="classDataTag"></no-data>
					<ly-tree
						ref="classTree"
						:filter-node-method="filterNode"
						:default-checked-keys="classCheckedKeys"
						:props="props"
						:load="loadNode"
						lazy
						show-checkbox
						node-key="id"
						@check="classCheck"
						defaultExpandAll
						check-on-click-node
						highlight-current
						childVisibleForFilterNode
					></ly-tree>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<view class="ly-search"><input v-model="teacherText" placeholder="输入教职工姓名进行过滤" /></view>
				<scroll-view :scroll-y="true" class="scroll-h">
					<no-data msg="暂无教职工数据~" v-if="teaDataTag"></no-data>
					<ly-tree
						ref="teacherTree"
						:filter-node-method="filterNode"
						:default-checked-keys="teacherCheckedKeys"
						defaultExpandAll
						:props="props"
						:load="taeLoadNode"
						lazy
						show-checkbox
						node-key="id"
						@check="teacherCheck"
						check-on-click-node
						highlight-current
						childVisibleForFilterNode
					></ly-tree>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view class="footer">
			<view class="button confirm" @tap="confirm">确定</view>
			<view class="button cancle" @tap="close">取消</view>
		</view>
	</ly-drawer>
</template>

<script>
import LyDrawer from '@/components/ly-drawer/ly-drawer.vue';
import LyTree from '@/components/ly-tree/ly-tree.vue';
import $ajax from '@u/request.js';
import hostEnv from '../../config/index.js';
import noData from '@/components/no-data/no-data.vue';
export default {
	name: 'lyTreeDrawer',

	components: {
		LyDrawer,
		LyTree,
		noData
	},
	watch: {
		classText(val) {
			this.$refs.classTree.filter(val);
		},
		teacherText(val) {
			this.$refs.teacherTree.filter(val);
		},
		classChecked(val) {
			this.selectedClassData = val;
		},
		teacherChecked(val) {
			console.log(val);
			this.selectedTeacherData = val;
		}
	},
	data() {
		return {
			classText: '',
			teacherText: '',
			current: 0,
			swiperCurrent: 0,
			tabList: [
				{
					name: '班级'
				},
				{
					name: '教职工'
				}
			],
			showTree: false,
			isReady: false,
			isteaReady: false,
			teaDataTag: false,
			classDataTag: false,
			props: {
				label: 'name',
				children: 'children',
				isLeaf: 'leaf'
			},
			selectedClassData: [],
			selectedTeacherData: [],
			classList: [],
			teacherList: [],
			treeData: [],
			classCheckedKeys: [],
			teacherCheckedKeys: []
		};
	},

	props: {
		isClear: Boolean,
		show: Boolean,
		disabled: Boolean,
		type: String,
		classChecked: Array,
		teacherChecked: Array,
		schoolInfo: Object
	},
	created() {
		console.log(this.disabled);
	},
	methods: {
		changeMenu(item) {
			this.swiperCurrent = item;
		},
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		setClassCheckedKeys() {
			let arr = [];
			this.classChecked.forEach(el => {
				arr.push(el.classCode);
			});
			this.$nextTick(() => {
				this.classCheckedKeys = arr;
			});
		},
		setTeaCheckedKeys() {
			let arr = [];
			this.teacherChecked.forEach(el => {
				arr.push(el.userCode);
			});
			this.$nextTick(() => {
				this.teacherCheckedKeys = arr;
			});
		},
		classCheck(obj) {
			console.log(obj);
			this.selectedClassData = obj.checkedNodes;
		},
		teacherCheck(obj) {
			this.selectedTeacherData = obj.checkedNodes;
		},
		loadNode(node, resolve) {
			if (node.level === 0) {
				$ajax
					.postForm({
						url: `${hostEnv.lz_user_center}/grade/manage/list`,
						params: {
							schoolYearId: this.schoolInfo.schoolYearId,
							schoolCode: this.schoolInfo.schoolCode
						}
					})
					.then(res => {
						if (!res.data || res.data.list.length === 0) {
							this.classDataTag = true;
							this.isReady = true;
							return;
						}
						let gradeArr = [];
						res.data.list.forEach(ele => {
							gradeArr.push({
								name: ele.name,
								gradeCode: ele.code,
								id: ele.code,
								type: '1',
								disabled: this.disabled
							});
						});
						this.$tools.goNext(() => {
							this.isReady = true;
							resolve(gradeArr);
						});
					})
					.catch(() => {
						this.classDataTag = true;
					});
			} else {
				if (node.level > 1) return resolve([]);
				$ajax
					.post({
						url: `${hostEnv.lz_user_center}/classManage/list`,
						params: {
							schoolYearId: this.schoolInfo.schoolYearId,
							schoolCode: this.schoolInfo.schoolCode,
							gradeCode: node.data.gradeCode
						}
					})
					.then(res => {
						if (!res.data) {
							resolve([]);
							return;
						}
						let classArr = [];
						res.data.list.forEach(ele => {
							classArr.push({
								name: ele.className,
								className: ele.className,
								classCode: ele.classCode,
								leaf: true,
								id: ele.classCode,
								gradeCode: ele.gradeCode,
								gradeName: ele.gradeName,
								schoolYearId: ele.schoolYearId,
								type: '2',
								photoUrl: ele.photoUrl,
								disabled: this.disabled
							});
						});
						this.$tools.goNext(() => {
							resolve(classArr);
							this.setClassCheckedKeys();
						});
					});
			}
		},
		taeLoadNode(node, resolve) {
			if (node.level === 0) {
				$ajax
					.getUrl({
						url: `${hostEnv.lz_user_center}/school/org/getSchoolRoot/${this.schoolInfo.schoolCode}`
					})
					.then(res => {
						if (!res.data) {
							this.teaDataTag = true;
							resolve([]);
							return;
						}
						let orgArr = [];
						res.data.orgChilds.forEach(ele => {
							orgArr.push({
								name: ele.name,
								orgCode: ele.code,
								id: ele.code,
								type: '1',
								disabled: this.disabled
							});
						});
						$ajax.post({
							url: `${hostEnv.lz_user_center}/userinfo/teacher/user/node/teachers`,
							params: {
								orgCode: res.data.code,
								schoolCode: this.schoolInfo.schoolCode,
								page: 1,
								size: 99999
							}
						}).then(result => {
							if(result.data.list.length > 0) {
								orgArr.push({
									name: '其他',
									id: res.data.id,
									type: '3',
									orgCode: this.schoolInfo.schoolCode,
									disabled: this.disabled
								});
							}
							this.$tools.goNext(() => {
								resolve(orgArr);
							});
						})
					})
					.catch(() => {
						this.teaDataTag = true;
					});
			} else {
				if (node.level > 1) return resolve([]);
				let res = null;
				const req = {
					schoolCode: this.schoolInfo.schoolCode,
					orgCode: node.data.orgCode,
					page: 1,
					size: 99999
				};
				if (node.data.type === '3') {
					res = $ajax.post({
						url: `${hostEnv.lz_user_center}/userinfo/teacher/user/node/teachers`,
						params: req
					});
				} else {
					res = $ajax.post({
						url: `${hostEnv.lz_user_center}/userinfo/teacher/user/queryTeacherInfo`,
						params: req
					});
				}
				res.then(res => {
					if (!res.data || res.data.list.length === 0) {
						this.isteaReady = true;
						resolve([]);
						return;
					}
					let teaArr = [];
					res.data.list.forEach(ele => {
						teaArr.push({
							type: '2',
							name: ele.userName,
							userName: ele.userName,
							userCode: ele.userCode,
							leaf: true,
							id: ele.userCode,
							orgCode: ele.orgCode,
							orgName: ele.orgName,
							mobile: ele.mobile,
							disabled: this.disabled
						});
					});
					this.$tools.goNext(() => {
						this.isteaReady = true;
						resolve(teaArr);
						this.setTeaCheckedKeys();
					});
				});
			}
		},
		/* teaTreeData() {
			actions.getOrgBySchool(this.schoolInfo.schoolCode).then(res => {
				this.treeData = this.newOrgData([res.data]);
			});
		},
		// 深层递归
		newOrgData(data) {
			data.forEach(item => {
				item.children = item.orgChilds || null;
				item.label = item.name;
				item.id = item.code;
				if (item.orgChilds && item.orgChilds.length > 0) {
					this.newOrgData(item.orgChilds);
				}
			});
			return data;
		}, */
		close() {
			this.classText = '';
			this.teacherText = '';
			if(this.isClear){this.$refs.tree.setCheckAll(false)}
			this.$emit('close');
		},
		confirm() {
			this.classText = '';
			this.teacherText = '';
			if(this.isClear){this.$refs.tree.setCheckAll(false)}
			console.log(this.selectedClassData);
			this.$emit('confirm', this.selectedClassData, this.selectedTeacherData);
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.name.indexOf(value) !== -1;
		}
	}
};
</script>

<style lang="scss">
.footer {
	position: fixed;
	z-index: 998;
	left: 0;
	bottom: 0;
	background: #ffffff;
	width: 100%;
	height: 100rpx;
	overflow: hidden;
	box-shadow: 1rpx 1rpx 8px #c7c7c7;
}

.footer .button {
	width: 50%;
	border: none;
	text-align: center;
	float: right;
	font-size: 30rpx;
	border-radius: 0;
	height: 100rpx;
	line-height: 100rpx;
}

.footer .button:after {
	width: 0;
	height: 0;
}

.footer .button.confirm {
	background: #2979ff;
	color: #fff;
}

.footer .button.cancle {
	background: $u-border-color;
}
.scroll-h {
	height: calc(100vh - 240rpx);
}
.ly-search {
	margin: 0 30rpx;
	margin-top: 20rpx;
	padding-bottom: 15rpx;
	border-bottom: 1px solid #ededed;
}
uni-input {
	font-size: 28rpx;
}
</style>

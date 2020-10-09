<template>
  <view class="u-page">
    <view class="head">
      <ms-dropdown-menu v-if="showClass"
        ><ms-dropdown-item
          v-model="value0"
          :list="classList"
          :title="defTitle"
        ></ms-dropdown-item
      ></ms-dropdown-menu>
    </view>
    <scroll-view scroll-y="true" class="scroll-h" @scrolltolower="loadMore">
         <praiseList  :data-list="studentList" @goDetail="goDetail"></praiseList>
    </scroll-view>
     <view class="foot">
      <view class="float-add-btn" @click="add"></view>
    </view>
  </view>
</template>

<script>
import eventBus from "@u/eventBus";
import msDropdownMenu from "@/components/ms-dropdown/dropdown-menu.vue";
import msDropdownItem from "@/components/ms-dropdown/dropdown-item.vue";
import { store, actions } from "../store/index.js";
import hostEnv from "../../../../config/index.js";
import PraiseList from "../../component/praiseList.vue";
export default {
  name: "index",
  components: {
    msDropdownMenu,
    msDropdownItem,
    PraiseList
  },
  data() {
    return {
      classCode: "",
      gradeCode: "",
      schoolYearId: "",
      studentList: [],
      total: 0,
      pageList: {
        page: 1,
        size: 20,
      },
       morePage: false,
      userType: 2, // 0.超管，1.班主任，2.教职工，3.家长
      value0: "",
      classList: [],
      defTitle: "",
      showClass: false,
    };
  },
 	watch: {
		value0(val, oldval) {
			if (val !== oldval) {
				if (store.isBZR && val === store.isBZR.classCode) {
					this.userType = 1;
				} else {
					this.userType = 2;
				}
				let choose = this.classList.filter(el => {
					return el.value === val;
				})[0];
				this.defTitle = choose.text;
				this.gradeCode = choose.gradeCode;
				this.classCode = val;
				uni.setStorageSync('bindInfo', {
					...this.classList.filter(el => {
						return el.value === val;
					})[0],
					classCode: val
				});
				eventBus.$on('getList', () => {
					this.showList();
				});
				this.showList();
			}
		}
	},
	async created() {
    this.schoolYearId = store.schoolYear.schoolYearId;
		if (store.userInfo.typeCode === '4') {
			this.userType = 2;
			this.classList = JSON.parse(uni.getStorageSync('protal')).teachClassList;
			if (this.classList.length === 0) {
				this.$tools.toast('请绑定班级');
				return;
			}
			this.classCode = this.classList[0].value;
			this.gradeCode = this.classList[0].gradeCode;
			this.showClass = true;
			this.defTitle = this.classList[0].text;
			this.value0 = this.classList[0].value;
			uni.setStorageSync('bindInfo', {
				...this.classList[0],
				classCode: this.classList[0].value
			});
		} else if (store.userInfo.typeCode === '16') {
			this.userType = 3;
			this.classCode = store.childList[0].classCode;
			this.gradeCode = store.childList[0].gradeCode;
			uni.setStorageSync('bindInfo', {
				...store.childList[0]
			});
			this.showList();
		}
	},
  mounted() {},
  methods: {
    async showList(tag = false) {
      if (tag) {
        this.pageList.page += 1;
      } else {
        this.pageList.page = 1;
      }
      const req = {
        ...this.pageList,
        schoolCode: store.userInfo.schoolCode,
        gradeId: this.gradeCode,
        classId: this.classCode,
        schoolYearId: this.schoolYearId,
      };
      const res = await actions.getStudentList(req);
      if (tag) {
        this.studentList = this.studentList.concat(res.data.list);
      } else {
        this.studentList = res.data.list;
      }
      this.morePage = res.data.hasNextPage;
    },
    loadMore() {
      if (!this.morePage) {
        this.$tools.toast("数据已加载完毕");
        return;
      }
      this.showList(true);
    },
    goDetail(id) {
      this.$tools.navTo({
        url: "./detail?id=" + id,
      });
    },
    add() {
      this.$tools.navTo({
        url: "./form",
        title: "发布表扬",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-h {
  height: calc(100vh - 120rpx);
}
.head{
  height: 100rpx;
}
</style>

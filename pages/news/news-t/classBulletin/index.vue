<template>
  <view class="home qui-page qui-fx qui-fx-ver">
    <view id="title"><uni-search-bar @confirm="search" @input="input"></uni-search-bar></view>
    <scroll-view @refresherpulling="haha" scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
      <view class="content">
        <view class="record-box">
          <no-data msg="暂无考勤记录~" v-if="dataList.length === 0"></no-data>
          <view class="leave-box" v-for="list in dataList" :key="list.id">
            <view class="work-box qui-fx-jsb">
              <text class="content_" @click="goDetail()">
                我学召开第三次会议会议会议会议
                <view class="time_">我 发布于2020年1月3日 16:23</view>
              </text>
              <text class="img_"><img :src="approveImg"/></text>
              <view class="operation_" @click="actionsheet">...</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="add_btn"><button type="primary" size="mini" @click="addNews()">+</button></view>
  </view>
</template>
<script>
import eventBus from '@u/eventBus.js';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
export default {
  components: {},
  data() {
    return {
      dataList: [
        {
          id: 0,
          name: '张三',
          age: '13071213738',
          hobby: '武汉全品'
        },
        {
          id: 1,
          name: '李四',
          age: '13071213738',
          hobby: '武汉全品'
        },
        {
          id: 2,
          name: '王二',
          age: '13071213738',
          hobby: '武汉全品'
        },
        {
          id: 3,
          name: '码字',
          age: '13071213738',
          hobby: '武汉全品'
        }
      ],

      approveImg: ''
    };
  },
  components: {
    uniSearchBar
  },
  filters: {},
  onLoad(options) {
    console.log(options);
  },
  onPullDownRefresh() {
    this.showList();
  },
  mounted() {
    this.showList();
    eventBus.$on('change', () => {
      this.title = '新标题';
    });
  },
  methods: {
    actionsheet() {
      const arr = ['编辑', '删除'];
      this.$tools.actionsheet(['编辑', '删除'], index => {
        console.log(arr[index]);
        if (arr[index] == '编辑') {
          uni.navigateTo({
            url: './addnews'
          });
        } else if (arr[index] == '删除') {
          this.$tools.confirm('确定删除吗', () => {});
        }
      });
    },
    goDetail() {
      uni.navigateTo({
        url: './detail'
      });
    },
    addNews() {
      uni.navigateTo({
        url: './addnews'
      });
    },
    async showList(tag = false) {
      const res = await actions.getIndex();
      if (tag) {
        this.dataList = this.dataList.concat(res.data);
      } else {
        this.dataList = res.data;
        uni.stopPullDownRefresh();
      }
    },
    chooseRole(e) {
      this.currentRole = e.target.value;
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-h {
  height: 100vh;
}
.work-box {
  background-color: #fff;
  border-radius: 8rpx;
  margin: 20rpx;
  padding: 50rpx;
  border-bottom: 1rpx solid #cfd0d1;
  .work-line {
    border-left: 2rpx 7b92f5 dashed;
  }
  .img_ img {
  .img_ img {
    width: 60rpx;
    width: 60rpx;
    margin-right: 10px;
  }
  }
  .content_ {
    font-size: 13px;
    color: #333333;
  }
  .time_ {
    margin-top: 10px;
    font-size: 11px;
    color: #999999;
  }
  .operation_ {
    font-weight: 400;
    font-style: normal;
    font-size: 25px;
    color: #555555;
  }
}
.add_btn {
  text-align: center;
  button {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    font-weight: 700;
  }
}
</style>

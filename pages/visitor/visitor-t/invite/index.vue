<template>
  <view class="qui-page">
    <uni-search-bar placeholder="输入姓名搜索" @confirm="search"></uni-search-bar>
    <view class="dropDown qui-fx">
      <ms-dropdown-menu>
        <ms-dropdown-item v-model="value0" :list="casueList">
        </ms-dropdown-item>
      </ms-dropdown-menu>
      <ms-dropdown-menu>
        <ms-dropdown-item v-model="value1" :list="dateList">
        </ms-dropdown-item>
      </ms-dropdown-menu>
      <ms-dropdown-menu>
        <ms-dropdown-item v-model="value2" :list="statusList">
        </ms-dropdown-item>
      </ms-dropdown-menu>
    </view>
    <uni-popup ref="popup" type="bottom">
      <view class="pop qui-fx-ver">
        <text @click="appoint(1)">修改</text>
        <text @click="appoint(2)">再次发起邀约</text>
        <text @click="appoint(0)">取消</text>
      </view>
    </uni-popup>
     <no-data v-if="false" msg="暂无数据"></no-data>
     <scroll-view @refresherpulling="haha" scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
       <view class="approve-list" v-for="(list,i) in 10" :key="list.id" >
         <view class="detail qui-fx">
           <view class="process-type" style="right: 20rpx">
             <view class="wait" @click="open(i)">···</view>
           </view>
           <view class="info qui-fx-ac">
             <view class="img">
                <image :src="errorImg" alt=""/>
              </view>
              <view class="list qui-fx-f1">
                  <view class="name">李煜</view>
                  <view>开始时间：2020年2月1日  12:00</view>
                  <view>结束时间：2020年2月1日  12:00</view>
                  <view>来访事由：家长会 </view>
                  <view>状态：待审批 </view>
               </view>
             </view>
         </view>
         <view class="line qui-bd-t"></view>
         <view class="see qui-fx-jsb">
           <text>2020年2月1日 11:00</text>
           <view class="qui-fx qui-fx-ac">
             <text @click="goDetail()">查看详情</text>
             <view class="icon right">
               <text class="iconfont">&#xe851;</text>
             </view>
           </view>
         </view>
       </view>
     </scroll-view>
     
  </view>
</template>

<script>
  import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
  import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
  import noData from '@/components/no-data/no-data.vue'
  import eventBus from '@u/eventBus.js'
  import { actions } from '../store/index.js'
	export default {
    components: {
      msDropdownMenu,
      msDropdownItem,
      noData
    },
		data() {
			return {
        errorImg: require('@s/img/person.png'),
        appointList: [],
        value0: '0',
        value1: '0',
        value2: '0',
        casueList: [
          {
              text: '全部事由',
              value: '0'
          },
          {
              text: '看望孩子',
              value: '1'
          },
          {
              text: '家长会',
              value: '2'
          },
          {
              text: '商务拜访',
              value: '3'
          }
        ],
        dateList: [
          {
              text: '全部状态',
              value: '0'
          },
          {
              text: '待审批',
              value: '1'
          },
          {
              text: '审批通过',
              value: '2'
          },
          {
              text: '审批不通过',
              value: '3'
          }
        ],
        statusList: [
          {
              text: '全部时间',
              value: '0'
          },
          {
              text: '一周内',
              value: '1'
          },
          {
              text: '一个月内',
              value: '2'
          },
          {
              text: '六个月内',
              value: '3'
          }
        ]
			}
		},
    watch: {
      value0(val) {
        console.log(val)
      },
      value1(val) {
        console.log(val)
      },
      value2(val) {
        console.log(val)
      },
    },
    onLoad(options) {
      console.log(options)
    },
    onPullDownRefresh() {
      this.showList()
    },
    mounted() {
      this.showList()
      eventBus.$on('change', () => {
        alert(4)
      })
    },
		methods: {
      async showList (tag = false) {
        const res = await actions.getIndex()
        if (tag) {
          this.appointList = this.appointList.concat(res.data)
        } else {
          this.appointList = res.data
          uni.stopPullDownRefresh()
        }
      },
      search(value){
        console.log(value)
      },
      goDetail (id) {
        uni.navigateTo({
          url: './detail?id=' + id
        })
      },
      open(id){
         console.log(id)
         this.$refs.popup.open()
      },
      appoint(type){  // 1.通过 2.不通过 3.取消
        console.log(type)
        this.$refs.popup.close()
      }
		}
	}
</script>

<style lang="scss" scoped>
  .approve-list {
    background-color:#fff;
    border-radius: 16rpx;
    margin: 20rpx;
    position: relative;
    .detail{
      padding: 20rpx;
    }
    .process-type {
      top: 0;
      right: 20rpx;
      position: absolute;
      font-size: 48rpx;
      .wait {
        color: #0079FF
      }
      .agree {
        color: #69c08f;
      }
      .refuse {
        color: #e37e7e;
      }
      .cancel {
        color: #333333;
      }
    }
    .see{
      padding:20rpx 10rpx 20rpx 20rpx;
      text{
        color: #999;
        font-size: 24rpx;
      }
    }
    .info{
      .img{
        width:160rpx;
        height:200rpx;
        margin-right: 20rpx;
        image{
          width:160rpx;
          height:200rpx;
          background-color: #ddd;
        }
      }
      .list {
        view{
          font-size: 24rpx;
          margin: 10rpx 0;
        }
        .name{
          padding-bottom: 10rpx;
          font-size: 28rpx; 
          font-weight: bold;
        }
      }
    }
  }
  .scroll-h {
    height: 100vh;
  }
  .dropdown{
    padding: 4rpx 18rpx 18rpx 18rpx;
    background: #fff;
    font-size: 12px;
  }
  .dropdown-menu{
    width: 50%;
    padding: 2rpx 0;
    border: 1rpx solid #ddd;
  }
  .dropdown-menu:first-child{
    border-top-left-radius: 8rpx;
    border-bottom-left-radius: 8rpx;
  }
  .dropdown-menu:last-child{
    border-top-right-radius: 8rpx;
    border-bottom-right-radius: 8rpx;
  }
  .dropdown-item__selected{
    padding: 10rpx;
  }
  @font-face {
    font-family: 'iconfont';  /* project id 1564327 */
    src: url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot');
    src: url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot?#iefix') format('embedded-opentype'),
    url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff2') format('woff2'),
    url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff') format('woff'),
    url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.ttf') format('truetype'),
    url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.svg#iconfont') format('svg');
  }
  .icon{
    margin-left: 10rpx;
  }
  .iconfont{
  	font-family:"iconfont" !important;
  	font-size:24rpx;
  	font-style:normal;
  	-webkit-font-smoothing: antialiased;
  	-webkit-text-stroke-width: 0.2px;
  	-moz-osx-font-smoothing: grayscale;
  }
  .down {
  	transition: transform .3s;
  	transform: rotateZ(0);
  }
  .up {
  	transition: transform .3s;
  	transform: rotateZ(-180deg);
  }
  .right{
    transform: rotateZ(-90deg);
  }
  .pop{
    text-align: center;
    text{
      padding: 20rpx 0;
    }
    text:not(:last-child){
      border-bottom: 1rpx solid #ddd;
    }
    .title{
      padding: 20rpx 0 0 0;
    }
    input{
      border:1rpx solid #ddd;
      margin: 20rpx 0;
    }
    .btn {
      padding:0 20rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      letter-spacing: 8rpx;
      background-color: $main-color;
      color:#fff;
    }
   }
</style>

<template>
  <div class="set qui-page qui-fx-ver qui-fff">
    <div class="qui-fx-ac qui-fx-jsb set-info div-shadow">
      <div class="set-img">
        <image :src="detailInfo.profilePhoto || '/mobile-img/person-auto.png'" alt="" />
      </div>
      <div class="qui-fx-ver">
        <div class="set-name">{{detailInfo.userName}}</div>
        <div class="set-class u-font-2">{{detailInfo.className}}</div>
        <div class="set-class u-font-2">ID: {{detailInfo.userCode}}</div>
      </div>
      <div>
        <u-button v-if="detailInfo.feverMark === '1'" type="success" size="mini">正常</u-button>
        <u-button v-else type="error" size="mini">发热</u-button>
      </div>
    </div>
    <div class="set-info div-shadow">
      <u-cell-group :border="false">
        <u-cell-item :arrow="false"
          title="体温"
          :value="`${detailInfo.temperature}℃`"
        />
        <u-cell-item :arrow="false"
          title="发热状态"
          :value="detailInfo.feverMark === '1' ? '正常' : '发热' "
          :value-style='{ color: detailInfo.feverMark === "1" ? "#19be6b" : "#fa3534"}'
        />
        <u-cell-item :arrow="false" title="上报人" :value="detailInfo.reportPersonName" />
        <u-cell-item :arrow="false" title="上报时间" :value="detailInfo.reportTime" />
      </u-cell-group>
    </div>
  </div>
</template>

<script>
import { actions } from './store'
export default {
  components: {
  },
  data() {
    return {
      detailInfo: {
        temperature: '36.3',
        feverMark: '1',
        userName: '张三',
        className: '高一(6)班',
        userCode: '2019000827',
        reportPersonName: '张三',
        reportTime: '2020-04-20 09:17:20',
      },
      id: ''
    }
  },
  onLoad(options) {
    
  },
  async mounted() {
    // this.id = this.$route.query.id
    // const res = await actions.reportDetail(this.id)
    // this.detailInfo = res.result
    // this.detailInfo.reportTime = this.$tools.gmtToDate(this.detailInfo.reportTime)
  }
}
</script>

<style lang="scss" scoped>
.set {
  .set-info {
    margin: 20rpx;
    padding: 30rpx;
    border-radius: 10rpx;
    .set-img {
      width: 150rpx;
      height: 150rpx;
      image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .set-name {
      font-size: 38rpx;
      font-weight: bold;
      color: $u-main-color;
      margin-bottom: 5rpx;
    }
    .set-class {
      color: $u-tips-color;
      margin-top: 10rpx;
    }
  }
  .div-shadow {
    box-shadow: 2rpx 2rpx 8rpx $u-border-color-one;
    overflow: hidden;
  }
}
</style>

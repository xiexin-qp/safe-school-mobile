<template>
	<view class="tab-list qui-fx-jc">
    <view class="tab-title qui-fx">
      <view v-for="tab in tabList" :key="tab.id" @click="tabChange(tab.id)" class="tab act">
        {{ tab.title }}
      </view>
    </view>
	</view>
</template>

<script>
	export default {
    props: {
      tabList: {
        type: Array,
        default: () => {
          return []
        }
      },
      value: {
        type: Number,
        default: 0
      }
    },
    computed: {
      currentType: {
        get () {
          return this.value
        },
        set (index) {
          this.$emit('input', index)
        }
      }
    },
		data() {
			return {
			}
		},
		methods: {
			tabChange (index) {
        uni.showToast({
            title: index + '呵呵',
            duration: 2000,
            mask: false
        });
        this.currentType = index
      }
		}
	}
</script>

<style lang="scss" scoped>
  .tab-title {
    border: 1px #F5F5F5 solid;
    overflow: hidden;
    border-radius: 10rpx;
    .tab {
      line-height: 60rpx;
      height: 60rpx;
      padding: 0 44rpx;
      border-left: 1px #F5F5F5 solid;
      &:first-child {
        border-left: none;
      }
    }
    .act {
      background-color: $main-color;
      color: #fff;
    }
  }
</style>

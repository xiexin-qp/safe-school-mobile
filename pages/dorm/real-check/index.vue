<template>
  <view>
    <component :is="currentCom" :dept-code="deptCode" v-if="deptCode"></component>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import RealCheckS from './RealCheckS'
import RealCheckT from './RealCheckT'
import { store } from '../store/index.js';
export default {
  name: 'RealCheck',
  data () {
    return {
      currentCom: '',
      deptCode:''
    }
  },
  created () {
    this.$tools.isBZR(store.userInfo).then(res => {
			if (res) {
        this.deptCode = res[0].classCode
        this.currentCom = RealCheckT
			} else {
				this.$tools.isDormMamage(store.userInfo).then(res => {
					if (res) {
            this.deptCode = res.buildingCode
					}
        })
        this.currentCom = RealCheckS
			}
		})
  }
}
</script>

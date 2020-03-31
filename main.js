import Vue from 'vue'
import App from './App'
import tools from './utils/tools.js'
import './static/css/base.css'
import './static/css/uni-icon.css'
Vue.config.productionTip = false
Vue.prototype.$tools = tools
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()

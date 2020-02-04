import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入饿了么
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios'
// 引入mock数据
import './assets/mock/all_mock'
import './assets/mock/new_mock'
// 引入Echarts
import echarts from 'echarts'
import '../src/assets/map/js/china.js'
import '../src/assets/map/js/province/anhui'
import '../src/assets/map/js/province/aomen'
import '../src/assets/map/js/province/beijing'
import '../src/assets/map/js/province/chongqing'
import '../src/assets/map/js/province/fujian'
import '../src/assets/map/js/province/gansu'
import '../src/assets/map/js/province/guangdong'
import '../src/assets/map/js/province/guangxi'
import '../src/assets/map/js/province/guizhou'
import '../src/assets/map/js/province/hainan'
import '../src/assets/map/js/province/hebei'
import '../src/assets/map/js/province/heilongjiang'
import '../src/assets/map/js/province/henan'
import '../src/assets/map/js/province/hubei'
import '../src/assets/map/js/province/hunan'
import '../src/assets/map/js/province/jiangsu'
import '../src/assets/map/js/province/jiangxi'
import '../src/assets/map/js/province/jilin'
import '../src/assets/map/js/province/liaoning'
import '../src/assets/map/js/province/neimenggu'
import '../src/assets/map/js/province/ningxia'
import '../src/assets/map/js/province/qinghai'
import '../src/assets/map/js/province/shandong'
import '../src/assets/map/js/province/shanghai'
import '../src/assets/map/js/province/shanxi'
import '../src/assets/map/js/province/shanxi1'
import '../src/assets/map/js/province/sichuan'
import '../src/assets/map/js/province/taiwan'
import '../src/assets/map/js/province/tianjin'
import '../src/assets/map/js/province/xianggang'
import '../src/assets/map/js/province/xinjiang'
import '../src/assets/map/js/province/xizang'
import '../src/assets/map/js/province/yunnan'
import '../src/assets/map/js/province/zhejiang'

Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

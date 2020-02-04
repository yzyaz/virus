import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入饿了么
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios'
// 引入mock数据
import './assets/mock/all_mock'
import './assets/mock/new_mock'
// 引入Echarts
import echarts from 'echarts'
// import 'echarts/map/js/china.js'
import 'echarts/map/js/province/anhui'
import 'echarts/map/js/province/aomen'
import 'echarts/map/js/province/beijing'
import 'echarts/map/js/province/chongqing'
import 'echarts/map/js/province/fujian'
import 'echarts/map/js/province/gansu'
import 'echarts/map/js/province/guangdong'
import 'echarts/map/js/province/guangxi'
import 'echarts/map/js/province/guizhou'
import 'echarts/map/js/province/hainan'
import 'echarts/map/js/province/hebei'
import 'echarts/map/js/province/heilongjiang'
import 'echarts/map/js/province/henan'
import 'echarts/map/js/province/hubei'
import 'echarts/map/js/province/hunan'
import 'echarts/map/js/province/jiangsu'
import 'echarts/map/js/province/jiangxi'
import 'echarts/map/js/province/jilin'
import 'echarts/map/js/province/liaoning'
import 'echarts/map/js/province/neimenggu'
import 'echarts/map/js/province/ningxia'
import 'echarts/map/js/province/qinghai'
import 'echarts/map/js/province/shandong'
import 'echarts/map/js/province/shanghai'
import 'echarts/map/js/province/shanxi'
import 'echarts/map/js/province/shanxi1'
import 'echarts/map/js/province/sichuan'
import 'echarts/map/js/province/taiwan'
import 'echarts/map/js/province/tianjin'
import 'echarts/map/js/province/xianggang'
import 'echarts/map/js/province/xinjiang'
import 'echarts/map/js/province/xizang'
import 'echarts/map/js/province/yunnan'
import 'echarts/map/js/province/zhejiang'

// Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

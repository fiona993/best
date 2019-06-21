
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

// 引入vuex数据仓库
import store from "@/core/store/index"

import core from '@/core/core.config'
Vue.use(core)

//图标库
import 'font-awesome/css/font-awesome.css'

//标题
Vue.use(require('vue-wechat-title'));

//懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('@/assets/laz.jpg')
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

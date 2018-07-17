// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from "element-ui"
import 'element-ui/lib/theme-default/index.css'
import echarts from 'echarts'
import Validator from 'vue-validator'
import Resource from 'vue-resource';

Vue.use(Resource);
Vue.use(Validator)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(elementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

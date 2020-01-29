import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router/index'
import store from './store/index'
// import vuescroll from 'vuescroll';
// import 'vuescroll/dist/vuescroll.css';
import 'ant-design-vue/dist/antd.css'
import '@/assets/css/theme.less'
import '@/assets/icon/iconfont'
import WrapperContent from '@/components/layout/WrapperContent'
import common from "./mixins/common";

import {
  message,
  notification
} from 'ant-design-vue'
import {
  notice,
  destroyNotice
} from './assets/js/notice'

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$notice = notice;
Vue.prototype.$destroyNotice = destroyNotice;
Vue.use(store);
Vue.use(Antd);
Vue.component('WrapperContent', WrapperContent);
// Vue.use(vuescroll);
Vue.config.productionTip = false

// Vue.prototype.$vuescrollConfig = {
//   vuescroll: {
//     mode: 'native'
//   },
//   scrollPanel: {
//     scrollingX: true,
//   },
//   bar: {
//     delayTime: 500,
//     onlyShowBarOnScroll: false,
//     background: "#cecece",
//     keepShow: false
//   }
// }
Vue.mixin(common);
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
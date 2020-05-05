import Vue from 'vue'
import App from './App.vue'
import viewBox from '../packages/view-box/index';

Vue.config.productionTip = false
Vue.use(viewBox)

new Vue({
  render: h => h(App),
}).$mount('#app')

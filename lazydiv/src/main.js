import Vue from 'vue'
import App from './App.vue'
import LazyDiv from './index.js'
import LazyBackground from '../../../../wuyang/vue-lazy-background-component/dist/bundle'

console.log(LazyBackground)
// Vue.use(LazyDiv)
Vue.use(LazyBackground)
new Vue({
  el: '#app',
  render: h => h(App)
})

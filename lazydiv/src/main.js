import Vue from 'vue'
import App from './App.vue'
import LazyDiv from './index.js'
console.log(LazyDiv)

Vue.use(LazyDiv)
new Vue({
  el: '#app',
  render: h => h(App)
})

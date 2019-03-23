import Vue from 'vue'
import App from './App.vue'
import LazyDiv from '../../lazydiv/dist/lazydiv'

Vue.use(LazyDiv)

new Vue({
  el: '#app',
  render: h => h(App)
})

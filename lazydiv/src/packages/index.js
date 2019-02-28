import Lazydiv from './lazydiv.vue'
Lazydiv.install = Vue => Vue.component(Lazydiv.name, Lazydiv);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Lazydiv);
}

export default Lazydiv

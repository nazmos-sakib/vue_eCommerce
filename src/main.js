// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iziToast from 'iziToast'
import Model from './components/others/Model'
import store from './store'


Vue.config.productionTip = false
var eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;

Vue.prototype.$axios = axios;
Vue.prototype.$iziToast = iziToast;

Vue.component("model", Model);

window.tokenParam = JSON.stringify({service_name: "verifyToken","param" : {}});

router.beforeEach((to, from, next)=>{
	axios.defaults.headers.common['Authorization'] = "Token" + localStorage.getItem("token");
	axios.defaults.headers.common['Content-Type'] = "application/json";
	//console.log(to);
	next();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

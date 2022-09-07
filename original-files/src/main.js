import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAF0oFUVvBYhwxeKmh7ckTweq1npFVCxJg',
    libraries: 'places',
  },
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

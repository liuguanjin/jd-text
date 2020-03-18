import Vue from 'vue';
import App from './App.vue';
// 引入muse-ui
import MuseUI from 'muse-ui';
//引入muse-ui.css
import 'muse-ui/dist/muse-ui.css';
// 引入router路由
import router from "./components/routers/index.js";
// 引入vuex store对象
import store from "./components/store/index.js";
// 使用use方法引入muse-ui
Vue.use(MuseUI);
new Vue({
  el: '#app',
  router:router,
  store:store,
  render: h => h(App)
})

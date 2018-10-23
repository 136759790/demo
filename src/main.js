import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';

import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import VueI18n from 'vue-i18n';
import Locales from './locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';
import qs from 'qs';
import { Message } from 'iview';
import echarts from 'echarts';
import store from './store';


Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(iView);
Vue.prototype.$ajax = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$qs = qs;
Vue.prototype.$Message = Message;
// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);


// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    //在页面跳转的时候要吧所有的定时器关闭
    // let timers=store.state.app.timer;
    // for(var k in timers){
    //     window.clearInterval(timers[k]);
    // }
    // store.commit('clearTimer');
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});



new Vue({
    el: '#app',
    router: router,
    store:store,
    render: h => h(App)
});
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/main.css';

// @ts-ignore
import VueMathjax from 'vue-mathjax-next';

const app = createApp(App);

app.use(VueMathjax);
app.use(router);

app.mount('#app');

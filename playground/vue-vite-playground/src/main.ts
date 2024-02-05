import {createApp} from 'vue'
import './asset/style/index.scss'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 全局引入组件
import LcPlus from "lc-plus";

import 'lc-plus/index.css';

const app = createApp(App)
// 注册ElementPlus
app.use(ElementPlus, {
  locale // 语言设置
})

app.use(LcPlus)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)

app.mount('#app')

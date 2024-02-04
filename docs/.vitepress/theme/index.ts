import DefaultTheme from 'vitepress/theme'
import './style/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局引入组件库（开发环境）
import VcDesign from '../../../packages/components/src/index'
import '../../../packages/components/style/index.scss'
import { LCDemo } from '../vitepress'

export default {
  extends: DefaultTheme, // or ...DefaultTheme
  enhanceApp({ app }) {
    // 全局注册基础组件
    app.use(VcDesign)

    // 注册ElementPlus
    app.use(ElementPlus, {
      locale, // 语言设置
    })

    app.component('Demo', LCDemo)

    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}

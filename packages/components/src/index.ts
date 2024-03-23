import type { App } from 'vue'
import * as components from './components'
import '../style/index.scss'
import  './fontAwesome'

export * from './components'

// 引入常用变量
export * from './constants/base.ts'


const install = (app: App) => {
  for (let n in components) {
    app.use((components as any)[n])
  } // 注册组件list
}

export default install

import type { App } from 'vue'
import * as components from './components'
import '../style/index.scss'
import TypeButton from './table/src/TypeButton/index.vue'
import filterListRender from './table/src/filterListRender/index.vue'
import customTooltip from './table/src/customTooltip/index.vue'

export * from './components'

const builtIncomponents = {
  TypeButton,
  filterListRender,
  customTooltip,
}

const install = (app: App) => {
  for (let n in components) {
    app.use((components as any)[n])
  } // 注册组件list

  for (const componentListKey in builtIncomponents) {
    app.component(componentListKey, builtIncomponents[componentListKey])
  }
}

export default install

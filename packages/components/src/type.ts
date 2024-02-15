import LcTable from './table/src/table.vue'
// For this project development
import '@vue/runtime-core'


declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    LcTable: typeof LcTable
  }
}

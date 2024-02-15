import LcTable from './dist/es/table/src/table.vue'
// GlobalComponents for Volar
declare module 'vue' {
  export interface GlobalComponents {
    LcTable: typeof LcTable
  }
}

export {}

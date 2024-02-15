<script setup lang="ts">
import { LcTable } from 'lc-plus'
import { INDEX_COLUMNS } from 'lc-plus/constants/base.js' //从组件库暴露的常量

const columns = [
  INDEX_COLUMNS,
  { headerName: '姓名', field: 'name' },
  { headerName: '年龄', field: 'age' },
  { headerName: '时间', field: 'date' },
  { headerName: '住址', field: 'address' }
]

const tableData = [
  {
    date: '2016-05-03',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
    age: 5
  },
  {
    date: '2016-05-02',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
    age: 10
  },
  {
    date: '2016-05-04',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
    age: 16
  },
  {
    date: '2016-05-01',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
    age: 20
  }
]
const rowClassRules = {
  // row style function
  'sick-days-warning': (params) => {
    const numSickDays = params.data.age
    return  numSickDays >= 20
  },
  // row style expression
  'sick-days-breach': 'data.age <= 5'
}
</script>

<template>
  <div>
    <lc-table
      :height="550"
      :columns="columns"
      :tableData="tableData"
      :rowClassRules="rowClassRules"
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.sick-days-warning ) {
  background-color: #cc693344;
}

:deep(.sick-days-breach ) {
  background-color: #cc333344;
}
</style>

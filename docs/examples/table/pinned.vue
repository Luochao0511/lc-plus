<template>
  <div>
    <lc-table :height="550" :columns="columns" :tableData="tableData" />
  </div>
</template>

<script setup lang="ts">
import { LcTable } from 'lc-plus'

const columns = [
  { headerName: '姓名', field: 'name', pinned: true, lockPinned: true },
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

</script>



<style scoped lang="scss">

</style>

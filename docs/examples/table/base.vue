<script setup lang="ts">
import { LcTable } from 'lc-plus'

const columns = [
  { headerName: '时间', field: 'date' },
  { headerName: '姓名', field: 'name' },
  { headerName: '住址', field: 'address' }
]

const tableData = [
  {
    date: '2016-05-03',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<template>
  <lc-table :height="550" :columns="columns" :tableData="tableData" />
</template>

<style scoped lang="scss"></style>

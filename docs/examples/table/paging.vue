<template>
  <div>
    <lc-table
      isPagination
      :pagination="pagination"
      :height="550"
      :columns="columns"
      :tableData="tableData"
    />
  </div>
</template>

<script setup lang="ts">
import { LcTable } from 'lc-plus'

const columns = [
  { headerName: '姓名', field: 'name', tooltipField: 'name' },
  { headerName: '年龄', field: 'age', tooltipField: 'age' },
  { headerName: '时间', field: 'date', tooltipField: 'date' },
  { headerName: '住址', field: 'address', tooltipField: 'address' }
]


const pagination = {
  current: 1,
  size: 15,
  total: 100
}

const tableData = [
  {
    date: '2016-05-03',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
    age: 5,
    sex: 1,
    category: '1'
  },
  {
    date: '2016-05-02',
    name: '杰瑞',
    address: 'No. 189, Grove St, Los Angeles',
    age: 10,
    sex: 2,
    category: '2'
  },
  {
    date: '2016-05-04',
    name: '唐老鸭',
    address: 'No. 189, Grove St, Los Angeles',
    age: 16,
    sex: 1,
    category: '3'
  },
  {
    date: '2016-05-01',
    name: '猪八戒',
    address: 'No. 189, Grove St, Los Angeles',
    age: 20,
    sex: 2,
    category: '4'
  }
]

</script>


<style scoped lang="scss">

</style>

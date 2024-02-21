<template>
  <div>
    <lc-table ref="tableRef" :height="550" :columns="columns" :tableData="tableData" :toolbar="toolbar">
      <template #header>
        <div>
          <el-input placeholder="搜索"></el-input>
        </div>
      </template>
    </lc-table>
  </div>
</template>

<script setup lang="ts">
import { LcTable } from 'lc-plus'
import { ref } from 'vue' //从组件库暴露的常量

const columns = [
  { headerName: '姓名', field: 'name', tooltipField: 'name' },
  { headerName: '年龄', field: 'age', tooltipField: 'age' },
  { headerName: '时间', field: 'date', tooltipField: 'date' },
  { headerName: '住址', field: 'address', tooltipField: 'address' }
]

const tableRef = ref(null)

const exportExcel = () => {
  tableRef.value.exportExcel('标准模板')
}

const toolbar = [{
  label: '导出',
  show: true,
  callback: exportExcel,
  type: 'primary'
}]

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

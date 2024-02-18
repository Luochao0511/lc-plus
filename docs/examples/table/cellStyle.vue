<template>
  <div>
    <lc-table :height="550" :columns="columns" :tableData="tableData" />
  </div>
</template>

<script setup lang="ts">
import { LcTable } from 'lc-plus'
import { INDEX_COLUMNS } from 'lc-plus/constants/base.js' //从组件库暴露的常量

const SEX_TYPE = {
  1: '男',
  2: '女'
}

const SEX_COLOR = {
  1: 'red',
  2: 'cyan'
}

const CATEGORY_TYPE = {
  1: '猫',
  2: '老鼠',
  3: '鸭子',
  4: '猪'
}

const columns = [
  INDEX_COLUMNS,
  { headerName: '姓名', field: 'name', tooltipField: 'name' },
  { headerName: '年龄', field: 'age', tooltipField: 'age' },
  {
    headerName: '性别', field: 'sex', tooltipField: 'sex', valueFormatter: (params) => {
      return SEX_TYPE[params.value] || params.value
    },
    cellStyle: params => {
      return {
        color: SEX_COLOR[params.value]
      }
    }
  },
  { headerName: '时间', field: 'date', tooltipField: 'date' },
  { headerName: '住址', field: 'address', tooltipField: 'address' },
  {
    headerName: '类别', field: 'category', tooltipField: 'category',
    valueGetter: (params) => {
      return CATEGORY_TYPE[params.data.category] || params.data.category
    },
    cellClass: params => {
      return params.data.category === '1' ? 'my-class-1' : 'my-class-2'
    }
  }
]

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
:deep(.my-class-1) {
  color: #005CC5;
}

:deep(.my-class-2) {
  color: chartreuse;
}
</style>

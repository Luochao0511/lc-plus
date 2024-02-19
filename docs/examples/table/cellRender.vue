<template>
  <div>
    <lc-table :height="550" :columns="columns" :tableData="tableData" />
  </div>
</template>

<script setup lang="ts">
import { LcTable } from 'lc-plus'
import { INDEX_COLUMNS } from 'lc-plus/constants/base.js' //从组件库暴露的常量

const columns = [
  INDEX_COLUMNS,
  { headerName: '姓名', field: 'name', tooltipField: 'name' },
  { headerName: '年龄', field: 'age', tooltipField: 'age' },
  { headerName: '时间', field: 'date', tooltipField: 'date' },
  { headerName: '住址', field: 'address', tooltipField: 'address' },
  {
    headerName: '查看',
    minWidth: 80,
    width: 80,
    pinned: 'right',
    menuTabs: [],
    cellRenderer:'TypeButton',
    cellRendererParams:{
      toolbar: [
        {
          icon: true,
          className: 'details-button',
          label: '查看',
          callback: getView
        },
      ]
    }
  },
  {
    headerName: '操作',
    minWidth: 80,
    width: 80,
    pinned: 'right',
    menuTabs: [],
    cellRendererSelector: () => { // [!code highlight]
      return {
        component: 'TypeButton',
        params: {
          toolbar: [
            {
              icon: true,
              className: 'details-button',
              label: '详情',
              callback: getDetails
            },
            {
              icon: true,
              className: 'del-button',
              label: '删除',
              callback: delRowInfo
            }
          ]
        }
      }
    }
  }
]

// 详情事件
function getDetails(params) {
  // 行对象
  console.log(params)
}

// 删除事件
function delRowInfo(params) {
  // 行对象
  console.log(params)
}

// 查看事件
function getView(params) {
  // 行对象
  console.log(params)
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

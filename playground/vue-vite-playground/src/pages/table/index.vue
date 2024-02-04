<script setup lang="ts">
const columns = [
  // 证书补办
  { headerName: '申请人', field: 'name' },
  { headerName: '班级', field: 'classs' },
  { headerName: '补助名称', field: 'subSidyName' },
  {
    headerName: '申请类型',
    field: 'certificateType',
  },
  { headerName: '证书名称', field: 'certificateName' },
  { headerName: '补办原因', field: 'certificateIntro' },
  {
    headerName: '申请时间',
    field: 'startTime',
  },
  {
    headerName: '审核状态',
    field: 'audit',
    pinned: 'right',
  },
]
</script>

<template>
  <lc-table :columns="columns"></lc-table>
</template>

<style scoped lang="scss"></style>

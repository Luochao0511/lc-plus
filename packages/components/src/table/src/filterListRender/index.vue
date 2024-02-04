<template>
  <div v-html="label"></div>
</template>
<script setup>
import { defineExpose, defineProps, onBeforeMount, ref } from 'vue'

const props = defineProps({
  params: {
    type: Object,
    required: true,
  },
})
const label = ref('')
const calculateItemCount = () => {
  const { value, column, api } = props.params
  const tableData = []
  props.params.api.forEachNode((node) => {
    tableData.push(node)
  })
  const filterValues = props.params.api.getFilterModel()
  // 检查自身列的筛选条件
  if (value === '查询全部') {
    const filteredNodes = tableData.filter((node) => {
      return node.displayed
    })
    return filteredNodes.length
  } else {
    const filteredNodes = tableData.filter((node) => {
      // 初始化 flag 为 true
      let flag = true
      // 遍历 filterValues 列表，检查其他列的筛选条件
      for (const colId in filterValues) {
        const filterValue = filterValues[colId]
        if (filterValue) {
          const newValue = api.getValue(colId, node)

          // 如果节点的值不在筛选条件中，则将 flag 设为 false，并跳出循环
          if (!filterValue.values.includes(newValue)) {
            flag = false
            break
          }
        }
      }
      // 检查自身列的筛选条件，如果满足条件且 flag 为 true，则包括该节点
      return api.getValue(column.colId, node) == value && flag && node.displayed
    })
    return filteredNodes.length
  }
}

// 重新执行render函数
const renderLabel = () => {
  const count = calculateItemCount()
  label.value = `${props.params.valueFormatted ?? '空'} (${count})`
}

// 初始化执行一次
onBeforeMount(() => {
  renderLabel()
})

// 导出函数
defineExpose({ renderLabel })
</script>

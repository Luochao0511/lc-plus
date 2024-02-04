<template>
  <div class="custom-tooltip">
    <div v-if="showHeaderTooltip">{{ tooltipValue }}</div>
    <div v-else class="value" v-html="params.value" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
  params: {
    type: Object,
    default: () => ({}),
  },
})
const showHeaderTooltip = computed(() => {
  return props.params.location === 'header'
})
const tooltipValue = computed(() => {
  const convertName = {
    undefined: '全选/清除',
  }
  const headerName = props.params.colDef.headerName
  return convertName[headerName] || `根据"${headerName}"排序`
})
</script>

<style lang="scss" scoped>
.custom-tooltip {
  padding: 5px 5px;
  max-width: 300px;
  box-shadow: #c0c0c0 0 0 0 2px;
  background-color: #ffffff;
  list-style: inside;

  :deep(.value) {
    word-break: break-all;
  }
}
</style>

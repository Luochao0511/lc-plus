<template>
  <!--  头部的区域，可以在表格头部传入按钮 可以使用#header传入html代码，这里采用具名插槽-->
  <div
      v-if="toolbar.length"
      :class="[$slots.header ? 'flex-between' : 'flex-end', headerClass]"
      class="mb10"
  >
    <slot name="header"/>
    <div :class="buttonClass" class="flex-center">
      <el-button
          v-for="(button, index) in toolbar"
          v-show="button.show"
          :key="index"
          :loading="button.loading"
          v-bind="button"
          @click="button.callback && button.callback()"
      >
        {{ button.label }}
      </el-button>
    </div>
  </div>
  <!--  表格-->
  <AgGridVue
      ref="gridTable"
      v-loading="loading"
      :class="{ borders, cellBorders }"
      :columnDefs="columns"
      :context="context"
      :excelStyles="tableExcelStyles"
      :gridOptions="mergedOptions"
      :onGridReady="onGridReady"
      :rowData="tableData"
      :sideBar="rewriteSideBar"
      :style="{ height: rewriteHeight }"
      class="ag-theme-material"
      fix-theme
      v-bind="$attrs"
      @filterModified="filterModified"
      @filterOpened="filterOpened"
  />
  <!--  表格分页器-->
  <div v-if="isPagination" class="table-pagination">
    <el-pagination
        :background="mergedPagination.background"
        :current-page="mergedPagination.current"
        :layout="mergedPagination.layout"
        :page-size="mergedPagination.size"
        :page-sizes="mergedPagination.pageSizes"
        :total="mergedPagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup lang="ts">
import {
  ColumnApi,
  ExcelExportParams,
  FilterModifiedEvent,
  FilterOpenedEvent,
  GridApi,
  GridReadyEvent,
  IFilter,
} from 'ag-grid-community'

defineOptions({
  name: 'LcTable'
})

import {AgGridVue} from 'ag-grid-vue3' // 引入ag-grid-vue组件

import {
  EXCELSTYLES,
  GRID_OPTIONS,
  SIDEBAR_CONFIGURATION
} from './agColumns.ts' // 引入表格配置
import 'ag-grid-community/styles/ag-grid.css' // 引入ag-grid样式
import 'ag-grid-community/styles/ag-theme-material.css' // 引入主题
import {LicenseManager} from 'ag-grid-enterprise' // 引入付费js文件
import {
  computed,
  defineEmits,
  defineExpose,
  defineProps,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue'

import toDateString from 'xe-utils/toDateString'
import debounce from 'xe-utils/debounce'
import {PropsType, definePropsParams} from './props.ts'

// 以下代码是破解的api必须要加
LicenseManager.prototype.validateLicense = () => true
LicenseManager.prototype.isDisplayWatermark = () => true
LicenseManager.prototype.getWatermarkMessage = () => 'true'
// 父传子
const props = withDefaults(defineProps<PropsType>(), definePropsParams)
// 监听tableData数据进行自适应列宽
watch(
    () => props.tableData,
    () => {
      nextTick(() => {
        eleResizeListener()
      })
    }
)
// 子传父事件
const emit = defineEmits(['size-change', 'current-change'])
// 默认合并option配置使用计算属性
const mergedOptions = computed(() => ({...GRID_OPTIONS, ...props.options}))
// 默认合并分页器配置使用计算属性
const mergedPagination = computed(() => ({
  pageSizes: [15, 30, 40, 50],
  layout: 'total, sizes, prev, pager, next, jumper',
  total: 0,
  current: 1,
  size: 15,
  background: true,
  ...props.pagination
}))
// 改写表格高度
const rewriteHeight = computed(() => {
  if (typeof props.height === 'number') {
    return `calc(100vh - ${props.height}px)`
  } else {
    return props.height
  }
})
// 设置侧边栏配置
const rewriteSideBar = computed(() =>
    props.showSideBar ? SIDEBAR_CONFIGURATION : false
)
// 合并表格导出样式
const tableExcelStyles = computed(() => [...EXCELSTYLES, ...props.excelStyles])
// ag-grid创建完成之后执行的事件,注意：此函数会在onMounted生命周期之后调用
const gridApi: GridApi = ref(null) // 表格的api
const columnApi: ColumnApi = ref(null) // 列的api
const gridTable = ref(null) // 表格的实例对象
const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api
  columnApi.value = params.columnApi
  gridApi.value.sizeColumnsToFit() // 这时就可以通过gridApi调用ag-grid的传统方法了
}
// Excel文件导出函数，使用方法，会导出到组件实例之上，通过ref直接调用即可,configuration传递个性化配置，要求传对象
const exportExcel = (
    excelName: string,
    configuration: ExcelExportParams = {}
) => {
  const newColumn = columnApi.value
      .getAllDisplayedColumns()
      .filter((item) => item.userProvidedColDef?.isExportExcel === undefined) // 返回的是显示的列
  const getSelectedRows = gridApi.value.getSelectedRows().length // 获取勾选的列表长度
  gridApi.value.exportDataAsExcel({
    onlySelected: !!getSelectedRows, // 是否复选框导出
    autoConvertFormulas: true, // 把公式变为结果
    fileName: `${excelName}-${toDateString(new Date(), 'yyyyMMdd')}`, // 文件名
    sheetName: 'Sheet1', // 页脚名字
    rowHeight: 33, // 所有行的高度
    headerRowHeight: 40, // 表头行高度
    columnKeys: newColumn, // 导出列数组
    ...configuration
  })
}
// 表格根据视口大小大小进行resize()
const eleResizeListener = () => {
  if (!gridTable.value) return
  gridTable.value.gridOptions.api.sizeColumnsToFit() // 自适应表格大小改变columns宽度
}
// 分页选择器改变size大小
const handleSizeChange = (size: number) => {
  emit('size-change', size)
}

// 分页选择器改变page大小
const handleCurrentChange = (current: number) => {
  emit('current-change', current)
}

const filterOpened = (params: FilterOpenedEvent) => {
  const {api, column} = params
  api.getFilterInstance(column.colId, (filterInstance: IFilter) => {
    const selectedItems = filterInstance.virtualList.getComponentAt(0) // 获取第一个选中的值，也就是全选
    selectedItems.cellRendererComponent.componentInstance.$root.renderLabel() // 重新渲染
  })
}
// 如果没有应用筛选，筛选器需要销毁掉，不然的话，查询全部数量就会出问题
let timerId: NodeJS.Timeout | null = null
const filterModified = (params: FilterModifiedEvent) => {
  timerId = setTimeout(() => {
    const {api, column} = params
    const popupDom = document.querySelector('.ag-tabs') // 获取弹出框
    const field = column.colDef.field
    // 如果有弹出框不执行销毁筛选器
    if (!popupDom) {
      const filteredData = api.getFilterModel()
      // 该筛选器没有筛选，就销毁筛选器
      if (!filteredData[field]) {
        const filterInstance = api.getFilterInstance(field)
        if (filterInstance) {
          filterInstance.setModel(null)
          api.destroyFilter(field)
          api.onFilterChanged()
        }
      }
    }
    timerId && clearTimeout(timerId)
  }, 200)
}

// 组件初始化加载,这里可以获取到组件实例对象
onMounted(() => {
  window.addEventListener('resize', debounce(eleResizeListener, 300)) // 监听浏览器改变列宽度
})

// 组件卸载生命周期
onBeforeUnmount(() => {
  window.removeEventListener('resize', debounce(eleResizeListener, 300)) // 卸载函数，防止内存泄露
})

// 导出表格api 在父组件中可以通过ref的获取表格实例来获取表格方法 gridTable.value.gridApi就可以获取到实例方法
defineExpose({gridApi, columnApi, gridTable, exportExcel}) // 注意这里的ref对象不需要.value导出，vue会自动解构，如果加了值就会为null
</script>

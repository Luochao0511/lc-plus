---
sider_text="表格 table"
---
# Table 表格

该组件基于ag-grid-vue组件进行二次封装，支持多选，单选，筛选，图表展示，编辑，导出，虚拟滚动

详细配置请看文档[https://www.ag-grid.com/vue-data-grid/getting-started/](https://www.ag-grid.com/vue-data-grid/getting-started/)
因为是英文文档所以建议使用**Microsoft Edge**浏览器，他是可以支持翻译的，谷歌浏览器翻译是需要翻墙的

## 基础用法

:::demo
table/base
:::

## 2、配置参数（Table Attributes）

| 参数           | 说明                                | 类型                      | 默认值        |
|:-------------|:----------------------------------|:------------------------|:-----------|
| tableData    | 表格数据对象                            | Array                   | []         |
| options      | 整体表格配置                            | Object                  | {}         |
| columns      | 表格列配置                             | Array                   | []         |
| loading      | 表格loading效果                       | boolean                 | false      |
| height       | 表格高度                              | number / string         | 300        |
| isPagination | 是否显示分页器                           | boolean                 | false      |
| pagination   | 分页配置                              | Object                  | Pagination |
| toolbar      | 可以传入button按钮，显示在表格头部右侧            | Array                   | []         |
| context      | context可以实现表格组件和列自定义组件进行v-model通信 | Object                  | {}         |
| showSideBar  | 表格侧边栏显示隐藏                         | boolean                 | false      |
| buttonClass  | 表头的button的class类名                 | string / object / Array | -          |
| headerClass  | 表头class                           | string / object         | -          |
| borders      | 是否添加边框线                           | boolean                 | false      |
| cellBorders  | 是否添加单元格边框线                        | boolean                 | false      |
| excelStyles  | 表格导出合并样式                          | Array                   | -          |

## 3、events 其他事件按照 el-table 

| 事件名                | 说明      | 返回值       |
|:-------------------|:--------|:----------|
| current-change     | 当前页码    | 当前选中的页码   |
| size-change        | 当前一页多少行 | 当前选择的size |

## 4、Methods 方法

| 事件名         | 说明            | 参数                                      |
|:------------|:--------------|:----------------------------------------|
| gridApi     | 表格的所有api集合对象  | -                                       |
| columnApi   | 表格的所有列api集合对象 | —                                       |
| exportExcel | 表格导出，支持所见即所得  | excelName为导出文件名称，configuration为配置，是一个对象 |

## 5、Slots插槽

| 插槽名    | 说明       | 参数 |
|:-------|:---------|:---|
| header | 表格表头左侧插槽 | -  |



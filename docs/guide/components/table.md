---
sider_text="表格 table"
---

# Table 表格

该组件基于ag-grid-vue组件进行二次封装，支持多选，单选，筛选，图表展示，编辑，导出，虚拟滚动

详细配置请看文档[https://www.ag-grid.com/vue-data-grid/getting-started/](https://www.ag-grid.com/vue-data-grid/getting-started/)
因为是英文文档所以建议使用**Microsoft Edge**浏览器，他是可以支持翻译的，谷歌浏览器翻译是需要翻墙的，
特别指出谷歌浏览器翻译出来文档友好很多，如果有翻墙还是推荐谷歌浏览器翻译

## 基础表格

通过组件**columns**属性定义列，通过**tableData**属性数据回显，
列配置详细[https://www.ag-grid.com/vue-data-grid/column-properties/](https://www.ag-grid.com/vue-data-grid/column-properties/)
> **注意columns属性内的field字段要和tableData数据接口字段名一致**

:::demo
table/base
:::

## 带边框表格

* 设置默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用 **cellBorders** 属性，把该属性设置为 true 即可启用。
* 如果需要表格外边框，可以使用 **borders** 属性，把该属性设置为 true 即可启用。

:::demo
table/border
:::

## 带状态表格

您可以定义规则，这些规则可以通过 grid 选项应用于包含某些 CSS 类。这些规则以 JavaScript 映射的形式提供
，其中键是类名，值是表达式，如果计算结果为 ，则使用类。表达式可以是 JavaScript 函数，
也可以是网格视为函数简写的字符串。**rowClassRules**

:::demo
table/rowClass
:::

## 固定列,锁定列

* **pinned**您可以通过将列定义上的属性设置为'left'或来固定列'right'。
* **lockPinned**您可以通过将列定义上的属性设置为true或来固定列false，设置为true，列不可拖动

:::demo
table/pinned
:::

## 单元格样式（值格式化内容）

* **cellStyle** 他是css的对象或函数，返回特定单元格的 css 值对象。
::: details 点击我查看详情

```ts
cellStyle: CellStyle | CellStyleFunc<TData, TValue>;

interface CellStyle {
  [cssProperty: string]: string | number;
}

interface CellStyleFunc<TData = any, TValue = any> {
  (cellClassParams: CellClassParams<TData, TValue>): CellStyle | null | undefined
}

interface CellClassParams<TData = any, TValue = any> {
  // Column for this callback 
  column: Column<TValue>;
  // The colDef associated with the column for this cell 
  colDef: ColDef<TData, TValue>;
  // The value to be rendered 
  value: TValue | null | undefined;
  // The data associated with this row from rowData. Data is `undefined` for row groups.
  data: TData | undefined;
  // The RowNode associated with this row 
  node: IRowNode<TData>;
  // The index of the row 
  rowIndex: number;
  // The grid api. 
  api: GridApi<TData>;
  // Application context as set on `gridOptions.context`. 
  context: TContext;
}
```

:::

* **cellClass** 他是用于单元格的类。可以是字符串、字符串数组或返回字符串或字符串数组的函数。
::: details 点击我查看详情

```ts
cellClass: string | string[] | CellClassFunc<TData, TValue>

interface CellClassFunc<TData = any, TValue = any> {
  (cellClassParams: CellClassParams<TData, TValue>): string | string[] | null | undefined
}

interface CellClassParams<TData = any, TValue = any> {
  // Column for this callback 
  column: Column<TValue>;
  // The colDef associated with the column for this cell 
  colDef: ColDef<TData, TValue>;
  // The value to be rendered 
  value: TValue | null | undefined;
  // The data associated with this row from rowData. Data is `undefined` for row groups.
  data: TData | undefined;
  // The RowNode associated with this row 
  node: IRowNode<TData>;
  // The index of the row 
  rowIndex: number;
  // The grid api. 
  api: GridApi<TData>;
  // Application context as set on `gridOptions.context`. 
  context: TContext;
}
```

:::

* **valueFormatter**它是一个列配置的属性用于值格式化，但是无法格式化筛选列表的值，还是展示的是原始值
::: details 点击我查看详情

```ts
valueFormatter: string | ValueFormatterFunc<TData, TValue>

interface ValueFormatterFunc<TData = any, TValue = any> {
  (params: ValueFormatterParams<TData, TValue>): string
}

interface ValueFormatterParams<TData = any, TValue = any> {
  // Value for the cell. 
  value: TValue | null | undefined;
  // Row node for the given row 
  node: IRowNode<TData> | null;
  // Data associated with the node 
  data: TData | undefined;
  // Column for this callback 
  column: Column<TValue>;
  // ColDef provided for this column 
  colDef: ColDef<TData, TValue>;
  // The grid api. 
  api: GridApi<TData>;
  // Application context as set on `gridOptions.context`. 
  context: any;
}
```

:::

* **valueGetter** 它是一个列配置的属性用于值格式化，可以格式化筛选列表却无法格式化单元格提示框
::: details 点击我查看详情

```ts
valueGetter: string | ValueGetterFunc<TData, TValue>;

interface ValueGetterFunc<TData = any, TValue = any> {
  (params: ValueGetterParams<TData, TValue>): TValue | null | undefined
}

interface ValueGetterParams<TData = any, TValue = any> {
  // A utility method for getting other column values
  getValue: (field: string) => any;
  // Row node for the given row
  node: IRowNode<TData> | null;
  // Data associated with the node
  data: TData | undefined;
  // Column for this callback
  column: Column<TValue>;
  // ColDef provided for this column
  colDef: ColDef<TData, TValue>;
  // The grid api.
  api: GridApi<TData>;
  // Application context as set on `gridOptions.context`.
  context: any;
}
```

:::

* **tooltipField** 它是一个列配置的属性用于展示单元格提示tooltip

> 工作过程中建议使用valueGetter进行格式化。

:::demo
table/cellStyle
:::

## 自定义单元格

* **cellRenderer** 配合**cellRendererParams**使用自定义单元格
* **cellRendererSelector**自定义单元格，两种方式
* 组件内部提供自定义button组件 [TypeButton]( #_6、typebutton组件props) 组件 

::: details 点击我查看详情
```ts 
cellRendererSelector: CellRendererSelectorFunc<TData, TValue>;

interface CellRendererSelectorFunc<TData = any, TValue = any> {
    (params: ICellRendererParams<TData, TValue>) : CellRendererSelectorResult | undefined
}

interface CellRendererSelectorResult { 
  // Equivalent of setting `colDef.cellRenderer` 
  component?: any;
  // Equivalent of setting `colDef.cellRendererParams` 
  params?: any;
}
```
:::

:::demo
table/cellRender 
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

| 事件名            | 说明      | 返回值       |
|:---------------|:--------|:----------|
| current-change | 当前页码    | 当前选中的页码   |
| size-change    | 当前一页多少行 | 当前选择的size |

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


## 6、TypeButton组件props

| 参数           | 说明                                | 类型                      | 默认值        |
|:-------------|:----------------------------------|:------------------------|:-----------|
| paramsClass  | 行class                            | Object/string            | -        |
| paramsStyle  | 行style                            | Object                  | {}         |
| toolbar      | button按钮数组                        | Array                   | []         |

## 7、TypeButton组件（toolbar参数）

| 参数           | 说明               | 类型                  | 默认值   |
|:-------------|:-----------------|:--------------------|:------|
| className  | button按钮某一项class | Object/string       | -     |
| style  | button按钮某一项style | Object/string       | {}    |
| callback      | button按钮点击事件     | function            | -     |
| icon      | 是否显示icon图标       | boolean             | false |
| iconClass      | icon图标class      | Object/string/Array | -     |


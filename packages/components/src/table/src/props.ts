import { Column, Context, GridOptions } from 'ag-grid-community'
import { ExcelStyle } from 'ag-grid-enterprise'

export interface Toolbar {
  show: boolean;
  loading: boolean;
  callback: () => void;
  label: string;
  disabled: boolean;
}

export interface Pagination {
  pageSizes: number[],
  layout: string,
  total: number,
  current: number,
  size: number,
  background: boolean
}

export interface PropsType {
  // table数据
  tableData: []
  // 整体表格配置
  options: GridOptions,
  // 列配置
  columns: Array<Column>,
  // 表格loading效果
  loading: boolean,
  // 表格高度
  height: number | string,
  // 是否显示分页器
  isPagination: boolean,
  // 分页
  pagination: Pagination,
  // 可以传入button按钮，显示在表格头部右侧
  toolbar: Toolbar[],
  // context可以实现表格组件和列组件进行v-model通信
  context: Context,
  // 表格侧边栏显示隐藏
  showSideBar: boolean,
  // buttonClass
  buttonClass: string | Object,
  // headerClass
  headerClass: string,
  // 是否添加边框线
  borders: boolean,
  // 是否添加单元格边框线
  cellBorders: boolean,
  // 表格导出合并样式
  excelStyles: ExcelStyle[]
}

export const definePropsParams = {
  // table数据
  tableData: () => [],
  // 整体表格配置
  options: () => ({}),
  // 列配置
  columns: () => [],
  // 表格loading效果
  loading: false,
  // 表格高度
  height: 300,
  // 是否显示分页器
  isPagination: false,
  // 分页
  pagination: () => ({
    pageSizes: [15, 30, 40, 50],
    layout: 'total, sizes, prev, pager, next, jumper',
    total: 0,
    current: 1,
    size: 15,
    background: true
  }),
  // 可以传入button按钮，显示在表格头部右侧
  toolbar: () => [],
  // context可以实现表格组件和列组件进行v-model通信
  context: () => ({}),
  // 表格侧边栏显示隐藏
  showSideBar: false,
  // buttonClass
  buttonClass: '',
  // headerClass
  headerClass: '',
  // 是否添加边框线
  borders: false,
  // 是否添加单元格边框线
  cellBorders: false,
  // 表格导出合并样式
  excelStyles: () => []
}
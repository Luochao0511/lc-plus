/**
 * ag-grid表格配置
 *
 *
 * @author 骆超
 * @date 2024-2-2
 */
import { AG_GRID_LOCALE_ZH } from './agLocaleText.ts'
import {
  ColumnMenuTab,
  ExcelStyle,
  GridOptions,
  SideBarDef,
  ValueGetterParams,
} from 'ag-grid-enterprise'
import { ColumnPinnedType } from 'ag-grid-community/dist/lib/entities/column'

// 表格默认配置
export const GRID_OPTIONS: GridOptions = {
  localeText: AG_GRID_LOCALE_ZH, // 中英文
  suppressContextMenu: true, // 关闭右键菜单列表
  suppressScrollOnNewData: true, // 网格在页面更改时不要滚动到顶部。
  // stopEditingWhenCellsLoseFocus: true, //在编辑的时候点击表格任何地方停止编辑
  headerHeight: 36, // 表头高度
  // suppressMenuHide: true, // 默认显示menu图标
  tooltipMouseTrack: true, // 用鼠标跟踪以演示工具提示需要跟随光标的方案
  rowHeight: 50, // 设置行高为30px,默认情况下25px
  rowBuffer: 10, // 行缓冲区，默认为10行
  animateRows: true, // 开启行动画
  rowSelection: 'multiple', // 行多选
  cacheBlockSize: 100, // 缓存中的每个块应该包含多少行
  suppressRowClickSelection: true, // 点击及选择复选框
  tooltipShowDelay: 100, // 鼠标触摸提示出现时间100毫秒
  groupSelectsChildren: true, // 选中子级
  groupSelectsFiltered: true, // 勾选行组只获取子级数据
  defaultColDef: {
    // 默认的列配置
    menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'], // 表头menuTabs，默认第一个为筛选器
    filterParams: {
      cellRenderer: 'filterListRender',
      suppressSorting: false, // 过滤器排序 false代表需要排序
      refreshValuesOnOpen: true,
      buttons: ['apply', 'reset'], // 过滤器按钮
      closeOnApply: true, // 按住apply reset按钮关闭
      excelMode: 'windows', // 转换为widows模式
      showTooltips: true, // 设置过滤器工具提示
    },
    headerTooltip: '点击旁边按钮进行筛选', // 头部的toolTip，必须填写，但是不用
    tooltipComponent: 'customTooltip', // 设置过滤器组件
    wrapHeaderText: true, // 表头自动换行
    autoHeaderHeight: true, // 自适应表头高度
    sortable: true, // 可以排序
    headerCheckboxSelectionFilteredOnly: true, // 全选仅仅勾选筛选的全部
    resizable: true, // 允许调整列大小，就是拖动改变列大小
    // lockPosition: true,  //列位置为true代表不能拖动列
    minWidth: 100, // 列最小宽度
    filter: true, // 开启数据刷选器，就是在列头上增加数据搜索过滤功能
  },
}
// 侧边栏配置
export const SIDEBAR_CONFIGURATION: SideBarDef = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
      minWidth: 225,
      width: 225,
      maxWidth: 225,
    },
  ],
  position: 'right', // 侧边栏在表格右侧显示
  defaultToolPanel: null, // 默认收起侧边栏(指定为null找不到首先展示的)
}
// 表格导出样式
export const EXCELSTYLES: ExcelStyle[] = [
  {
    id: 'oddBackcolor',
    interior: {
      color: '#ddebf7',
      pattern: 'Solid',
    },
    // 边框
    borders: {
      color: '#ccc',
      lineStyle: 'Continuous',
      weight: 1,
    },
  },
  {
    // 必填 样式的ID，该id是唯一的字符串
    id: 'header',
    // 字体设置
    font: {
      color: 'block',
      size: 11,
      bold: true,
    },
    alignment: {
      horizontal: 'Left', // 水平
      vertical: 'Center', // 垂直
    },
    // 边框
    borders: {
      borderBottom: {
        color: '#C0C0C0',
        lineStyle: 'Continuous',
        weight: 1,
      },
      borderLeft: {
        color: '#C0C0C0',
        lineStyle: 'Continuous',
        weight: 1,
      },
      borderRight: {
        color: '#C0C0C0',
        lineStyle: 'Continuous',
        weight: 1,
      },
      borderTop: {
        color: '#C0C0C0',
        lineStyle: 'Continuous',
        weight: 1,
      },
    },
    // 背景颜色和图案
    interior: {
      color: '#cdebf9',
      pattern: 'Solid',
      patternColor: '#C0C0C0',
    },
  },
  {
    id: 'cell',
    alignment: {
      horizontal: 'Left', // 水平
      vertical: 'Top', // 垂直
      wrapText: true, // 文字超出换行
    },
  },
  {
    id: 'headerGroup',
    alignment: {
      horizontal: 'Center', // 水平
      vertical: 'Center', // 垂直
      wrapText: true, // 文字超出换行
    },
  },
  {
    id: 'hyperlinks', // 链接样式
    font: {
      underline: 'Single',
      color: '#358ccb',
    },
  },
]

interface CheckAllColumns {
  isExportExcel: boolean
  checkboxSelection: boolean
  headerCheckboxSelection: boolean
  maxWidth: number
  pinned: ColumnPinnedType
  menuTabs: ColumnMenuTab
}

// 全选列
export const CHECK_ALL_COLUMNS: CheckAllColumns = {
  isExportExcel: true,
  maxWidth: 70,
  menuTabs: [],
  checkboxSelection: true,
  headerCheckboxSelection: true,
  pinned: 'left',
}

interface IndexColumns {
  isExportExcel: boolean
  headerName: string
  colId: string
  valueGetter: (params: ValueGetterParams) => number
  comparator: (valueA: number, valueB: number) => number
  maxWidth: number
  pinned: ColumnPinnedType
  menuTabs: Array<ColumnMenuTab>
}

// 索引列
export const INDEX_COLUMNS: IndexColumns = {
  isExportExcel: true,
  headerName: '序号',
  colId: 'rowNum',
  valueGetter: (params) => Number(params.node.rowIndex) + 1,
  comparator: (valueA, valueB) => valueA - valueB,
  maxWidth: 50,
  pinned: 'left',
  menuTabs: [],
}

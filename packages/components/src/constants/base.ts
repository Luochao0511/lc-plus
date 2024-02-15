/** @vite-ignore */
import { ColumnPinnedType } from 'ag-grid-community/dist/lib/entities/column'
import { ColumnMenuTab, ValueGetterParams } from 'ag-grid-enterprise'

// 全选列
interface CheckAllColumns {
  isExportExcel: boolean
  checkboxSelection: boolean
  headerCheckboxSelection: boolean
  maxWidth: number
  pinned: ColumnPinnedType
  menuTabs: ColumnMenuTab[]
}

export const CHECK_ALL_COLUMNS: CheckAllColumns = {
  isExportExcel: true,
  maxWidth: 70,
  menuTabs: [],
  checkboxSelection: true,
  headerCheckboxSelection: true,
  pinned: 'left'
}

// 索引列
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

export const INDEX_COLUMNS: IndexColumns = {
  isExportExcel: true,
  headerName: '序号',
  colId: 'rowNum',
  valueGetter: (params) => Number(params.node.rowIndex) + 1,
  comparator: (valueA, valueB) => valueA - valueB,
  maxWidth: 50,
  pinned: 'left',
  menuTabs: []
}


module.exports = {
  CHECK_ALL_COLUMNS,
  INDEX_COLUMNS
}
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

// 图片后缀合集
export const PICTURE_SUFFIX = [
  'art',
  'jps',
  'jut',
  'flo',
  'fpx',
  'ico',
  'g3',
  'mcf',
  'pct',
  'svf',
  'wbmp',
  'rgb',
  'rf',
  'ras',
  'rast',
  'qif',
  'qti',
  'qtif',
  'pgm',
  'pgm',
  'pbm',
  'pnm',
  'ppm',
  'rp',
  'turbot',
  'x-png',
  'xwd',
  'nif',
  'niff',
  'pic',
  'pict',
  'bmp',
  'gif',
  'png',
  'xbm',
  'xpm',
  'ief',
  'iefs',
  'tif',
  'tiff',
  'jfif',
  'jfif-tbnl',
  'jpe',
  'jpeg',
  'jpg',
  'dwg',
  'dxf',
  'xif',
  'nap',
  'naplps'
];
// word文档
export const WORD_DOCUMENT:string[] = ['wps', 'wpt', 'doc', 'docx', 'dot', 'dotx', 'rtf'];
// pdf文档
export const PDF_DOCUMENT:string[] = ['pdf'];
// excel
export const EXCEL_ARR:string[] = ['et', 'ett', 'xls', 'xlsx', 'xlt', 'xltx', 'csv', 'xls', 'xlsx', 'xlsm', 'xltx', 'xltm', 'xlsb', 'xlam', 'xml', 'xla', 'xlw', 'xlr'];
// ppt
export const PPT_ARR:string[] = ['dps', 'dpt', 'ppt', 'pptx', 'pot', 'potx', 'potm', 'ppsx', 'ppsm', 'ppam'];
// txt
export const TXT_ARR:string[] = ['prn', 'txt', 'dif', 'slk', 'prn', 'prn'];
// zip
export const ZIP_ARR:string[] = ['rar', 'zip', 'arj', 'z', '7z', 'cab', 'gz', 'lzh', 'ace', 'uue', 'bz2', 'jar', 'iso'];
// 文件对象枚举
export const FILE_SUFFIX = {
  image: PICTURE_SUFFIX,
  word: WORD_DOCUMENT,
  pdf: PDF_DOCUMENT,
  excel: EXCEL_ARR,
  ppt: PPT_ARR,
  txt: TXT_ARR,
  zip: ZIP_ARR
};

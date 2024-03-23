import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { Cell, Row, Worksheet } from 'exceljs/index'

interface IColumn {
  headerName: string;
  field: string;
}

export interface IParams<D extends any> {
  header: IColumn[];
  data: D[];
  sheetName: string;
}

export const createWsSheet = <T, D>(
  columns: IColumn[],
  data: T[],
  filename: string,
  sheetName = 'sheet1',
  params: IParams<D>[] = [],
  staff: string = '数字湖艺-机密文件'
): void => {
  if (!((columns && data) && (columns.length && data.length))) {
    return
  }

  const workbook = new ExcelJS.Workbook()
  const base64 = setWatermark(staff)
  const imageId1 = workbook.addImage({ base64, extension: 'png' })
  const worksheet = workbook.addWorksheet(sheetName, { properties: { tabColor: { argb: 'FFC0000' } } })

  const columnsData = columns.map((col: IColumn): { name: string } => ({ name: col.headerName }))
  const rowsData = data.map((row: T): T[] => {
    return columns.map(itm => isNull(row[itm.field]) ? row[itm.field] : '')
  })

  worksheet.addBackgroundImage(imageId1)
  worksheet.addTable({
    name: filename,
    ref: 'A1',
    columns: columnsData,
    rows: rowsData
  })

  if (params && params.length) {
    params.forEach((el: IParams<D>) => {
      if (!((el.header && el.data) && (el.header.length && el.data.length))) {
        return
      }
      const worksheetM = workbook.addWorksheet(el.sheetName, { properties: { tabColor: { argb: 'FFC0000' } } })
      const columnsM = el.header.map((col: IColumn): { name: string } => ({ name: col.headerName }))
      const rowsM = el.data.map((row: D): D[] => {
        return el.header.map(itm => isNull(row[itm.field]) ? row[itm.field] : '')
      })
      worksheetM.addBackgroundImage(imageId1)
      worksheetM.addTable({
        name: el.sheetName,
        ref: 'A1',
        columns: columnsM,
        rows: rowsM
      })
    })
  }

  workbook.xlsx.writeBuffer().then((res) => {
    saveAs(new Blob([res], { type: 'application/octet-stream' }), filename)
  })
}

// 是否有值
const isNull = (data: any): boolean => {
  return (data ?? '') !== ''
}

/**
 *
 * @param str {string} 水印名字
 */
export function setWatermark(str: string):string {
  let id = '1.23452384164.123412416'

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id) as any)
  }

  let can = document.createElement('canvas')
  can.width = 500
  can.height = 420
  let cans = can.getContext('2d') as any
  cans.rotate(-25 * Math.PI / 180)
  cans.font = '800 40px Microsoft JhengHei'
  cans.fillStyle = 'rgba(130, 142, 162, 0.2)'
  cans.textAlign = 'center'
  cans.textBaseline = 'Middle'
  cans.fillText(str, 180, 350)

  return can.toDataURL('image/png')
}

/**
 * 该方法获取开始单元格和结束单元格用于自动筛选的参数
 * @param worksheet {Worksheet} 获取sheet页
 */
export function calculateAutoFilterRange(worksheet: Worksheet) {

  let firstCellAddress: string | null = null
  let lastCellAddress: string | null = null

  // 遍历所有行和列
  worksheet.eachRow({ includeEmpty: true }, function(row: Row) {
    row.eachCell({ includeEmpty: true }, function(cell: Cell) {
      const cellAddress = cell.address
      if (!firstCellAddress) {
        firstCellAddress = cellAddress
      }
      lastCellAddress = cellAddress
    })
  })

  return firstCellAddress && lastCellAddress ? `${firstCellAddress}:${lastCellAddress}` : null
}

/**
 * agGrid生成水印的方法拥有水印功能，列筛选，行冻结
 * @param blob {Blob} blob文件体
 * @param fileName {string} 文件名称
 * @param staff {string} 水印名称
 */
export const agWatermarkExcel = (blob: Blob, fileName: string, staff: string) => {
  // 创建一个文件读取器对象
  const reader = new FileReader()

  reader.readAsArrayBuffer(blob)

  // 当文件读取完成时执行回调函数
  reader.onload = function(event) {
    // 获取 Blob 对象的数据
    const arrayBuffer = event.target.result

    // 创建一个 ExcelJS 的工作簿对象
    const workbook = new ExcelJS.Workbook()

    // 读取 ArrayBuffer 数据
    workbook.xlsx.load(arrayBuffer).then(function() {
      // 添加水印
      const base64 = setWatermark(staff)

      const imageId = workbook.addImage({ base64, extension: 'png' })

      // 遍历sheet
      workbook.eachSheet((worksheet: Worksheet): void => {

        // 给每个sheet添加上水印
        worksheet.addBackgroundImage(imageId)

        // 给每列加上筛选
        worksheet.autoFilter = calculateAutoFilterRange(worksheet)

        // 冻结首行
        worksheet.views = [
          { state: 'frozen', xSplit: 0, ySplit: 1, topLeftCell: 'B2' }
        ]
      })

      // 将修改后的 Workbook 转换为 Blob 对象
      workbook.xlsx.writeBuffer().then((buffer: Buffer) => {
        const newBlob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

        // 提供给用户下载
        saveAs(newBlob, `${fileName}.xlsx`)
      })
    })
  }
}



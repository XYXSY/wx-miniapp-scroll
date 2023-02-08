import * as XLSX from 'xlsx'
import FileSaver from "file-saver";
import moment from 'moment'

/**
 * 
 * @param { HTMLTableElement } tableEl 表格元素
 * @param { String } name 名称
 * @param { Boolean } withDate 是否在名称后加上时间（默认是）
 * @example
 * // 引入
 * import exportExcel from '@/utils/exportExcel'
 * // html
 * <el-table id="table" ref="table"></el-table>
 * // 使用
 * exportExcel(document.querySelector('#table'))
 * // 或者
 * exportExcel(this.$refs.table.$el)
 * @returns 
 */
export default function exportExcel(tableEl, name = 'sheet', withDate = true) {
  var xlsxParam = { raw: true };
  /* 从表生成工作簿对象 */
  var wb = XLSX.utils.table_to_book(
    tableEl,
    xlsxParam
  );
  /* 获取二进制字符串作为输出 */
  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  let date = moment(new Date()).format('YYYYMMDDHHmmss')
  if (withDate) {
    name = name + date + '.xlsx'
  } else {
    name = name + '.xlsx'
  }
  try {
    // 全局对象
    FileSaver.saveAs(
      // Blob 对象表示一个不可变、原始数据的类文件对象。
      // Blob 表示的不一定是JavaScript原生格式的数据。
      // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
      // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
      new Blob([wbout], { type: "application/octet-stream" }),
      // 设置导出文件名称
      name
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, wbout);
  }
  return wbout;
}

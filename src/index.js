// ‼️优先初始化语言设置(必须先初始化语言)
import '../locales'
import Editor from './editor'
import { BatchPrinter, doBatchPrint, doPrint, Printer, getCSS } from './printer'
import { MULTI_SUFFIX } from './config'

export * from './util'

export {
  Editor,
  Printer, BatchPrinter,
  doPrint, doBatchPrint,
  getCSS,
  MULTI_SUFFIX
}

import i18next from '../../locales'
import moment from 'moment'
import _ from 'lodash'
import Big from 'big.js'

const money = n => Big(n).div(100).toFixed(2)
const toFixed2 = n => Big(n).toFixed(2)

const getSpecialTable = (normalTable, size, type) => normalTable.reduce((arr, task) => {
  const specialList = _.chunk(task.__details, size).map(list => ({ _special: { list, type } }))
  return [...arr, task, ...specialList]
}, [])

function generateTable (tasks) {
  return tasks.map((task, index) => {
    // 打印会汇集相同商品的记录，计划采购是总和，每个商品对应的库存相同。建议采购的值：总和计划 - 库存（自己算）
    const suggest_purchase_num = Big(task.suggest_purchase_num).minus(task.stock)
    let suggestPurchase = ''
    if (Number(task.stock) < 0) {
      suggestPurchase = `${Big(task.plan_purchase_amount).toFixed(2)}${task.std_unit_name}`
    } else {
      suggestPurchase = Number(suggest_purchase_num) > 0
        ? `${Big(suggest_purchase_num).toFixed(2)}${task.std_unit_name}`
        : i18next.t('库存充足')
    }

    return {
      [i18next.t('序号')]: ++index,

      [i18next.t('商品名称')]: task.sku_name,

      [i18next.t('一级分类')]: task.category_name_1,
      [i18next.t('二级分类')]: task.category_name_2,
      [i18next.t('品类')]: task.pinlei,

      [i18next.t('参考成本')]: `${task.price ? money(task.price) : 0}${'元' + '/'}${task.std_unit_name}`,
      [i18next.t('库存')]: toFixed2(task.stock),
      [i18next.t('建议采购')]: suggestPurchase,

      [i18next.t('采购单位')]: task.sale_unit_name,
      [i18next.t('基本单位')]: task.std_unit_name,

      [i18next.t('计划采购_基本单位')]: toFixed2(task.plan_purchase_amount),
      [i18next.t('计划采购_采购单位')]: Big(task.plan_purchase_amount).div(task.sale_ratio).toFixed(2),

      [i18next.t('实采_基本单位')]: '-',
      [i18next.t('实采_采购单位')]: '-',

      [i18next.t('预采购金额')]: money(Big(task.plan_purchase_amount).times(task.price || 0)),
      [i18next.t('采购金额')]: money(Big(task.plan_purchase_amount).times(task.price || 0)),

      __details: task.addresses.map(o => {
        return {
          [i18next.t('分拣序号')]: o.sort_id,
          [i18next.t('商户名')]: o.res_name,
          [i18next.t('采购数量_基本单位')]: toFixed2(o.plan_purchase_amount),
          [i18next.t('采购数量_销售单位')]: Big(o.plan_purchase_amount).div(task.sale_ratio).toFixed(2),
          [i18next.t('商品备注')]: o.remark
        }
      })
    }
  })
}

function purchase (data) {
  const { purchaser_name, settle_supplier_name, settle_supplier_id, tasks = [] } = data

  let purchase_money = Big(0)
  _.each(tasks, task => {
    task.plan_purchase_amount = _.reduce(task.addresses, (sum, addr) => (sum + addr.plan_purchase_amount), 0)
    purchase_money = Big(task.plan_purchase_amount).times(task.price || 0).plus(purchase_money)
  })

  const common = {
    [i18next.t('当前时间')]: moment().format('YYYY-MM-DD HH:mm:ss'),

    [i18next.t('采购员')]: purchaser_name,
    [i18next.t('采购单位')]: `${settle_supplier_name}${settle_supplier_id}`,

    [i18next.t('预采购金额')]: '-',
    [i18next.t('采购金额')]: money(purchase_money),

    [i18next.t('任务数')]: tasks.length
  }

  const normalTable = generateTable(tasks)

  return {
    common,
    _table: {
      purchase_no_detail: normalTable, // 无明细
      purchase_last_col: normalTable, // 明细:单列-总表最后一列
      purchase_one_row: normalTable.reduce((arr, task) => [...arr, task, { _special: { list: task.__details, type: 'separator' } }], []), // 明细: 当行-总表下方一行
      purchase_flex_2: getSpecialTable(normalTable, 2, 'flex'), // 明细: 两栏-总表下方一行两栏
      purchase_flex_4: getSpecialTable(normalTable, 4, 'flex') // 明细: 四栏-总表下方一行四栏
    }
  }
}

export default purchase

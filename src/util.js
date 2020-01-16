import _ from 'lodash'
import Big from 'big.js'

function getHeight(el) {
  const styles = window.getComputedStyle(el)
  const height = el.offsetHeight
  const borderTopWidth = parseFloat(styles.borderTopWidth)
  const borderBottomWidth = parseFloat(styles.borderBottomWidth)
  const paddingTop = parseFloat(styles.paddingTop)
  const paddingBottom = parseFloat(styles.paddingBottom)
  return (
    height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom
  )
}

function getWidth(el) {
  const styles = window.getComputedStyle(el)
  const width = el.offsetWidth
  const borderLeftWidth = parseFloat(styles.borderLeftWidth)
  const borderRightWidth = parseFloat(styles.borderRightWidth)
  const paddingLeft = parseFloat(styles.paddingLeft)
  const paddingRight = parseFloat(styles.paddingRight)
  return width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight
}

function pxAdd(origin = '0px', add) {
  origin = origin.replace('px', '')

  return parseInt(~~origin, 10) + add + 'px'
}

function pxToNumber(value) {
  return _.toNumber(value.slice(0, -2))
}

function getStyleWithDiff(style, diffX, diffY, height) {
  const newStyle = Object.assign({}, style)
  console.log('height', height)
  console.log(height.slice(0, -2))
  
  if (!style.left && style.right) {
    newStyle.right = pxAdd(newStyle.right, -diffX)
  } else {
    newStyle.left = pxAdd(newStyle.left, diffX)
    // 判断转换后的left是否为负 为负置为0px 锁定该字段只能在该block里面移动
    const isNegative = /^-/
    if (isNegative.test(newStyle.left)) {
      newStyle.left = '0px'
    }
  }

  if (!style.top && style.bottom) {
    newStyle.bottom = pxAdd(newStyle.bottom, -diffY)
  } else {
    newStyle.top = pxAdd(newStyle.top, diffY)
    // 判断转换后的top是否为负 为负置为0px 锁定该字段只能在该block里面移动
    const isNegative = /^-/
    if (isNegative.test(newStyle.top)) {
      newStyle.top = '0px'
    }
    if (pxToNumber(style.top) > pxToNumber(height)) {
      console.log(11111)
      newStyle.top = height
    }
    console.log('top', newStyle.top)
  }

  return newStyle
}

function getBlockName(name, index) {
  return `${name}.block.${index}`
}

function getTableColumnName(name, index) {
  return `${name}.column.${index}`
}

function insertCSS(cssString, target) {
  const style = window.document.createElement('style')
  style.type = 'text/css'
  style.appendChild(document.createTextNode(cssString))

  if (target) {
    target.appendChild(style)
  } else {
    window.document.head.appendChild(style)
  }
}

function dispatchMsg(event, data) {
  window.document.dispatchEvent(
    new window.CustomEvent(event, {
      detail: data
    })
  )
}

function exchange(arr, target, source) {
  ;[arr[target], arr[source]] = [arr[source], arr[target]]
  return arr
}

let timer

function afterImgAndSvgLoaded(callback, $printer) {
  const $imgList = $printer.querySelectorAll('img')
  const $svgList = $printer.querySelectorAll('svg')

  clearTimeout(timer)

  const everyThingIsOk =
    _.every($imgList, img => img.complete) &&
    _.every($svgList, svg => svg.children.length)
  if (everyThingIsOk) {
    callback()
  } else {
    timer = setTimeout(afterImgAndSvgLoaded.bind(this, callback, $printer), 300)
  }
}

function getSumTrHeight(SumTr) {
  const { style = {} } = SumTr
  const fontSize = style.fontSize || '12px'

  // 12px => 26, 14px => 29, 16px => 33, ...
  return (parseInt(fontSize) - 12) * 1.5 + 26
}

// eslint-disable-next-line
const coverDigit2Uppercase = n => {
  if (_.isNil(n) || _.isNaN(n)) {
    return '-'
  }

  const fraction = ['角', '分']

  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']

  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]

  const head = n < 0 ? '欠' : ''

  n = Math.abs(n)

  let left = ''
  let right = ''
  let i = 0
  for (i; i < fraction.length; i++) {
    right +=
      digit[
        Math.floor(
          Big(n)
            .times(Big(10).pow(i + 1))
            .mod(10)
            .toString()
        )
      ] + fraction[i]
  }

  right = right.replace(/(零.)+$/, '').replace(/(零.)/, '零') || '整'

  n = Math.floor(n)

  for (i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    left = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + left
  }

  return (
    head +
    (left.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零') + right).replace(
      /^整$/,
      '零元整'
    )
  )
}

// 是不是双栏table
const isMultiTable = dataKey => dataKey.includes('multi')

// 由于增加了商品排列（横向排列，纵向排列），所以统一用这个获取dataKey
const getDataKey = (dataKey, arrange) =>
  arrange === 'vertical' && isMultiTable(dataKey)
    ? `${dataKey}_vertical`
    : dataKey

export {
  getHeight,
  getWidth,
  pxAdd,
  getStyleWithDiff,
  getBlockName,
  getTableColumnName,
  insertCSS,
  dispatchMsg,
  exchange,
  afterImgAndSvgLoaded,
  getSumTrHeight,
  coverDigit2Uppercase,
  getDataKey,
  isMultiTable
}

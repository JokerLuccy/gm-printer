import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import ReactDOM from 'react-dom'
import { getHeight } from '../util'

@inject('printerStore')
@observer
class Page extends React.Component {
  componentDidMount () {
    const $dom = ReactDOM.findDOMNode(this)

    this.props.printerStore.setPageHeight(getHeight($dom))
    window.document.addEventListener('gm-printer-select-region', this.handleSelectedRegion)
  }

  componentWillUnmount () {
    window.document.removeEventListener('gm-printer-select-region', this.handleSelectedRegion)
  }

  handleSelectedRegion = e => {
    const { selected } = e.detail
    this.props.printerStore.setSelectedRegion(selected)
  }

  render () {
    const { children, printerStore } = this.props
    const { paddingTop, paddingRight, paddingBottom, paddingLeft } = printerStore.config.page.gap

    const { width, height } = printerStore.config.page.size

    // -3px 是避免运算误差而溢出
    return (
      <div className='gm-printer-page' style={{
        width: `calc(${width} - ${paddingLeft} - ${paddingRight})`,
        height: `calc(${height} - ${paddingTop} - ${paddingBottom} - 3px)`,
        padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`
      }}>
        <div className='gm-printer-page-inner' style={{
          width: `calc(${width} - ${paddingLeft} - ${paddingRight})`,
          height: `calc(${height} - ${paddingTop} - ${paddingBottom} - 3px)`
        }}>
          {children}
        </div>
      </div>
    )
  }
}

Page.propTypes = {
  pageIndex: PropTypes.number
}

Page.defaultProps = {}

export default Page

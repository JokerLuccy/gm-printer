import React from 'react'
import { EditorPurchase } from '../../src'
// 模板配置
import config from './template_config/purchase_config'
// 模拟数据
import data from './mock_data/purchase_bill_data'
import { formatBill } from './data_to_key'
// 添加的字段
import addFields from './add_fields'

const DeliveryEditor = ({ handleSave }) => <EditorPurchase
  config={config}
  mockData={formatBill(data)}
  onSave={handleSave}
  showEditor
  addFields={addFields}
/>

export default DeliveryEditor

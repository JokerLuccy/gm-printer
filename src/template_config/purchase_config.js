import i18next from '../../locales'

export default {
  'name': '',
  'page': {
    'name': 'A4',
    'size': {
      'width': '210mm',
      'height': '297mm'
    },
    'printDirection': 'vertical',
    'type': 'A4',
    'gap': {
      'paddingRight': '5mm',
      'paddingLeft': '5mm',
      'paddingBottom': '5mm',
      'paddingTop': '5mm'
    }
  },
  'header': {
    'blocks': [
      {
        'text': i18next.t('采购单据'),
        'style': {
          'right': '0px',
          'left': '0px',
          'position': 'absolute',
          'top': '0px',
          'fontWeight': 'bold',
          'fontSize': '26px',
          'textAlign': 'center'
        }
      },
      {
        'text': i18next.t('订单号: {{订单号}}'),
        'style': {
          'left': '2px',
          'position': 'absolute',
          'top': '50px'
        }
      },
      {
        'text': i18next.t('配送时间：{{配送时间}}'),
        'style': {
          'left': '261px',
          'position': 'absolute',
          'top': '76px'
        }
      },
      {
        'text': i18next.t('打印时间：{{当前时间}}'),
        'style': {
          'right': '',
          'left': '553px',
          'position': 'absolute',
          'top': '76px'
        }
      },
      {
        'text': i18next.t('分拣序号：{{分拣序号}}'),
        'style': {
          'right': '',
          'left': '450px',
          'position': 'absolute',
          'top': '50px'
        }
      },
      {
        'text': i18next.t('下单时间：{{下单时间}}'),
        'style': {
          'left': '2px',
          'position': 'absolute',
          'top': '76px'
        }
      }
    ],
    'style': {
      'height': '97px'
    }
  },
  'contents': [
    {
      'className': '',
      'type': 'table',
      'dataKey': 'purchase_no_detail',
      'subtotal': {
        'show': false
      },
      'specialConfig': {
        'style': {},
        'separator': '+',
        'template_text': i18next.t('{{分拣序号}}*{{商户名}}')
      },
      'columns': [
        {
          'head': i18next.t('序号'),
          'headStyle': {
            'textAlign': 'center'
          },
          'style': {
            'textAlign': 'center'
          },
          'text': i18next.t('{{列.序号}}')
        },
        {
          'head': i18next.t('商品名'),
          'headStyle': {
            'textAlign': 'center'
          },
          'style': {
            'textAlign': 'center'
          },
          'text': i18next.t('{{列.商品名称}}')
        },
        {
          'head': i18next.t('规格'),
          'headStyle': {
            'textAlign': 'center'
          },
          'style': {
            'textAlign': 'center'
          },
          'text': i18next.t('{{列.规格}}')
        },
        {
          'head': i18next.t('计划采购'),
          'headStyle': {
            'textAlign': 'center'
          },
          'style': {
            'textAlign': 'center'
          },
          'text': i18next.t('{{列.计划采购_基本单位}}')
        },
        {
          'head': i18next.t('库存'),
          'headStyle': {
            'textAlign': 'center'
          },
          'style': {
            'textAlign': 'center'
          },
          'text': i18next.t('{{列.库存}}')
        },
        {
          'head': i18next.t('建议采购(基本单位)'),
          'headStyle': {
            'textAlign': 'center'
          },
          'style': {
            'textAlign': 'center'
          },
          'text': i18next.t('{{列.建议采购_基本单位}}')
        },
        {
          'head': i18next.t('实采(基本单位)'),
          'headStyle': {
            'textAlign': 'center'
          },
          'style': {
            'textAlign': 'center'
          },
          'text': i18next.t('{{列.实采_基本单位}}')
        }
      ]
    }
  ],
  'sign': {
    'blocks': [
      {
        'text': i18next.t('签收人：'),
        'style': {
          'left': '600px',
          'position': 'absolute',
          'top': '5px'
        }
      }
    ],
    'style': {
      'height': '46px'
    }
  },
  'footer': {
    'blocks': [
      {
        'text': i18next.t('页码： {{当前页码}} / {{页码总数}}'),
        'style': {
          'right': '',
          'left': '48%',
          'position': 'absolute',
          'top': '0px'
        }
      }
    ],
    'style': {
      'height': '15px'
    }
  }
}

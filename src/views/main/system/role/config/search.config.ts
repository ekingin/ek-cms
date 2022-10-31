import type { IForm } from '@/base-ui/form/types'

export const searchFormConfig: IForm = {
  labelWidth: '100px',
  formItemStyle: {
    padding: '0 20px'
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOption: {
        rangeSeparator: '至',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}

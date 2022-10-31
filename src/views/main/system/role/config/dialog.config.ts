import type { IForm } from '@/base-ui/form/types'

export const dialogFormConfig: IForm = {
  labelWidth: '80px',
  // formItemStyle: {
  //   padding: '0 20px'
  // },
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    }
  ]
}

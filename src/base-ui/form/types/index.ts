type IFormItemType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  label: string
  type?: IFormItemType
  rules?: any[]
  placeholder?: string
  dicData?: any[]
  otherOption?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  formItemStyle?: any
}

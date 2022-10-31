// 表单校验规则
export const rules = {
  name: [
    {
      required: true,
      message: '账号必填',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '账号由5-10位字母或数字组成',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码必填',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,}$/,
      message: '账号由至少5位字母或数字组成',
      trigger: 'blur'
    }
  ]
}

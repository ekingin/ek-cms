// 表单校验规则
export const rules = {
  phone: [
    {
      required: true,
      message: '手机号必填',
      trigger: 'blur'
    },
    // {
    //   type: 'number',
    //   message: '手机号必须是纯数字',
    //   trigger: 'blur'
    // },
    {
      pattern:
        /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
      message: '手机号码错误',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码必填',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6}$/,
      message: '验证码格式错误',
      trigger: 'blur'
    }
  ]
}

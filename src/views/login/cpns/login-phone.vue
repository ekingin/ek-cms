<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="account.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="code-wrap">
          <el-input v-model="account.code" placeholder="请输入验证码" />
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import type { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'

import { rules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const account = reactive({
      phone: '',
      code: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('表单验证通过，手机登录')
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped>
.code-wrap {
  display: flex;
}
</style>

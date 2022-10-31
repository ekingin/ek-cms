<template>
  <div class="login-account">
    <el-form label-width="70px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" placeholder="请输入密码" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import type { ElForm } from 'element-plus'

import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import { rules } from '../config/account-config'
import localCatch from '@/utils/catch'

export default defineComponent({
  setup() {
    // 创建store实例
    const store = useStore()

    // 定义变量
    const account = reactive({
      name: localCatch.getCatch('name') ?? '',
      password: localCatch.getCatch('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    // 定义方法
    const loginAction = (isKeepAccount: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1. 缓存账号信息
          if (isKeepAccount) {
            // 若记住密码，则设置对应缓存
            localCatch.setCatch('name', account.name)
            localCatch.setCatch('password', account.password)
          } else {
            // 若不记住密码，则清空对应缓存
            localCatch.deleteCatch('name')
            localCatch.deleteCatch('password')
          }

          // 2. 登录验证
          store.dispatch('login/accountLoginAction', { ...account })
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

<style scoped lang="less"></style>

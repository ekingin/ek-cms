<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user"></i> 密码登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepAccount" label="记住密码"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button class="login-btn" type="primary" @click="loginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    const isKeepAccount = ref(true)
    const accountRef = ref<InstanceType<typeof loginAccount>>()
    const phoneRef = ref<InstanceType<typeof loginPhone>>()
    const currentTab = ref('account')

    const loginClick = () => {
      if (currentTab.value === 'account') {
        // 账号密码登录
        accountRef.value?.loginAction(isKeepAccount.value)
      } else {
        // 手机号登录
        phoneRef.value?.loginAction()
      }
    }

    return {
      isKeepAccount,
      loginClick,
      accountRef,
      phoneRef,
      currentTab
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 360px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .account-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>

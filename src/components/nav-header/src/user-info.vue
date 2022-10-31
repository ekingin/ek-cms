<template>
  <div class="user-info">
    <el-dropdown>
      <span class="avatar-name">
        <el-avatar
          class="avatar"
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span>{{ userName }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import { useStore } from '@/store'
import localCatch from '@/utils/catch'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const userName = store.state.login.userInfo.name

    // 退出登录
    const handleExitClick = () => {
      localCatch.deleteCatch('token')
      router.push('/login')
    }

    return { userName, handleExitClick }
  }
})
</script>

<style scoped lang="less">
.user-info {
  .avatar-name {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 5px;
    }
  }
}
</style>

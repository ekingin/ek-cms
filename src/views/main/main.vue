<template>
  <div class="main">
    <el-container class="page-container">
      <el-aside class="left-aside" :width="isCollapse ? '60px' : '210px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="right-container">
        <el-header class="right-header">
          <nav-header @foldIconEvent="foldIconEvent" />
        </el-header>
        <el-main class="right-main">
          <div class="main-content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'

export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    let isCollapse = ref(false)
    const foldIconEvent = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      foldIconEvent,
      isCollapse
    }
  }
})
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  .page-container {
    height: 100%;
    .left-aside {
      background-color: #001529;
      // 去掉垂直滚动条
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .right-container {
      .right-header {
        height: 48px;
        display: flex;
        align-items: center;
      }
      .right-main {
        background-color: #f0f2f5;
        color: #333;
        text-align: center;
        .main-content {
          background-color: #fff;
        }
      }
    }
  }
}
</style>

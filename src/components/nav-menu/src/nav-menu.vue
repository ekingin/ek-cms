<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="logo-img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="logo-txt">Vue3+TS</span>
    </div>
    <el-menu
      class="left-aside-menu"
      :default-active="defaultValue"
      :collapse="collapse"
      background-color="#001529"
      text-color="#b7bdc3"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 一级菜单有子菜单 -->
        <template v-if="item.type === 1 && item.children && item.children.length !== 0">
          <el-submenu :index="item.id + ''">
            <!-- 一级菜单 -->
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                class="inner-menu"
                @click="subMenuClick(subItem)"
              >
                <i v-if="subItem.icon" :class="subItem.icon"></i>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级菜单没有子菜单 -->
        <template v-else>
          <el-menu-item :index="item.id + ''">{{ item.name }}</el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useStore } from '@/store'
import { mapPathToMenu } from '@/utils/map-menus'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const userMenus = computed(() => store.state.login.userMenus)
    const currentPath = router.currentRoute.value.path

    const currentMenu = mapPathToMenu(userMenus.value, currentPath)
    let defaultValue = ref(currentMenu.id + '')

    const subMenuClick = (subItem: any) => {
      router.push(subItem.url ?? '/not-found')
    }

    return {
      userMenus,
      subMenuClick,
      defaultValue
    }
  }
})
</script>

<style scoped lang="less">
.logo {
  height: 28px;
  padding: 10px;
  display: flex;
  align-items: center;
  .logo-img {
    height: 100%;
    margin: 0 10px;
  }
  .logo-txt {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
  }
}
// 最内层菜单
.inner-menu {
  background-color: #0c2135;
}

/*
 * 覆盖内部样式
 */
// 菜单点击后
.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}
// 菜单hover 高亮
.el-menu-item:hover {
  color: #fff !important; // 菜单
}
// 去掉白线
.el-menu {
  border: none;
}
</style>

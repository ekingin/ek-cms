<template>
  <div class="nav-header">
    <i
      class="fold-icon"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="foldIconClick"
    ></i>
    <div class="top-menu">
      <EBreadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import EBreadcrumb from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    UserInfo,
    EBreadcrumb
  },
  emits: ['foldIconEvent'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const foldIconClick = () => {
      isFold.value = !isFold.value
      emit('foldIconEvent', isFold.value)
    }

    // 面包屑
    const route = useRoute()
    const store = useStore()

    const userMenus = store.state.login.userMenus
    const breadcrumbs = computed(() => {
      const currentPath = route.path
      return mapPathToBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      foldIconClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  .fold-icon {
    font-size: 30px;
    cursor: pointer;
    margin-right: 10px;
  }
  .top-menu {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

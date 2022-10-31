<template>
  <div class="menu">
    <page-content :config="contentTableConfig" pageName="menu"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'menu1',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>

<template>
  <div class="flex h-screen font-roboto" v-loading="loading">
    <!-- <WebSidebar /> -->

    <div class="flex-1 flex flex-col overflow-hidden">
      <WebHeader />

      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>

      <component :is="footer">
        <router-view />
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * imports
 */
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
// import WebSidebar from '@/components/web/WebSidebar.vue'
import WebHeader from '@/components/web/WebHeader.vue'
import WebFooter from '@/components/web/WebFooter.vue'
import ProductFooter from '@/components/web/ProductFooter.vue'

/**
 * useStoreUtils
 */
  import { useStoreUtils } from '@/stores/storeUtils.js'

/**
 * store utils
 */
  const storeUtils = useStoreUtils()
  const loading = computed(() => storeUtils.loading)

/**
 * footer 
 */
  const route = useRoute()

  const footer = computed(() => {
    if(route.path !== '/product') return WebFooter
    else return ProductFooter 
  })
</script>

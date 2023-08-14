<template>
  <div class="flex h-screen bg-gray-200 font-roboto" v-loading="loading">
    <!-- <WebSidebar /> -->

    <div class="flex-1 flex flex-col overflow-hidden">
      <WebHeader />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
      <WebFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * imports
 */
  // import WebSidebar from '@/components/web/WebSidebar.vue'
  import WebHeader from '@/components/web/WebHeader.vue'
  import WebFooter from '@/components/web/WebFooter.vue'

  import { computed } from 'vue'

  import { useRouter } from 'vue-router'

  const router = useRouter()

/**
 * store Utils
 */
  import { useStoreUtils } from '@/stores/storeUtils.js'

  const storeUtils = useStoreUtils()
  const loading = computed(() => storeUtils.loading)

/**
 * store User
 */
  import { useStoreUser } from '@/stores/storeUser.js'
  const storeUser = useStoreUser()

  if(!storeUser.isLogin()) {
    localStorage.removeItem('user')
    router.push('/')
  }
</script>

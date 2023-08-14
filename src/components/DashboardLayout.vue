<template>
  <div v-loading="loading" class="flex h-screen bg-gray-200 font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>

      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * imports
 */
  import Sidebar from './Sidebar.vue'
  import Header from './Header.vue'
  import Footer from './Footer.vue'

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

<template>
  <div v-loading="loading" class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center text-xl">
        團媽系統
      </div>

      <div class="mt-4">
        登入中....
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * imports
 */
  import { onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useLineLogin } from '@/compositions/lineLogin'

  const router = useRouter()
  const route = useRoute()

  const { loading, getLineUserInfo} = useLineLogin()

/**
 * onMounted
 */
  onMounted(() => {
    if(!route.query || !route.query.code) router.push('/')

    getLineUserInfo('/product_list')
  })
</script>


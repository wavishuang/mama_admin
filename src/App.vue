<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const defaultLayout = 'default'

const { currentRoute } = useRouter()

const layout = computed(() => {
  console.log('layout:', route.path, currentRoute.value.meta.layout)
  if(route.path === '/') {  // Login & Receive
    return 'empty-layout'
  } else if(currentRoute.value.meta.layout) {
    return `${currentRoute.value.meta.layout}-layout`
  } else {
    return `${defaultLayout}-layout`
  }
})
</script>

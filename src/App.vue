<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const defaultLayout = 'default'

const { currentRoute } = useRouter()

const layout = computed(() => {
  if(currentRoute.value.meta.layout) {
    return `${currentRoute.value.meta.layout}-layout`
  } else {
    return `${defaultLayout}-layout`
  }
})
</script>

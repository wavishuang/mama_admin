<template>
  <div class="w-full border-t-2 px-8 py-3 lg:flex justify-between items-center">
    <p class="mb-2 lg:mb-0">© Copyright {{ currentYear }} 澄品團購</p>

    <!-- <div class="flex">
      <a href="#" class="hover:text-gray-900">About Us</a>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentYear = ref<number>(new Date().getFullYear())
</script>

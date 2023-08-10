<template>
  <div class="relative mx-4 lg:mx-0">
    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
      <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>

    <input
      class="w-32 pl-10 pr-4 py-2 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
      type="text"
      placeholder="Search"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
/**
 * imports
 */
  import { defineProps, defineEmits } from 'vue'

/**
 * props
 */
  defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  })

/**
 * emits
 */
  defineEmits(['update:modelValue'])


</script>
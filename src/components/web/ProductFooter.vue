<template>
  <div class="w-full border-t-2 flex justify-between items-stretch">
    <el-input-number 
      v-model="count" 
      :min="1"
      size="large"
      @change="handleChange" />

    <el-button class="btn-shopping w-1/3">
      <el-icon class="mr-2">
        <ShoppingCart />
      </el-icon>
      加入團購
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}
</script>

<style>
.btn-shopping {
  height: 100%;
  border: 0;
  background-color: #ff6600;
  color: #fff;
  font-size: 1.2rem;
}
</style>

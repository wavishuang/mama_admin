<template>
  <div class="flex">

    <el-select 
      v-model="pageSize"
      @change="handleSizeChange"
      class="mr-4" 
      style="width: 88px;"
    >
      <el-option
        v-for="item in recordsOfPage"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span>{{ item.label }}</span>
        <!-- <span
          style="
            float: right;
            color: var(--el-text-color-secondary);
            font-size: 13px;
          "
          >{{ item.value }}</span
        > -->
      </el-option>
    </el-select>
  
    <el-pagination 
      background 
      layout="prev, pager, next"
      :currentPage="currentPage"
      :page-sizes="[2, 5, 10, 50, 100, 200]" 
      :total="total"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    />

    <div class="border px-2 py-1 ml-4 page-total">
      共 {{total}} 筆
    </div>
  </div>
</template>

<script setup>
/**
 * imports
 */
  import { ref, defineProps, defineEmits } from 'vue'

/**
 * props
 */
  const props = defineProps({
    total: {
      type: Number,
      required: true,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    }
  })

/**
 * emits
 */
  const emit = defineEmits(['pageSizeChange', 'currentPageChange'])

  const recordsOfPage = ref([
    {label: '2/頁', value: 2}, 
    {label: '5/頁', value: 5},
    {label: '10/頁', value: 10},
    {label: '50/頁', value: 50},
    {label: '100/頁', value: 100},
  ])

  const pageSize = ref(10)

  const handleSizeChange = val => {
    console.log(`${val} items per page`)
    pageSize.value = val

    emit('pageSizeChange', val)
  }
  const handleCurrentChange = val => {
    console.log(`current page: ${val}`)

    emit('currentPageChange', val)
  }
</script>

<style scoped>
.page-total {
  color: #606266;
  border-color: #e5e7eb;
  font-size: 14px;
  border-radius: 4px;
}
</style>
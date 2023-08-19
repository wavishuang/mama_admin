<template>
  <div class="overflow-x-auto">
    <div class="block w-full overflow-hidden rounded-lg shadow">
      <el-table 
        :data="storeProduct.all"
        style="width: 100%;"
      >
        <!-- <el-table-column fixed prop="pid" label="刪除" width="60">
          <template #default="scope">
            <el-button link type="danger" size="large" @click="delProduct(scope.row.pid)">&times;</el-button>
          </template>
        </el-table-column> -->
        <el-table-column prop="pname" label="商品名稱" width="320" />
        <el-table-column prop="images" label="商品圖片">
          <template #default="scope">
            <div class="flex flex-wrap w-80">
              <div class="flex-shrink-0 w-10 h-10" v-for="img in scope.row.images.split(',')" :key="img">
                <img
                  class="w-full h-full rounded"
                  :src="`${imgCdn}${img}`" 
                />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cut_off" label="結單日期 / 時間" width="180" />
        <el-table-column prop="status" label="狀態" width="80">
          <template #default="scope">
            <div class="flex flex-wrap">
              <el-text :type="scope.row.online == 0 ? 'danger' : scope.row.is_cut_off == 0 ? 'success' : 'info'">
                {{ scope.row.online == 0 ? '已下架' : scope.row.is_cut_off == 0 ? '團購中' :'已結單' }}
              </el-text>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="訂單查詢" width="140">
          <template #default="scope">
            <el-button 
              type="success" 
              size="large" 
              @click="queryOrder(scope.row.pid)"
              plain>訂單查詢</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
        <Pagination 
          :total="total" 
          :currentPage="currentPage"
          @pageSizeChange="pageSizeChange"
          @currentPageChange="currentPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Pagination from '@/components/Pagination.vue'
// import { ElMessage, ElMessageBox } from 'element-plus'

import { VUE_APP_IMG_CDN } from '@/config/line.js'

/**
 * store Utils
 */
  import { useStoreUtils } from '@/stores/storeUtils.js'
  
  const storeUtils = useStoreUtils()
  storeUtils.loading = true

/**
 * store User
 */
  import { useStoreUser } from '@/stores/storeUser.js'

  const storeUser = useStoreUser()

/**
 * 頁面資訊：
 * pageSize: 每頁幾筆
 * currentPage: 目前頁面 
 */
  // 每頁幾筆
  const pageSize = ref(10)
  const pageSizeChange = val => pageSize.value = val

  // 目前頁面
  const currentPage = ref(1)
  const currentPageChange = val => currentPage.value = val

/**
 * storeProduct
 */
  import { useStoreProduct } from '@/stores/storeProduct.js'
  const imgCdn = VUE_APP_IMG_CDN
  const storeProduct = useStoreProduct()
  const total = computed(() => storeProduct.total)
  const get_cut_off_product = async () => {
    storeUtils.loading = true
    let formData = new FormData()
        formData.append('owner_id', storeUser.user.sub)
        formData.append('page_size', pageSize.value)
        formData.append('current_page', currentPage.value)

    storeProduct.getCutOffProduct(formData).then(() => {
      storeUtils.loading = false
    })
  }

  // 取得 “已結單“ 商品
  get_cut_off_product()

  watch(() => [pageSize.value, currentPage.value], () => {
    get_cut_off_product()
  })

  // 訂單查詢
  const queryOrder = async(pid) => {
    console.log('訂單查詢:', pid)
  }
</script>

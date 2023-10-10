<template>
  <div class="overflow-x-auto">
    <div class="block w-full overflow-hidden rounded-lg shadow">
      <el-table 
        :data="storeProduct.all"
        style="width: 100%;"
      >
        <el-table-column fixed prop="pid" label="刪除" width="60">
          <template #default="scope">
            <el-button link type="danger" size="large" @click="delProduct(scope.row.pid)">&times;</el-button>
          </template>
        </el-table-column>
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
        <el-table-column label="複製連結" width="140">
          <template #default="scope">
            <el-button 
              type="primary" 
              size="large" 
              @click="copyLink(scope.row.pid)"
              :disabled="scope.row.online == 0 || scope.row.is_cut_off == 1" 
              plain>複製連結</el-button>
          </template>
        </el-table-column>
        <el-table-column props="online" fixed="right" label="操作" width="140">
          <template #default="scope">
            <div class="flex flex-wrap justify-between">
              <el-button 
                type="primary" 
                size="small" 
                :disabled="scope.row.online == 0 || scope.row.is_cut_off == 1" 
                @click="cutOffProduct(scope.row.pid)"
                plain
              >結單</el-button>
              <el-button 
                type="success" 
                size="small"
                class="mb-2" 
                v-show="scope.row.online == 0"
                :disabled="scope.row.is_cut_off == 1"
                @click="setProductState(scope.row, 1)"
                plain
              >上架</el-button>
              <el-button 
                type="danger" 
                size="small" 
                class="mb-2" 
                v-show="scope.row.online == 1"
                :disabled="scope.row.is_cut_off == 1"
                @click="setProductState(scope.row, 0)"
                plain
              >下架</el-button>
            </div>
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
import { ElMessage, ElMessageBox } from 'element-plus'

import { VUE_APP_WEB_URL, VUE_APP_IMG_CDN } from '@/config/line.js'

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
  const get_offline_product = async () => {
    storeUtils.loading = true
    let formData = new FormData()
        formData.append('owner_id', storeUser.user.sub)
        formData.append('page_size', pageSize.value)
        formData.append('current_page', currentPage.value)

    storeProduct.getOfflineProduct(formData).then(() => {
      storeUtils.loading = false
    })
  }

  // 取得 “已下架“ 商品
  get_offline_product()

  watch(() => [pageSize.value, currentPage.value], () => {
    get_offline_product()
  })

  // 刪除商品
  const delProduct = pid => {
    ElMessageBox.confirm(
      '刪除商品後，此筆商品的訂單會跟著失效，您確定要刪除此商品?',
      '刪除商品',
      {
        confirmButtonText: '確定刪除',
        cancelButtonText: '取消',
        type: 'danger',
      }
    ).then(() => {
      storeUtils.loading = true

      let formData = new FormData()
          formData.append('pid', pid)

      storeProduct.deleteProduct(formData).then(res => {
        console.log(res)
        if(res.code === '0000' && res.result) {
          console.log('del success')
        }
        storeUtils.loading = false
      })
    }).catch(() => {
      console.log('取消刪除')
    })
  }

  // 上/下架商品
  const setProductState = (product, state) => {
    const pid = product.pid
    const now = new Date().getTime()
    if(now > new Date(product.cut_off.replace(' ', 'T')).getTime()) {
      ElMessage.error(`此商品已過期，無法重新${state === 1 ? '上架' : '下架'}。`)
      return false
    }

    const message = state === 0 ? '下架商品後，此筆商品的訂單會跟著失效，您確定要刪除此商品?' : '商品重新上架'
    const title = state === 0 ? '下架商品' : '上架商品'
    ElMessageBox.confirm(
      message,
      title,
      {
        confirmButtonText: state === 0 ? '確定下架' : '重新上架',
        cancelButtonText: '取消',
        type: 'danger',
      }
    ).then(() => {
      storeUtils.loading = true

      let formData = new FormData()
          formData.append('pid', pid)
          formData.append('state', state)

      storeProduct.setProductState(formData).then(() => {
        storeUtils.loading = false
      })
    }).catch(() => {
      console.log('取消上/下架')
    })
  }

  // 結單
  const cutOffProduct = pid => {
    console.log("cutOffProduct:", pid)
    ElMessageBox.confirm(
      '您確定要結算此商品的訂單?',
      '結單',
      {
        confirmButtonText: '確定結單',
        cancelButtonText: '取消',
        type: 'danger',
      }
    ).then(() => {
      storeUtils.loading = true

      let formData = new FormData()
          formData.append('pid', pid)

      storeProduct.cutOffProduct(formData).then(res => {
        console.log(res)
        if(res.code === '0000' && res.result) {
          console.log('cut off product success')
        }
        storeUtils.loading = false
      })
    }).catch(() => {
      console.log('取消結單')
    })
  }

  // 複製連結
  const copyLink = async (pid) => {
    console.log('複製連結')
    try {
      await navigator.clipboard.writeText(`${VUE_APP_WEB_URL}/product/${pid}`);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
      ElMessage.error('抱歉！無法複製')
    }
    // const copyContent = async () => {
    //   try {
    //     await navigator.clipboard.writeText(text);
    //     console.log('Content copied to clipboard');
    //   } catch (err) {
    //     console.error('Failed to copy: ', err);
    //   }
    // }
  }
</script>

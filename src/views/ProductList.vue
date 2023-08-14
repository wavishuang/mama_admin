<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb breadcrumb="product_list" />

    <div class="mt-8">
      <div class="mt-6">
        <div class="flex flex-col mt-3 sm:flex-row items-center justify-between">
          <div class="">
            <router-link
              class="px-3 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-400 focus:outline-none"
              to="/product_add"
            >
              + 新增商品
            </router-link>
          </div>

          <div class="flex flex-col mt-3 sm:flex-row">
            <div class="flex">
              <div class="relative">
                <select
                  class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>

                <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                  <svg
                    class="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <div class="relative">
                <select
                  class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border-t border-b border-r border-gray-400 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <div
                  class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"
                >
                  <svg
                    class="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="relative block mt-2 sm:mt-0">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  class="w-4 h-4 text-gray-500 fill-current"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
                </svg>
              </span>

              <input
                placeholder="Search"
                class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <el-tabs type="border-card">
          <el-tab-pane label="全部">
            <div class="overflow-x-auto">
              <div class="block w-full overflow-hidden rounded-lg shadow">
                <!-- :default-sort="{ prop: 'cut_off', order: 'ascending' }" -->
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
                  <!-- <el-table-column prop="cut_off" sortable label="結單日期 / 時間" width="180" /> -->
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
                        <el-button type="primary" size="small" :disabled="scope.row.online == 0 || scope.row.is_cut_off == 1" @click="cutOffProduct(scope.row.pid)">結單</el-button>
                        <el-button 
                          type="success" 
                          size="small"
                          class="mb-2" 
                          v-show="scope.row.online == 0"
                          :disabled="scope.row.is_cut_off == 1"
                          @click="setProductState(scope.row.pid, 1)"
                        >上架</el-button>
                        <el-button 
                          type="danger" 
                          size="small" 
                          class="mb-2" 
                          v-show="scope.row.online == 1"
                          :disabled="scope.row.is_cut_off == 1"
                          @click="setProductState(scope.row.pid, 0)"
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
          </el-tab-pane>
          <el-tab-pane label="團購中">團購中</el-tab-pane>
          <el-tab-pane label="已結單">已結單</el-tab-pane>
          <el-tab-pane label="下架商品">下架商品</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Breadcrumb from '@/partials/Breadcrumb.vue'
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
  // const user = computed(() => storeUser.user || {})

  // console.log(user.value.sub)

  // const userId = storeUser.getUserId(user.sub)

  // const get_user_id = () => {
  //   if(user.value.sub) {
  //     let formData = new FormData()
  //         formData.append('user_sub', user.value.sub)
      
  //     storeUser.getUserId(formData).then(res => {
  //       console.log(res.data)
  //       storeUtils.loading = false
  //     })
  //   }
  // }

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
  const get_all_product = async () => {
    // console.log(storeUser.user.sub)
    storeUtils.loading = true
    let formData = new FormData()
        formData.append('owner_id', storeUser.user.sub)
        formData.append('page_size', pageSize.value)
        formData.append('current_page', currentPage.value)

    storeProduct.getAllProduct(formData).then(() => {
      storeUtils.loading = false
    })
  }

  // 取得 “全部“ 商品
  get_all_product()

  watch(() => [pageSize.value, currentPage.value], ([size, page]) => {
    console.log('size:', size)
    console.log('page:', page)
    get_all_product()
  })

  // 刪除商品
  const delProduct = pid => {
    console.log("delProduct:", pid)
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

  // 下架商品
  const setProductState = (pid, state) => {
    console.log("setProductState:", pid, state)
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

      storeProduct.setProductState(formData).then(res => {
        console.log(res)
        if(res.code === '0000' && res.result) {
          console.log('set product state success')
        }
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

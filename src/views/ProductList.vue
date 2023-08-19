<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb breadcrumb="product_list" />

    <div class="mt-8 bg-white p-6">
      <div class="mt-6">
        <div class="flex flex-col mt-3 sm:flex-row items-center justify-between">
          <div class="mb-4">
            <router-link
              class="px-3 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-400 focus:outline-none"
              to="/product_add"
            >
              + 新增商品
            </router-link>
          </div>

          <!-- <div class="flex flex-col mt-3 sm:flex-row">
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
          </div> -->
        </div>

        <el-tabs
          v-model="activeTapName"
          type="card"
        >
          <el-tab-pane label="全部" name="all"></el-tab-pane>
          <el-tab-pane label="團購中" name="processing"></el-tab-pane>
          <el-tab-pane label="已結單" name="cut_off"></el-tab-pane>
          <el-tab-pane label="下架商品" name="offline"></el-tab-pane>
        </el-tabs>

        <component :is="product" />
        <!-- <AllProduct /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, shallowRef } from 'vue'
import Breadcrumb from '@/partials/Breadcrumb.vue'

import AllProduct from './product_list/AllProduct.vue'
import ProcessingProduct from './product_list/ProcessingProduct.vue'
import CutOffProduct from './product_list/CutOffProduct.vue'
import OfflineProduct from './product_list/OfflineProduct.vue'

/**
 * tabs
 */
  const product = shallowRef(null)
  product.value = AllProduct
  const activeTapName = ref('all')

  watchEffect(() => {
    switch(activeTapName.value) {
      case 'all':
        product.value = AllProduct
        break
      case 'processing':
        product.value = ProcessingProduct
        break
      case 'cut_off':
        product.value = CutOffProduct
        break
      case 'offline':
        product.value = OfflineProduct
        break
      default:
        product.value = null
    }
  })

  // 取得已結單商品資訊
  // const get_cut_off_product = async () => {
  //   // console.log(storeUser.user.sub)
  //   storeUtils.loading = true
  //   let formData = new FormData()
  //       formData.append('owner_id', storeUser.user.sub)
  //       formData.append('page_size', pageSize.value)
  //       formData.append('current_page', currentPage.value)
  //       formData.append('is_cut_off', 1)

  //   storeProduct.getAllProduct(formData).then(() => {
  //     storeUtils.loading = false
  //   })
  // }
</script>

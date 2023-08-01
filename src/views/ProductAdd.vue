<template>
  <!-- Breadcrumb -->
  <Breadcrumb breadcrumb="product_add" />

  <div class="mt-8">
    <div class="mt-4">
      <div class="p-6 bg-white rounded-md shadow-md">
        <form>
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label class="text-gray-700" for="username">商品名稱</label>
              <input
                class="border px-2 py-1 w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text"
              />
            </div>

            <div>
              <label class="text-gray-700" for="username">結單日期</label>
              <input
                class="border px-2 py-1 w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="datetime-local"
              />
            </div>

            <div class="grid grid-cols-3 space-x-2">
              <div>
                <label class="text-gray-700" for="username">成本</label>
                <input
                  class="border px-2 py-1 w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="number"
                />
              </div>
              <div>
                <label class="text-gray-700" for="username">建議售價</label>
                <input
                  class="border px-2 py-1 w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="number"
                />
              </div>
              <div>
                <label class="text-gray-700" for="username">澄品價</label>
                <input
                  class="border px-2 py-1 w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="number"
                />
              </div>
            </div>

            <div>
              <label class="text-gray-700 w-full" for="username">有無限制數量</label>
              <div class="flex items-center mt-2">
                <div class="flex items-center mr-8">
                  <input type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked>
                  <label class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">無</label>
                </div>
                <div class="flex items-center mr-2">
                  <input type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">有</label>
                </div>
                <div class="flex-inline">
                  <label class="mr-2">數量</label>
                  <input
                    class="border px-2 py-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="number"
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div>
              <label class="text-gray-700" for="username">上傳圖片(可一次上傳多張圖片)</label>
              <div class="py-4 flex flex-wrap bg-white relative">
                <img v-for="(image, i) in imagePreviews" :key="i" class="w-48 h-48 mr-2 mb-2 rounded object-cover" :src="image">
                <div class="w-full"></div>
                <div @click="$refs.file.value = null; $refs.file.click()" class="w-16 h-16 mr-2 mb-2 bg-gray-200 text-gray-400 rounded flex justify-center items-center font-mono text-2xl select-none cursor-pointer">
                  <span v-show="!imagePreviews.length">+</span>
                  <span v-show="imagePreviews.length" class="w-16 h-16 bg-red-400 text-white rounded flex flex-col justify-center items-center font-mono text-xl select-none cursor-pointer">
                    <div class="text-center">全部</div>
                    <div class="text-center">重選</div>
                  </span> 
                </div>
                <input ref="file" type="file" @change="preview" class="absolute invisible" accept="image/*" multiple>
              </div>
            </div>

            <div>
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">商品描述</label>
              <textarea id="message" rows="15" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="請輸入商品描述"></textarea>
            </div>
          </div>

          <div class="flex justify-end mt-8">
            <button
              class="mr-8 px-4 py-2 text-gray-200 bg-gray-400 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              取消
            </button>

            <button
              class="px-4 py-2 text-gray-200 bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-gray-700"
            >
              新增
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Breadcrumb from '../partials/Breadcrumb.vue'
import { useImgUpload } from '../compositions/imgUpload'

const { file, preview, imagePreviews, del_imgs } = useImgUpload()

</script>

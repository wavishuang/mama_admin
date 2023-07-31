<template>
  <!-- Breadcrumb -->
  <Breadcrumb breadcrumb="product_add" />

  <div class="mt-8">
    <!-- <h4 class="text-gray-600">Forms</h4> -->

    <div class="mt-4">
      <div class="p-6 bg-white rounded-md shadow-md">
        <!-- <h2 class="text-lg font-semibold text-gray-700 capitalize">Account settings</h2> -->

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
                type="date"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 mt-4">
            <div>
              <label class="text-gray-700" for="username">上傳圖片(可一次上傳多張圖片)</label>
              <div class="py-4 flex flex-wrap bg-white relative">
                <!-- <div class="absolute top-2 left-24" v-if="imagePreviews.length">
                  <span class="flex bg-red-500 text-white border w-5 h-5 items-center justify-center rounded-full cursor-pointer" @click="del_img(0)">&times;</span>
                </div> -->
                <img v-for="(image, i) in imagePreviews" :key="i" class="w-80 h-80 mr-2 mb-2 rounded object-cover" :src="image">
                <div @click="$refs.file.value = null; $refs.file.click()" class="w-16 h-16 mr-2 mb-2 bg-gray-200 text-gray-400 rounded flex justify-center items-center font-mono text-2xl select-none cursor-pointer">+</div>
                <div @click="del_imgs" class="w-16 h-16 bg-red-400 text-white rounded flex flex-col justify-center items-center font-mono text-xl select-none cursor-pointer">
                  <div class="text-center">全部</div>
                  <div class="text-center">重選</div>
                </div>
                <input ref="file" type="file" @change="preview" class="absolute invisible" accept="image/*" multiple>
              </div>
            </div>

            <div>
              <label class="text-gray-700" for="username">商品描述</label>
              <textarea
                rows="10"
                class="border px-2 py-1 w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              />
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

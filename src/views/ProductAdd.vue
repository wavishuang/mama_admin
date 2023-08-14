<template>
  <!-- Breadcrumb -->
  <Breadcrumb breadcrumb="product_add" />

  <div class="mt-8">
    <div class="mt-4">
      <div class="p-6 bg-white rounded-md shadow-md">
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label class="text-gray-700" for="username">商品名稱</label>
              <input
                class="border px-2 py-1 w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text"
                v-model="product.name"
              />
            </div>

            <div>
              <label class="text-gray-700" for="username">結單日期</label>
              <input
                class="border px-2 py-1 w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="datetime-local"
                v-model="product.datetime"
              />
            </div>

            <div class="grid grid-cols-3 space-x-2">
              <div>
                <label class="text-gray-700" for="username">成本</label>
                <input
                  class="border px-2 py-1 w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="number"
                  v-model.number="product.cost"
                />
              </div>
              <div>
                <label class="text-gray-700" for="username">建議售價</label>
                <input
                  class="border px-2 py-1 w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="number"
                  v-model.number="product.suggestedPrice"
                />
              </div>
              <div>
                <label class="text-gray-700" for="username">澄品價</label>
                <input
                  class="border px-2 py-1 w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="number"
                  v-model.number="product.sellingPrice"
                />
              </div>
            </div>

            <div>
              <label class="text-gray-700 w-full" for="username">數量<span class="text-xs text-red-400">(數量:0 為無限制)</span></label>
              <div class="flex items-center mt-2">
                <div class="flex-inline">
                  <label class="mr-2">數量</label>
                  <input
                    class="border px-2 py-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="number"
                    v-model="product.quantity"
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
              <textarea v-model="product.description" id="message" rows="15" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="請輸入商品描述"></textarea>
            </div>
          </div>

          <div class="flex justify-center mt-8">
            <button
              type="button"
              class="mr-8 px-8 py-2 text-gray-200 bg-gray-400 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              @click="goBack"
            >
              取消
            </button>

            <button
              type="submit"
              class="px-8 py-2 text-gray-200 bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-gray-700"
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
/**
 * imports
 */
  import { reactive, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import Breadcrumb from '../partials/Breadcrumb.vue'
  import { ElMessage, ElMessageBox } from 'element-plus'

/**
 * router
 */
  const router = useRouter()

/**
 * storeUtils
 */
  import { useStoreUtils } from '../stores/storeUtils.js'

  const storeUtils = useStoreUtils()
  storeUtils.loading = true

  onMounted(() => {
    storeUtils.loading = false
  })

/**
 * Image Upload
 */
  import { useImgUpload } from '../compositions/imgUpload'

  const { file, preview, imagePreviews } = useImgUpload()

/**
 * product info
 */
  const product = reactive({
    name: '',
    datetime: '',
    cost: 0,
    suggestedPrice: 0,
    sellingPrice: 0,
    quantity: 0,
    description: ''
  })

/**
 * storeProduct
 */
  import { useStoreProduct } from '../stores/storeProduct.js'
  const storeProduct = useStoreProduct()

  /**
   * submit
   */
  // emoji 轉碼
  const b64EncodeUnicode = (str) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
    }))
  }
  
  // emoji 解碼
  // const b64DecodeUnicode = (str) => {
  //   return decodeURIComponent(atob(str).split('').map(function(c) {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  //   }).join(''))
  // }

  const handleSubmit = async () => {
    // console.log('storeUtils.loading:', storeUtils.loading)
    if(storeUtils.loading) return
    // console.log('is submit 2')
    storeUtils.loading = true
    let errorFlag = false
    let alertText = ''
    let column = ''
    for(const key in product) {
      // console.log(`${key} ==> ${product[key]}`)
      if(key === 'quantity') continue
      // console.log(`${key}: ${product[key]}`)
      if(!product[key]) {
        switch(key) {
          case 'name':
            column = '姓名'
            break
          case 'datetime':
            column = '結單日'
            break
          case 'cost':
            column = '成本'
            break
          case 'suggestedPrice':
            column = '建議售價'
            break
          case 'sellingPrice':
            column = '澄品價'
            break
          case 'description':
            column = '商品描述'
            break
        }
        alertText = `您${column}忘了填！！`
        errorFlag = true
        break
      }
    }

    if(!errorFlag && !imagePreviews.value.length) {
      errorFlag = true
      alertText = `您忘記上傳圖片了！！`
    }

    if(errorFlag) {
      storeUtils.loading = false
      ElMessage.error(alertText)
      return false
    }
    // console.log('validate success')
    const formData = new FormData()
      formData.append('owner', 1);

      formData.append('name', product.name || '')
      formData.append('datetime', product.datetime || '')
      formData.append('cost', product.cost || 0)
      formData.append('suggestedPrice', product.suggestedPrice || 0)
      formData.append('sellingPrice', product.sellingPrice || 0)
      formData.append('quantity', product.quantity || 0)
      formData.append('description', b64EncodeUnicode(product.description.trim().replace(/\n/g, '<br/>')) || '')
    Array.from(file.value.files).forEach(f => formData.append('files[]', f))
  
    storeProduct.addProduct(formData).then(res => {
      console.log('res:', res)
      storeUtils.loading = false
      router.push('/product_list')
    })
  }

/**
 * 取消：返回”商品列表“
 */
  const goBack = () => {
    ElMessageBox.confirm('您確定要捨棄此次編輯？', '警告', {
      cancelButtonText: '取消',
      confirmButtonText: '確定',
    }).then(() => {
      history.go(-1)
    }).catch(() => {
      console.log('取消')
    })
  }

</script>

<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>

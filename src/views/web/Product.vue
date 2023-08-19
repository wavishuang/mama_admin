<template>
  <!-- Breadcrumb -->
  <!-- <Breadcrumb breadcrumb="product_add" /> -->
  <div class="text-xl">{{ productInfo.title }}</div>
    
  <div class="p-2 w-full">
    <div class="flex flex-col space-y-4 mt-4">
      <div class="py-4 flex flex-wrap bg-white relative">
        <img 
          v-for="(image, i) in productInfo.images" 
          :key="i" 
          class="w-full mb-2 rounded object-cover" 
          :src="`${imgCdn}${image}`"
        />
      </div>

      <div v-html="productInfo.description"></div>
    </div>
  </div>
</template>
<script setup>
/**
 * imports
 */
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  // import Breadcrumb from '../../partials/Breadcrumb.vue'
  // import { ElMessage, ElMessageBox } from 'element-plus'

  import { useStoreUtils } from '@/stores/storeUtils.js'
  import { useStoreProduct } from '@/stores/storeProduct.js'
  import { VUE_APP_IMG_CDN } from '@/config/line.js'
  import { utils } from '@/utils'

/**
 * use Route
 */
  const route = useRoute()

/**
 * storeUtils
 */
  const storeUtils = useStoreUtils()
  storeUtils.loading = true

/**
 * store product
 */
  const imgCdn = VUE_APP_IMG_CDN
  const productId = computed(() => route.params.pid ? parseInt(route.params.pid) : 0)
  const b64DecodeUnicode = (str) => {
    return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
  }

  const storeProduct = useStoreProduct()
  const productInfo = computed(() => {
    if(storeProduct.info && !utils.isEmpty(storeProduct.info)) {
      const title = (storeProduct.info.pname && storeProduct.info.pname.length) ? storeProduct.info.pname : ''
      const images = (storeProduct.info.images && storeProduct.info.images.length) ? storeProduct.info.images.split(",") : []
      const description =(storeProduct.info.description && storeProduct.info.description.length) ? b64DecodeUnicode(storeProduct.info.description) : ''

      return {
        title,
        images,
        description,
      }
    }


    return {
      title: '',
      images: [],
      description: '',
    }
  })

  const get_product_detail = async () => {
    // console.log(storeUser.user.sub)
    storeUtils.loading = true
    let formData = new FormData()
        formData.append('productId', productId.value)

    storeProduct.getProductDetail(formData).then(res => {
      console.log('getProductDetail:', res)
      storeUtils.loading = false
    })
  }

  // 取得 “全部“ 商品
  get_product_detail()

  // onMounted(() => {
  //   storeUtils.loading = false
  // })

/**
 * product info
 */
  // const product = reactive({
  //   name: '',
  //   datetime: '',
  //   cost: 0,
  //   suggestedPrice: 0,
  //   sellingPrice: 0,
  //   quantity: 0,
  //   description: ''
  // })

/**
 * storeProduct
 */
  

  // const storeProduct = useStoreProduct()
  // storeProduct.getAllProduct()

/**
 * submit
 */
  // const isSubmit = ref(false)
  // const handleSubmit = async () => {
  //   if(isSubmit.value) return
  //   // console.log('is submit')
  //   isSubmit.value = true
  //   let errorFlag = false
  //   let alertText = ''
  //   let column = ''
  //   for(const key in product) {
  //     // console.log(`${key} ==> ${product[key]}`)
  //     if(key === 'quantity') continue
  //     // console.log(`${key}: ${product[key]}`)
  //     if(!product[key]) {
  //       switch(key) {
  //         case 'name':
  //           column = '姓名'
  //           break
  //         case 'datetime':
  //           column = '結單日'
  //           break
  //         case 'cost':
  //           column = '成本'
  //           break
  //         case 'suggestedPrice':
  //           column = '建議售價'
  //           break
  //         case 'sellingPrice':
  //           column = '澄品價'
  //           break
  //         case 'description':
  //           column = '商品描述'
  //           break
  //       }
  //       alertText = `您${column}忘了填！！`
  //       errorFlag = true
  //       break
  //     }
  //   }

  //   if(!errorFlag && !imagePreviews.value.length) {
  //     errorFlag = true
  //     alertText = `您忘記上傳圖片了！！`
  //   }

  //   if(errorFlag) {
  //     isSubmit.value = false
  //     ElMessage.error(alertText)
  //     return false
  //   }
  //   // console.log('validate success')
  //   const formData = new FormData()
  //     formData.append('name', product.name || '')
  //     formData.append('datetime', product.datetime || '')
  //     formData.append('cost', product.cost || 0)
  //     formData.append('suggestedPrice', product.suggestedPrice || 0)
  //     formData.append('sellingPrice', product.sellingPrice || 0)
  //     formData.append('quantity', product.quantity || 0)
  //     formData.append('description', product.description || '')
  //   Array.from(file.value.files).forEach(f => formData.append('files[]', f))
  
  //   storeProduct.setProduct(formData).then(res => {
  //     console.log('res:', res)
  //     isSubmit.value = false  
  //   })
  // }

/**
 * 取消：返回”商品列表“
 */
  // const goBack = () => {
  //   ElMessageBox.confirm('您確定要捨棄此次編輯？', '警告', {
  //     cancelButtonText: '取消',
  //     confirmButtonText: '確定',
  //   }).then(() => {
  //     history.go(-1)
  //   }).catch(() => {
  //     console.log('取消')
  //   })
  // }
</script>

<style>
/* .modal {
  transition: opacity 0.25s ease;
} */
</style>

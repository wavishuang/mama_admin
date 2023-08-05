<template>
  <!-- Breadcrumb -->
  <!-- <Breadcrumb breadcrumb="product_add" /> -->
  <div class="text-xl">{{ name }}</div>
    
  <div class="p-2 w-full">
    <div class="flex flex-col space-y-4 mt-4">
      <div class="py-4 flex flex-wrap bg-white relative">
        <img v-for="(image, i) in images" :key="i" class="w-full mb-2 rounded object-cover" :src="image">
      </div>

      <div v-html="description"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
/**
 * imports
 */
  import { ref, computed, reactive, onMounted } from 'vue'
  // import Breadcrumb from '../../partials/Breadcrumb.vue'
  // import { ElMessage, ElMessageBox } from 'element-plus'

  import { useStoreUtils } from '@/stores/storeUtils.js'
  import { useStoreProduct } from '@/stores/storeProduct.js'

  const name = ref('W381（冷凍）野生活凍白蝦（8/7結單）')
  const images = ref([
    'https://api.cc94178.com/uploads/product/720270.jpg',
    'https://api.cc94178.com/uploads/product/720271.jpg',
    'https://api.cc94178.com/uploads/product/720272.jpg',
    'https://api.cc94178.com/uploads/product/720273.jpg',
    'https://api.cc94178.com/uploads/product/720274.jpg',
    'https://api.cc94178.com/uploads/product/720276.jpg',
  ])

  const description = computed(() => `❌超市一盒賣您320元
🦐澄品凍漲價：一盒220元

😊重量:850克

😃規格:60/70
🔥🔥白蝦優惠一檔‼️

#這裡貿易商直出～保證甜～保證鮮～

重量850克

產地：馬來西亞🇳🇮

🌈一盒的份量很給力💪約有60_70隻！
✔️現撈 ✔️急速冷凍~每隻彈牙脆口，大海新鮮滋味絕不能錯過!新鮮白蝦，蝦肉彈牙爽口，細緻甘甜，吃得到鮮度與肉的Q彈~頂級品質才有的海鮮享受！簡單川燙 最能吃到白蝦鮮甜，或是川燙冰鎮後 夏季最清爽的海鮮料理~
💖燒酒蝦/胡椒蝦/川燙/鹽烤/快炒/都很美味喔⋯⋯
🦐🦐🦐🦐🦐🦐🦐`.replace(/\n/g, "<br />"))

/**
 * storeUtils
 */
  const storeUtils = useStoreUtils()
  storeUtils.setLoading(true)

  onMounted(() => {
    storeUtils.setLoading(false)
  })

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

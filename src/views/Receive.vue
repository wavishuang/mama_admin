<template>
  <div v-loading="loading" class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center text-xl">
        團媽系統
      </div>

      <div class="mt-4">
        登入中....
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * imports
 */
  import { ref, onMounted } from "vue"
  import { useRoute, useRouter } from "vue-router"

  import axios from 'axios'
  import Qs from 'qs'
  import jwtDecode from 'jwt-decode'

  const router = useRouter()
  const route = useRoute()

  const loading = ref(true)

  const channelID = router.currentRoute.value.meta.channelID
  const channelSecret = router.currentRoute.value.meta.channelSecret
  const redirectUrl = router.currentRoute.value.meta.redirectUrl

/**
 * onMounted
 */
  onMounted(() => {
    if(!route.query || !route.query.code) router.push('/')

    const options = Qs.stringify({ // POST的參數  用Qs是要轉成form-urlencoded 因為LINE不吃JSON格式
      grant_type: 'authorization_code',
      code: route.query.code,
      redirect_uri: redirectUrl,
      client_id: channelID,
      client_secret: channelSecret
    })

    axios.post('https://api.line.me/oauth2/v2.1/token', options, { 
      headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(res => {
      const tokenResult = res.data // 回傳的結果
      console.log(tokenResult)
      const idTokenDecode = jwtDecode(res.data.id_token) // 把結果的id_token做解析
      console.log(idTokenDecode)
      if(idTokenDecode && idTokenDecode.name) {
        const loginInfo = {
          access_token: tokenResult.access_token,
          refresh_token: tokenResult.refresh_token,
          name: idTokenDecode.name,
          picture: idTokenDecode.picture,
          exp: idTokenDecode.exp,
          sub: idTokenDecode.sub
        }

        localStorage.user = JSON.stringify(loginInfo)
        // console.log(localStorage.user)
        loading.value = false
        router.push('/product_list')
      } else {
        router.push('/')
      }
    })
  })
</script>


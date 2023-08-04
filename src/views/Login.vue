<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center text-xl">
        團媽系統
      </div>

      <form class="mt-4" @submit.prevent="login">
        <!-- <label class="block">
          <span class="text-sm text-gray-700">手機號碼</span>
          <input
            type="tel"
            class="
              block
              w-full
              mt-1
              p-2
              border
              border-gray-200
              rounded-md
              focus:border-indigo-600
              focus:ring
              focus:ring-opacity-40
              focus:ring-indigo-500
            "
            placeholder="請輸入手機號碼"
            v-model="phone"
          />
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">密碼</span>
          <input
            type="password"
            class="
              block
              w-full
              mt-1
              p-2
              border
              border-gray-200
              rounded-md
              focus:border-indigo-600
              focus:ring
              focus:ring-opacity-40
              focus:ring-indigo-500
            "
            placeholder="請輸入密碼"
            v-model="password"
          />
        </label>
        -->

        <label class="flex flex-col items-center mt-3 mx-auto">
          <span class="text-sm text-gray-700">使用 Line 登入</span>
          <button type="button" class="block mt-1 my-auto" @click="login">
            <img src="@/assets/btn_login_base.png" />
          </button>
        </label>

        <!-- <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="
                  text-indigo-600
                  border-gray-200
                  rounded-md
                  focus:border-indigo-600
                  focus:ring
                  focus:ring-opacity-40
                  focus:ring-indigo-500
                "
              />
              <span class="mx-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div>
            <a
              class="block text-sm text-indigo-700 fontme hover:underline"
              href="#"
              >Forgot your password?</a
            >
          </div>
        </div> -->

        <!-- <div class="mt-6">
          <button
            type="submit"
            class="
              w-full
              px-4
              py-2
              text-sm text-center text-white
              bg-blue-400
              rounded-md
              focus:outline-none
              hover:bg-blue-600
            "
          >
            登入
          </button>
        </div> -->
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

// if(localStorage.user && localStorage.user.name) {
//   router.push("/dashboard")
// } 

const login = () => {
  let URL = 'https://access.line.me/oauth2/v2.1/authorize?'
  // 必填
      URL += 'response_type=code' // 希望LINE回應什麼  但是目前只有code能選
      URL += `&client_id=${router.currentRoute.value.meta.channelID}` // 你的頻道ID
      URL += `&redirect_uri=${router.currentRoute.value.meta.redirectUrl}` // 要接收回傳訊息的網址
      URL += '&state=123456789' // 用來防止跨站請求的 之後回傳會傳回來給你驗證 通常設亂數 這邊就先放123456789
      URL += '&scope=openid%20profile' // 跟使用者要求的權限 目前就三個能選 openid profile email
      // 選填
      // URL += '&nonce=helloWorld' // 順便將機器人也加好友
      URL += '&prompt=consent'
      URL += '&max_age=3600'
      URL += '&ui_locales=zh-TW'
      URL += '&bot_prompt=normal'
      window.open(URL, '_self') // 轉跳到該網址
}
</script>


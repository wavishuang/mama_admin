import axios from 'axios'
import { useRouter } from 'vue-router'
import { VUE_APP_LINE_CHANNEL_ID, VUE_APP_LINE_REDIRECT_URL } from '@/config/line.js'
import { useStoreUser } from '@/stores/storeUser.js'

export function useLineLogin() {
  
  const handleLogin = () => {
    const responseType = 'code' // 固定
    const state = 123456789 // 防止跨站請求，要放不是ＵＲＬ編碼的亂數
    const scope = 'openid%20profile'  // 要求權限的範圍，目前有profile, openid, email
    // const nonce = 'helloWorld'  // 防止重複攻擊，會回傳值到 IDtoken 解析後的內容
    const prompt = 'consent'  // 設定為 consent 後，每次登入都會要你同意權限
    const maxAge = 864000 // 登入有效時間（單位：秒），會反應在 IDtoken 解析後的內容 864000(1天)
    const uiLocales = 'zh-TW' // 語系
    const botPrompt = 'normal'

    const URL = `https://access.line.me/oauth2/v2.1/authorize?response_type=${responseType}&client_id=${VUE_APP_LINE_CHANNEL_ID}&redirect_uri=${VUE_APP_LINE_REDIRECT_URL}&state=${state}&scope=${scope}&prompt=${prompt}&max_age=${maxAge}&ui_locales=${uiLocales}&bot_prompt=${botPrompt}`
    window.open(URL, '_self') // 轉跳到該網址

    // &nonce=${nonce}\
    //  必填
    //     URL += 'response_type=code' // 希望LINE回應什麼  但是目前只有code能選
    //     URL += &client_id='VUE_APP_LINE_CHANNEL_ID' // 你的頻道ID
    //     URL += &redirect_uri='VUE_APP_LINE_REDIRECT_URL' // 要接收回傳訊息的網址
    //     URL += '&state=123456789' // 用來防止跨站請求的 之後回傳會傳回來給你驗證 通常設亂數 這邊就先放123456789
    //     URL += '&scope=openid%20profile' // 跟使用者要求的權限 目前就三個能選 openid profile email
    //  選填
    //     URL += '&nonce=helloWorld' // 順便將機器人也加好友
    //     URL += '&prompt=consent'
    //     URL += '&max_age=2952000'
    //     URL += '&ui_locales=zh-TW'
    //     URL += '&bot_prompt=normal'
    // window.open(URL, '_self') // 轉跳到該網址
  }

  const router = useRouter()

  const storeUser = useStoreUser()

  const verifyLogin = async (user, routerPath) => {
    axios.get(`https://api.line.me/oauth2/v2.1/verify?access_token=${user.access_token}`).then(res => {
      if(res.data && res.data.client_id && res.data.client_id == VUE_APP_LINE_CHANNEL_ID && res.data.expires_in > 0) {
        storeUser.user = {...JSON.parse(localStorage.user)}
        router.push(routerPath)
      }
    }).catch(() => {
      localStorage.removeItem('user')
    })
  }

  return {
    verifyLogin,
    handleLogin
  }
}
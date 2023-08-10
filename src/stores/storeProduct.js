import { defineStore } from 'pinia'
import axios from 'axios'

const baseURL = 'https://www.api.cc94178.com'

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = false
axios.defaults.headers = {
  'Content-Type': 'multipart/form-data'
}

axios.interceptors.request.use(config => {
  return config
})
axios.interceptors.response.use(res => {
  return res
}, err => {
  throw err.response || err
})

// const baseURL = sessionStorage.WEB_URL + 'api'
// axios.defaults.baseURL = baseURL

// axios.interceptors.request.use(config => {
//   if (localStorage.tuku && !has(config, 'headers.Authorization')) {
//     set(config, 'headers.Authorization', 'Bearer ' + localStorage.tuku)
//   }
//   return config
// })
// axios.interceptors.response.use(res => {
//   return res.data
// }, err => {
//   console.log(err)
//   // if (err.response && err.response.status >= 400 && err.response.status < 404) {
//   //   syshooks.next({channel: 'http.error', status: err.response.status})
//   //   throw err.response || err
//   // } else  {
//   //   syshooks.next({channel: 'network.error', status:'404'})
//   //   return Promise.reject(err);
//   // }
//   // if (err.response && err.response.status >= 400) {
//   //   syshooks.next({channel: 'http.error', status: err.response.status})
//   // }
//   throw err.response || err
// })

export const useStoreProduct = defineStore('storeProduct', {
  state: () => {
    return {
      productList: []
    }
  },
  getters: {},
  actions: {
    async getAllProduct(form) {
      return axios.post('/Demo/get_all_product', form).then(res => {
        if(res && res.data && res.data.result) {
          this.productList = [...res.data.result]
        }
        return res.data;
      })
    },
    async addProduct(form) {
      console.log(form)
      return axios.post('/Demo/add_product', form).then(res => {
        console.log(res)
        return res
      })
    },
  //   init() {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         this.user.id = user.uid
  //         this.user.email = user.email
  //         this.router.push('/')
  //       } else {
  //         this.user = {}
  //         this.router.replace('/auth')
  //       }
  //     })
  //   },
  //   registerUser(credentials) {
  //     createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
  //       const user = userCredential.user
  //     }).catch((error) => {
  //       console.log('error.message:', error.message)
  //     })
  //   },
  //   loginUser(credentials) {
  //     console.log('User logged in', credentials)
  //     signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
  //       const user = userCredential.user
  //       console.log('user:', user)
  //     }).catch((error) => {
  //       console.log('error.message:', error.message)
  //     })
  //   },
  //   logoutUser() {
  //     console.log('logout User')
  //     signOut(auth).then(() => {
  //       console.log('User signed out')
  //     }).catch((error) => {
  //       console.log('error.message:', error.message)
  //     })
  //   }
  },
})
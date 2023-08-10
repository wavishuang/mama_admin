import { defineStore } from 'pinia'
import axios from 'axios'
import { utils } from '@/utils'

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

export const useStoreUser = defineStore('storeUser', {
  state: () => ({
    user: {}
  }),
  getters: {},
  actions: {
    isLogin() {
      if(localStorage.user && !utils.isEmpty(localStorage.user)) {
        this.user = {...JSON.parse(localStorage.user)}
        return true
      }

      return false 
    },
    logout() {
      localStorage.removeItem('user')
      this.router.push('/')
    },
    async getUserId(form) {
      console.log('get user id')
      return axios.post('/Demo/get_user_id', form).then(res => {
        console.log(res)
        return {
          'uid': 1
        }
      })
      // return axios.post('/Demo/get_user_id', form, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }.then(res => {
      //   console.log(res)
      // }))
    }
    // initUser(form) {
    //   console.log('hello 2')
    //   return {'user': 'jeff'}

    //   // return axios.post('/Demo/get_user_id', form).then(res => {
    //   //   // if(res && res.data)
        
    //   //   return res.data;
    //   // })
    //   // return axios.post('/Demo/hello_world').then(res => {
    //   //   console.log(res)
    //   // })
    // },
    // async addProduct(form) {
    //   console.log(form)
    //   return axios.post('/Demo/add_product',form
    //   , {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    //   ).then(res => {
    //     console.log(res)
    //     return res
    //   })
    // },
  // //   init() {
  // //     onAuthStateChanged(auth, (user) => {
  // //       if (user) {
  // //         this.user.id = user.uid
  // //         this.user.email = user.email
  // //         this.router.push('/')
  // //       } else {
  // //         this.user = {}
  // //         this.router.replace('/auth')
  // //       }
  // //     })
  // //   },
  // //   registerUser(credentials) {
  // //     createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
  // //       const user = userCredential.user
  // //     }).catch((error) => {
  // //       console.log('error.message:', error.message)
  // //     })
  // //   },
  // //   loginUser(credentials) {
  // //     console.log('User logged in', credentials)
  // //     signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
  // //       const user = userCredential.user
  // //       console.log('user:', user)
  // //     }).catch((error) => {
  // //       console.log('error.message:', error.message)
  // //     })
  // //   },
  // //   logoutUser() {
  // //     console.log('logout User')
  // //     signOut(auth).then(() => {
  // //       console.log('User signed out')
  // //     }).catch((error) => {
  // //       console.log('error.message:', error.message)
  // //     })
  // //   }
  },
})
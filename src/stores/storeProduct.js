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

export const useStoreProduct = defineStore('storeProduct', {
  state: () => {
    return {
      all: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      info: {},
    }
  },
  getters: {
    allLength() {
      return this.all.length
    }
  },
  actions: {
    // 取得所有商品
    async getAllProduct(form) {
      return axios.post('/Demo/get_all_product', form).then(res => {
        if(res && res.data && !utils.isEmpty(res.data.result)) {
          this.all = [...res.data.result.lists]
          this.total = res.data.result.total
          this.pageSize = parseInt(res.data.result.pageSize)
          this.currentPage = parseInt(res.data.result.currentPage)
        }
        return res.data
      })
    },
    // 取得團購中的商品 
    async getProcessingProduct(form) {
      return axios.post('/Demo/get_processing_product', form).then(res => {
        if(res && res.data && !utils.isEmpty(res.data.result)) {
          this.all = [...res.data.result.lists]
          this.total = res.data.result.total
          this.pageSize = parseInt(res.data.result.pageSize)
          this.currentPage = parseInt(res.data.result.currentPage)
        }
        return res.data
      })
    },
    // 取得已結單的商品 
    async getCutOffProduct(form) {
      return axios.post('/Demo/get_cut_off_product', form).then(res => {
        if(res && res.data && !utils.isEmpty(res.data.result)) {
          this.all = [...res.data.result.lists]
          this.total = res.data.result.total
          this.pageSize = parseInt(res.data.result.pageSize)
          this.currentPage = parseInt(res.data.result.currentPage)
        }
        return res.data
      })
    },
    // 取得已下架的商品 
    async getOfflineProduct(form) {
      return axios.post('/Demo/get_offline_product', form).then(res => {
        if(res && res.data && !utils.isEmpty(res.data.result)) {
          this.all = [...res.data.result.lists]
          this.total = res.data.result.total
          this.pageSize = parseInt(res.data.result.pageSize)
          this.currentPage = parseInt(res.data.result.currentPage)
        }
        return res.data
      })
    },
    // 刪除商品
    async deleteProduct(form) {
      return axios.post('/Demo/delete_product', form).then(res => {
        // console.log(res)
        if(res && res.data && res.data.code === '0000') {
          this.all = this.all.filter(item => item.pid != res.data.result.pid)
        }
        return res.data
      })
    },
    // 商品上/下架
    async setProductState(form) {
      return axios.post('/Demo/online_offline_product', form).then(res => {
        console.log(res)
        if(res && res.data && res.data.code === '0000') {
          const index = this.all.findIndex(item => item.pid == res.data.result.pid)
          this.all[index].online = parseInt(res.data.result.state)
        }
        return res.data
      })
    },
    // 新增商品
    async addProduct(form) {
      // console.log(form)
      return axios.post('/Demo/add_product', form).then(res => {
        // console.log(res)
        return res
      })
    },
    // 結單
    async cutOffProduct(form) {
      return axios.post('/Demo/cut_off_product', form).then(res => {
        console.log('cut_off_product:', res)
        if(res && res.data && res.data.code === '0000') {
          console.log('cut off product success')
          const index = this.all.findIndex(item => item.pid == res.data.result.pid)
          this.all[index].is_cut_off = 1
        }
        return res
      })
    },
    /**
     * Web
     */
    async getProductDetail(form) {
      return axios.post('/Demo/get_product_detail', form).then(res => {
        console.log('get_product_detail:', res)
        if(res && res.data && res.data.code === '0000' && res.data.result.length > 0) {
          console.log('get_product_detail success', res.data.result[0])
          this.info = {...res.data.result[0]}
        }
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
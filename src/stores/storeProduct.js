import { defineStore } from 'pinia'
import axios from 'axios'

const baseURL = 'https://www.api.cc94178.com'

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = false
// axios.defaults.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded'
// }

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

export const useStoreProduct = defineStore('storeAuth', {
  state: () => {
    return {
      productList: {}
    }
  },
  actions: {
    getAllProduct() {
      console.log('hello 2')
      return axios.post('/Demo/hello_world').then(res => {
        console.log(res)
      })
    },
    async setProduct(form) {
      console.log(form)
      return axios.post('/Demo/set_product',form
      , {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      ).then(res => {
        console.log(res)
        return res
      })

      // return new Promise((resolve, reject) => {
      //   axios.post('/Demo/hello_world')
      //     .then(res => {
      //       if (res.code === "0000") {
      //         // 更新数据
      //         const userBalance = Object.assign({}, res.result);
      //         dispatch({
      //           type: this.NPF_BALANCE_COLLECT,
      //           data: userBalance
      //         });
      //         // updateUser(dispatch, balanceData, "login");
      //         // dispatch(request.reqSaveUser(balanceData, true, null, null));
      //         // helperAuth.save(accountInfo);
      //       }
      //       return resolve(res);
      //     }).catch(err => reject(err));
      // });
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
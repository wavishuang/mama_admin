// npm config set tid 'uat'
const tenant = {
  'dev': {
    url: '/'
  },
  'sit': {
    url: 'https://www.api.cc94178.com/'
  },
  'uat': {  // 測試機
    url: "/",
  },
  'prod': {  // 正式機
    url: "https://www.api.cc94178.com/",
  },
}

module.exports = {
  getWebUrl: function (tid) {
    return tenant[tid].url
  }
}

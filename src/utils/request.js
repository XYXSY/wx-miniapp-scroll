import axios from 'axios'
import { MessageBox } from 'element-ui'
import { message } from '@/utils/reset-message' // reset message
import store from '@/store'
import { getToken } from '@/utils/auth'
const defaultSettings = require('@/settings.js')
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: defaultSettings.baseURL,
  timeout: 35000
})
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    let { url } = response.config;
    const res = response.data
    res.code=Number(res.code)
    if (res.code !== 200 ) {
      if (res.code === 50008 || res.code === 50012 || res.code === 50014 || res.code == 101) {
        // message({
        //   message: '您的登录信息已过期，请重新登录',
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        MessageBox.confirm('您的登录信息已过期，请重新登录', '退出登录', {
          confirmButtonText: '确认',
          showCancelButton:false,
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        }).catch(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else if (res.gt) {
        return res
      } else if (res.code == 408) {
        return res
      } else {
        message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(res.msg || 'Error')
    } else {
      return res
    }
  },
  error => {
    message({
      message: error.msg || '系统错误',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export function get(url, params) {
  if(!params){
    params={}
  }
  params.t=new Date().getTime()
  return new Promise((resolve, reject) => {
    service({
      method: 'get',
      url,
      params
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err)
      })
  });
}

export function post(url, params, dataType = 'json', from = '0') {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url,
      data: params,
      dataType: dataType,
      headers: {
        'Content-Type': from == '1' ? 'multipart/form-data;boundary = ' + new Date().getTime() : 'application/json;charset=UTF-8',
      },
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err)
      })
  });
}
export function upload(url, params, dataType = 'json', from = '0') {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url,
      data: params,
      dataType: dataType,
      headers: {
        'Content-Type': 'application/octet-stream'
      },
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err)
      })
  });
}
export default service

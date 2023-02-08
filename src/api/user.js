import request from '@/utils/request'
import {get,post} from '@/utils/request';


export function login(params) {
  // console.log(" login data:",params)
  let formData = new FormData();
  for (const item of Object.keys(params)) {
      formData.append(item, params[item])
  }
  return post('/sys/gtValidate',formData,'json',1)
  // return request({
  //   url: '/sys/gtValidate',
  //   method: 'get',
  //   params
  // })
}

export function getInfo(token) {
  return get('/sellticket/user/info')
  // return request({
  //   url: '/sellticket/user/info',
  //   method: 'get',
  // })
}

export function logout() {
  return get('/sys/logout')
  // return request({
  //   url: '/sys/logout',
  //   method: 'get'
  // })
}

export function getAuthMenu() {
  return get('/sellticket/user/getIndexInfo')
  // return request({
  //   url: '/sellticket/user/getIndexInfo',
  //   method: 'get'
  // })
}

/**
 * 获取支付信息
 * @returns {*}
 */
export function getPayType() {
  return get('/sellticket/order/queryPayType')
  // return request({
  //   url: '/sellticket/order/queryPayType',
  //   method: 'get'
  // })
}

/**
 * 获取售票员列表
 * @returns {*}
 */
export function getConductor() {
  return get('/sellticket/order/querySaleman')
  // return request({
  //   url: '/sellticket/order/querySaleman',
  //   method: 'get'
  // })
}

/**
 * TransactionQuery 交易查询
 */
export function TransactionQuery(data) {
  return request({
    url: '/sellticket/order/query',
    method: 'post',
    data,
  })
}


/**
 * getBarCode 交易查询
 */
export function getBarCode(params) {
  // console.log("getBarCode 入参", params)
  return get('/sellticket/order/queryBarCode',params)

  // return request({
  //   url: '/sellticket/order/queryBarCode',
  //   method: 'get',
  //   params
  // })
}

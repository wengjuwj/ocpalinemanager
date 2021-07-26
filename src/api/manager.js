import request from '@/utils/request'

export function getLiveList(query) {
  return request({
    url: '/live/liveList',
    method: 'get',
    params: query
  })
}
export function createLive(data){
  return request({
    url:'/live/liveList/create',
    method: 'post',
    data
  })
}
export function updateLive(data) {
  return request({
    url: '/live/liveList/update',
    method: 'post',
    data
  })
}

export function getClassificationList(query) {
  return request({
    url: '/classification/list',
    method: 'get',
    params: query
  })
}
export function createClassification(data){
  return request({
    url:'/classification/list/create',
    method: 'post',
    data
  })
}
export function updateClassification(data) {
  return request({
    url: '/classification/list/update',
    method: 'post',
    data
  })
}

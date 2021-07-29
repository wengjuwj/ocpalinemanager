import request from '@/utils/request'

// 获取直播间列表
export function getLiveList(query) {
  return request({
    url: '/live/liveList',
    method: 'get',
    params: query
  })
}
// 创建直播间
export function createLive(data){
  return request({
    url:'/live/liveList/create',
    method: 'post',
    data
  })
}
// 编辑直播间
export function updateLive(data) {
  return request({
    url: '/live/liveList/update',
    method: 'post',
    data
  })
}
// 获取分类列表
export function getClassificationList(query) {
  return request({
    url: '/classification/list',
    method: 'get',
    params: query
  })
}
// 创建分类
export function createClassification(data){
  return request({
    url:'/classification/list/create',
    method: 'post',
    data
  })
}
// 编辑分类
export function updateClassification(data) {
  return request({
    url: '/classification/list/update',
    method: 'post',
    data
  })
}
// 获取点赞机器人列表
export function getThumbsList(query) {
  return request({
    url: '/thumbs/list',
    method: 'get',
    params: query
  })
}
// 创建点赞机器人
export function createThumbs(data){
  return request({
    url:'/thumbs/list/create',
    method: 'post',
    data
  })
}
// 编辑点赞机器人
export function updateThumbs(data) {
  return request({
    url: '/thumbs/list/update',
    method: 'post',
    data
  })
}
// 获取评论机器人列表
export function getCommentRobotsList(query) {
  return request({
    url: '/commentrobots/list',
    method: 'get',
    params: query
  })
}
// 创建评论机器人
export function createCommentRobots(data){
  return request({
    url:'/commentrobots/list/create',
    method: 'post',
    data
  })
}
// 编辑评论机器人
export function updateCommentRobots(data) {
  return request({
    url: '/commentrobots/list/update',
    method: 'post',
    data
  })
}
// 获取机器人组合列表
export function getRobotGroupList(query) {
  return request({
    url: '/robotgroup/list',
    method: 'get',
    params: query
  })
}
// 创建评论机器人
export function createRobotGroup(data){
  return request({
    url:'/robotgroup/list/create',
    method: 'post',
    data
  })
}
// 编辑评论机器人
export function updateRobotGroup(data) {
  return request({
    url: '/robotgroup/list/update',
    method: 'post',
    data
  })
}


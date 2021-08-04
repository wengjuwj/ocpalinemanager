import request from '@/utils/request'

export function getMapData(query) {
  return request({
    url: '/live/mapdata',
    method: 'get',
    params: query
  })
}
export function getLineData(query) {
  return request({
    url: '/live/linedata',
    method: 'get',
    params: query
  })
}


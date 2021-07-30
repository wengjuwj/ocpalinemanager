const Mock=require('mockjs')

const mapData=[
  {
      id:'1',
      data:[
        {"name":"南海诸岛","value":8},
        {"name": "北京", "value": 0},
        {"name": "天津", "value": 0},
        {"name": "上海", "value": 30},
        {"name": "重庆", "value": 0},
        {"name": "河北", "value": 0},
        {"name": "河南", "value": 30},
        {"name": "云南", "value": 0},
        {"name": "辽宁", "value": 0},
        {"name": "黑龙江", "value": 0},
        {"name": "湖南", "value": 0},
        {"name": "安徽", "value": 0},
        {"name": "山东", "value": 0},
        {"name": "新疆", "value": 62},
        {"name": "江苏", "value": 0},
        {"name": "浙江", "value": 0},
        {"name": "江西", "value": 0},
        {"name": "湖北", "value": 0},
        {"name": "广西", "value": 0},
        {"name": "甘肃", "value": 0},
        {"name": "山西", "value": 4},
        {"name": "内蒙古", "value": 0},
        {"name": "陕西", "value": 0},
        {"name": "吉林", "value": 60},
        {"name": "福建", "value": 0},
        {"name": "贵州", "value": 0},
        {"name": "广东", "value": 0},
        {"name": "青海", "value": 8},
        {"name": "西藏", "value": 0},
        {"name": "四川", "value": 45},
        {"name": "宁夏", "value": 0},
        {"name": "海南", "value": 0},
        {"name": "台湾", "value": 8},
        {"name": "香港", "value": 0},
        {"name": "澳门", "value": 0}
    ]
  },
  {
      id:'2',
      data:[
        {"name":"南海诸岛","value":8},
        {"name": "北京", "value": 22},
        {"name": "天津", "value": 0},
        {"name": "上海", "value": 30},
        {"name": "重庆", "value":8},
        {"name": "河北", "value": 0},
        {"name": "河南", "value": 30},
        {"name": "云南", "value": 0},
        {"name": "辽宁", "value":9},
        {"name": "黑龙江", "value": 0},
        {"name": "湖南", "value": 8},
        {"name": "安徽", "value": 0},
        {"name": "山东", "value": 52},
        {"name": "新疆", "value": 0},
        {"name": "江苏", "value": 0},
        {"name": "浙江", "value": 16},
        {"name": "江西", "value": 0},
        {"name": "湖北", "value": 0},
        {"name": "广西", "value": 3},
        {"name": "甘肃", "value": 0},
        {"name": "山西", "value": 4},
        {"name": "内蒙古", "value": 62},
        {"name": "陕西", "value": 0},
        {"name": "吉林", "value": 60},
        {"name": "福建", "value": 0},
        {"name": "贵州", "value": 33},
        {"name": "广东", "value": 0},
        {"name": "青海", "value": 8},
        {"name": "西藏", "value": 0},
        {"name": "四川", "value": 45},
        {"name": "宁夏", "value": 0},
        {"name": "海南", "value": 0},
        {"name": "台湾", "value": 8},
        {"name": "香港", "value": 0},
        {"name": "澳门", "value": 34}
    ]
  },
];
  module.exports = [
    {
      url: '/live/mapdata',
      type: 'get',
      response: config => {
        const {id} = config.query
        let mockList = mapData.filter(item => {
          if (id && item.id !== id) return false
          return true
        })
        return {
          code: 200,
          data: {
            data:mockList.length!=0?mockList[0].data:[]
          }
        }
      }
    },
  ]
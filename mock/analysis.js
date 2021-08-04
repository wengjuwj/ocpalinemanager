const Mock=require('mockjs')

const mapData=[
  {
      id:'1',
      data:[{
        "name": "南海诸岛",
        "value": 8,
        "code": 1,
        "set_value": 8
      }, {
        "name": "北京",
        "value": 0,
        "code": 2,
        "set_value": 0
      }, {
        "name": "天津",
        "value": 0,
        "code": 3,
        "set_value": 0
      }, {
        "name": "上海",
        "value": 30,
        "code": 4,
        "set_value": 30
      }, {
        "name": "重庆",
        "value": 0,
        "code": 5,
        "set_value": 0
      }, {
        "name": "河北",
        "value": 0,
        "code": 6,
        "set_value": 0
      }, {
        "name": "河南",
        "value": 30,
        "code": 7,
        "set_value": 30
      }, {
        "name": "云南",
        "value": 0,
        "code": 8,
        "set_value": 0
      }, {
        "name": "辽宁",
        "value": 0,
        "code": 9,
        "set_value": 0
      }, {
        "name": "黑龙江",
        "value": 0,
        "code": 10,
        "set_value": 0
      }, {
        "name": "湖南",
        "value": 0,
        "code": 11,
        "set_value": 0
      }, {
        "name": "安徽",
        "value": 0,
        "code": 12,
        "set_value": 0
      }, {
        "name": "山东",
        "value": 0,
        "code": 13,
        "set_value": 0
      }, {
        "name": "新疆",
        "value": 62,
        "code": 14,
        "set_value": 62
      }, {
        "name": "江苏",
        "value": 0,
        "code": 15,
        "set_value": 0
      }, {
        "name": "浙江",
        "value": 0,
        "code": 16,
        "set_value": 0
      }, {
        "name": "江西",
        "value": 0,
        "code": 17,
        "set_value": 0
      }, {
        "name": "湖北",
        "value": 0,
        "code": 18,
        "set_value": 0
      }, {
        "name": "广西",
        "value": 0,
        "code": 19,
        "set_value": 0
      }, {
        "name": "甘肃",
        "value": 0,
        "code": 20,
        "set_value": 0
      }, {
        "name": "山西",
        "value": 4,
        "code": 21,
        "set_value": 4
      }, {
        "name": "内蒙古",
        "value": 0,
        "code": 22,
        "set_value": 0
      }, {
        "name": "陕西",
        "value": 0,
        "code": 23,
        "set_value": 0
      }, {
        "name": "吉林",
        "value": 60,
        "code": 24,
        "set_value": 60
      }, {
        "name": "福建",
        "value": 0,
        "code": 25,
        "set_value": 0
      }, {
        "name": "贵州",
        "value": 0,
        "code": 26,
        "set_value": 0
      }, {
        "name": "广东",
        "value": 0,
        "code": 27,
        "set_value": 0
      }, {
        "name": "青海",
        "value": 8,
        "code": 28,
        "set_value": 8
      }, {
        "name": "西藏",
        "value": 0,
        "code": 29,
        "set_value": 0
      }, {
        "name": "四川",
        "value": 45,
        "code": 30,
        "set_value": 45
      }, {
        "name": "宁夏",
        "value": 0,
        "code": 31,
        "set_value": 0
      }, {
        "name": "海南",
        "value": 0,
        "code": 32,
        "set_value": 0
      }, {
        "name": "台湾",
        "value": 8,
        "code": 33,
        "set_value": 8
      }, {
        "name": "香港",
        "value": 0,
        "code": 34,
        "set_value": 0
      }, {
        "name": "澳门",
        "value": 0,
        "code": 35,
        "set_value": 0
      }]
  },
  {
      id:'2',
      data:[{
        "name": "南海诸岛",
        "value": 8,
        "code": 1,
        "set_value": 8
      }, {
        "name": "北京",
        "value": 22,
        "code": 2,
        "set_value": 22
      }, {
        "name": "天津",
        "value": 0,
        "code": 3,
        "set_value": 0
      }, {
        "name": "上海",
        "value": 30,
        "code": 4,
        "set_value": 30
      }, {
        "name": "重庆",
        "value": 8,
        "code": 5,
        "set_value": 8
      }, {
        "name": "河北",
        "value": 0,
        "code": 6,
        "set_value": 0
      }, {
        "name": "河南",
        "value": 30,
        "code": 7,
        "set_value": 30
      }, {
        "name": "云南",
        "value": 0,
        "code": 8,
        "set_value": 0
      }, {
        "name": "辽宁",
        "value": 9,
        "code": 9,
        "set_value": 9
      }, {
        "name": "黑龙江",
        "value": 0,
        "code": 10,
        "set_value": 0
      }, {
        "name": "湖南",
        "value": 8,
        "code": 11,
        "set_value": 8
      }, {
        "name": "安徽",
        "value": 0,
        "code": 12,
        "set_value": 0
      }, {
        "name": "山东",
        "value": 52,
        "code": 13,
        "set_value": 52
      }, {
        "name": "新疆",
        "value": 0,
        "code": 14,
        "set_value": 0
      }, {
        "name": "江苏",
        "value": 0,
        "code": 15,
        "set_value": 0
      }, {
        "name": "浙江",
        "value": 16,
        "code": 16,
        "set_value": 16
      }, {
        "name": "江西",
        "value": 0,
        "code": 17,
        "set_value": 0
      }, {
        "name": "湖北",
        "value": 0,
        "code": 18,
        "set_value": 0
      }, {
        "name": "广西",
        "value": 3,
        "code": 19,
        "set_value": 3
      }, {
        "name": "甘肃",
        "value": 0,
        "code": 20,
        "set_value": 0
      }, {
        "name": "山西",
        "value": 4,
        "code": 21,
        "set_value": 4
      }, {
        "name": "内蒙古",
        "value": 62,
        "code": 22,
        "set_value": 62
      }, {
        "name": "陕西",
        "value": 0,
        "code": 23,
        "set_value": 0
      }, {
        "name": "吉林",
        "value": 60,
        "code": 24,
        "set_value": 60
      }, {
        "name": "福建",
        "value": 0,
        "code": 25,
        "set_value": 0
      }, {
        "name": "贵州",
        "value": 33,
        "code": 26,
        "set_value": 33
      }, {
        "name": "广东",
        "value": 0,
        "code": 27,
        "set_value": 0
      }, {
        "name": "青海",
        "value": 8,
        "code": 28,
        "set_value": 8
      }, {
        "name": "西藏",
        "value": 0,
        "code": 29,
        "set_value": 0
      }, {
        "name": "四川",
        "value": 45,
        "code": 30,
        "set_value": 45
      }, {
        "name": "宁夏",
        "value": 0,
        "code": 31,
        "set_value": 0
      }, {
        "name": "海南",
        "value": 0,
        "code": 32,
        "set_value": 0
      }, {
        "name": "台湾",
        "value": 8,
        "code": 33,
        "set_value": 8
      }, {
        "name": "香港",
        "value": 0,
        "code": 34,
        "set_value": 0
      }, {
        "name": "澳门",
        "value": 34,
        "code": 35,
        "set_value": 34
      }]
  },
];
const lineData={
  data:[["00:00",0],["00:30",1],["01:00",2],["01:30",3],["02:00",4],["02:30",5],["03:00",6],["03:30",7],["04:00",8],["04:30",9],["05:00",10],["05:30",11],["06:00",12],["06:30",13],["07:00",14],["07:30",15],["08:00",16],["08:30",17],["09:00",18],["09:30",19],["10:00",20],["10:30",21],["11:00",22],["11:30",23],["12:00",24],["12:30",25],["13:00",26],["13:30",27],["14:00",28],["14:30",29],["15:00",30],["15:30",31],["16:00",32],["16:30",33],["17:00",34],["17:30",35],["18:00",36],["18:30",37],["19:00",38],["19:30",39],["20:00",40],["20:30",41],["21:00",42],["21:30",43],["22:00",44],["22:30",45],["23:00",46],["23:30",47]],
  set_data:[["00:00",0],["00:30",1],["01:00",2],["01:30",3],["02:00",4],["02:30",5],["03:00",6],["03:30",7],["04:00",8],["04:30",9],["05:00",10],["05:30",11],["06:00",12],["06:30",13],["07:00",14],["07:30",15],["08:00",16],["08:30",17],["09:00",18],["09:30",19],["10:00",20],["10:30",21],["11:00",22],["11:30",23],["12:00",24],["12:30",25],["13:00",26],["13:30",27],["14:00",28],["14:30",29],["15:00",30],["15:30",31],["16:00",32],["16:30",33],["17:00",34],["17:30",35],["18:00",36],["18:30",37],["19:00",38],["19:30",39],["20:00",40],["20:30",41],["21:00",42],["21:30",43],["22:00",44],["22:30",45],["23:00",46],["23:30",47]]
}

/**
 * @param {string} step
 * @returns {Array}
 */
function timeSlot(step){
  var date = new Date()
  date.setHours(0)    // 时分秒设置从零点开始
  date.setSeconds(0)
  date.setUTCMinutes(0)
  // console.log(date.getHours())
  // console.log(date.getSeconds())
  // console.log(new Date(date.getTime()))
  
  var arr = [], timeArr = [];
  var slotNum = 24*60/step   // 算出多少个间隔
  for (var f = 0; f < slotNum; f++) {   //  stepM * f = 24H*60M
      // arr.push(new Date(Number(date.getTime()) + Number(step*60*1000*f)))   //  标准时间数组
      var time = new Date(Number(date.getTime()) + Number(step*60*1000*f))  // 获取：零点的时间 + 每次递增的时间
      var hour = '', sec = '';
      time.getHours() < 10 ? hour = '0' + time.getHours() : hour = time.getHours()  // 获取小时
      time.getMinutes() < 10 ? sec = '0' + time.getMinutes() : sec = time.getMinutes()   // 获取分钟
      timeArr.push(hour + ':' + sec)
  }
  return timeArr
}
  module.exports = [
    {
      url: '/live/mapdata',
      type: 'get',
      response: config => {
        const {id} = config.query;
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
    {
      url: '/live/linedata',
      type: 'get',
      response: config => {
        const {id} = config.query
        let mockArr=timeSlot(30);
        let mockList=[];
        mockArr.forEach((item,index)=>{
          let mockValue=Math.ceil(Math.random()*1000);
          let tempJson={
            time_slot:item,
            value:mockValue,
            set_value:mockValue
          }
          mockList.push(tempJson)
        });
        return {
          code: 200,
          data: {
            data:mockList
          }
        }
      }
    },
  ]
const Mock = require('mockjs')

const List=[]

const ClassificationList=[];

const count=100

for(let i=0;i<count;i++){
  List.push(
    Mock.mock(
      {
        id: i+1,
        timestamp: +Mock.Random.date('T'),
        name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
        url:"xxx.xxx.xxx",
        user_name:"主播"+(i+1),
        classification:"分类"+(i+1),
        status:"0",
        status_text:"未开始",
        visitors_num:900,
        visitors_multiple:2,
        comment_num:2000,
        telecase_time:"2021-08-10 18:00"
      }
    )
  )
}
for(let i=0;i<count;i++){
  ClassificationList.push(
    Mock.mock(
      {
        id: i+1,
        classification:mockLevel(i)==1?"1":"2",
        classification_text:mockLevel(i)==1?"分类一":"分类二",
        status:"1",
        status_text:"启用",
        description:(mockLevel(i)==1?"分类一":"分类二")+"的说明",
        classification_level:mockLevel(i)==1?"一级":"二级",
      }
    )
  )
}
module.exports = [
  {
    url: '/live/liveList',
    type: 'get',
    response: config => {
      const { name, user_name, classification,status, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (name && item.name !== +name) return false
        if (user_name && item.user_name !== user_name) return false
        if (classification && item.classification.indexOf(classification) < 0) return false
        if (status && item.status !== status) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          data: pageList
        }
      }
    }
  },
  {
    url: '/live/liveList/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/live/liveList/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/classification/list',
    type: 'get',
    response: config => {
      const { classification, status, classification_level, page = 1, limit = 20, sort } = config.query

      let mockList = ClassificationList.filter(item => {
        if (classification && item.classification !== +classification) return false
        if (status && item.status !== status) return false
        if (classification_level && item.classification_level.indexOf(classification_level) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          data: pageList
        }
      }
    }
  },
  {
    url: '/classification/list/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/classification/list/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
]

function mockLevel(index){
 let test=index%3==0?1:2;
 return test;
}
const Mock = require('mockjs')

const List=[]

const ClassificationList=[];

const thumbsList=[]

const commentrobotsList=[]

const robotgroupList=[]

const count=100

const liveArr=["慢性咳嗽与呼吸道感染诊治高峰论坛","上海麻醉医学发展专题片","智启梦想高校行大咖金句——王志萍教授","智启梦想高校行大咖金句——曾因明教授","智启梦想高校行大咖金句——董海龙教授"]

const commentArr=["讲的很好","受益匪浅","专业!!!","666!!!","很有帮助~"]
// mock直播列表
for(let i=0;i<count;i++){
  List.push(
    Mock.mock(
      {
        id: i+1,
        timestamp: +Mock.Random.date('T'),
        name:liveArr[getRandom()],
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
// mock分类列表
for(let i=0;i<count;i++){
  ClassificationList.push(
    Mock.mock(
      {
        id: i+1,
        classification:mockLevel(i)==1?("分类1"+i):("分类2"+i),
        parent_status:mockLevel(i)==1?"1":"0",
        description:(mockLevel(i)==1?"分类一":"分类二")+"的说明",
        parent:mockLevel(i)==1?"我是有上级分类":"",
      }
    )
  )
}
// mock 点赞机器人列表
for(let i=0;i<count;i++){
  thumbsList.push(
    Mock.mock(
      {
        id: i+1,
        name:mockLevel(i)==1?("点赞机器人1"+i):("点赞机器人2"+i),
        description:mockLevel(i)==1?("点赞机器人1"+i+"的描述"):("点赞机器人2"+i+"的描述"),
      }
    )
  )
}

// mock 评论机器人列表
for(let i=0;i<count;i++){
  commentrobotsList.push(
    Mock.mock(
      {
        id: i+1,
        name:mockLevel(i)==1?("评论机器人1"+i):("评论机器人2"+i),
        comment_text:commentArr[getRandom()],
        description:mockLevel(i)==1?("评论机器人1"+i+"的描述"):("评论机器人2"+i+"的描述"),
      }
    )
  )
}

// mock 机器人组合列表
for(let i=0;i<count;i++){
  robotgroupList.push(
    Mock.mock(
      {
        id: i+1,
        robots_group_name: 'fff',
        thumbs_group_name:[1,2],
        thumbs_space_time:20,
        thumbs_time_unit:1,
        comments_group_name:[1,2],
        comments_space_time:10,
        comments_time_unit:1,
        robots_group_description:'',
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
        if (name && item.name.indexOf(name) < 0) return false
        if (user_name && item.user_name !== user_name) return false
        if (classification && item.classification !== +classification) return false
        if (status && item.status !== status) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 200,
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
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/live/liveList/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
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
        code: 200,
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
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/classification/list/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/thumbs/list',
    type: 'get',
    response: config => {
      const { name, page = 1, limit = 20, sort } = config.query

      let mockList = thumbsList.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 200,
        data: {
          total: mockList.length,
          data: pageList
        }
      }
    }
  },
  {
    url: '/thumbs/list/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/thumbs/list/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/commentrobots/list',
    type: 'get',
    response: config => {
      const { name, page = 1, limit = 20, sort } = config.query

      let mockList = commentrobotsList.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 200,
        data: {
          total: mockList.length,
          data: pageList
        }
      }
    }
  },
  {
    url: '/commentrobots/list/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/commentrobots/list/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/robotgroup/list',
    type: 'get',
    response: config => {
      const { robots_group_name, page = 1, limit = 20, sort } = config.query

      let mockList = robotgroupList.filter(item => {
        if (robots_group_name && item.robots_group_name.indexOf(robots_group_name) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 200,
        data: {
          total: mockList.length,
          data: pageList
        }
      }
    }
  },
  {
    url: '/robotgroup/list/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/robotgroup/list/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
]

function mockLevel(index){
 let test=index%3==0?1:2;
 return test;
}
function getRandom(){
 
  let random=0;
  let temp=Math.random()*10;
  if(temp<5){
    random=parseInt(temp)
  }
  return random
}
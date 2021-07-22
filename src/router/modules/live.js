/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const liveRouter = {
  path: '/',
  component: Layout,
  redirect: '/live',
  name: 'live',
  meta: {
    title: '直播间管理',
    icon: ''
  },
  children: [
    {
      path: 'live',
      component: () => import('@/views/live-manager/addLive'),
      name: 'live',
      meta: { title: '新建直播间', icon: '' }
    },
    // {
    //   path: 'classification',
    //   component: () => import('@/views/live-manager/liveClassification'),
    //   name: 'liveClassification',
    //   meta: { title: '直播间分类', icon: '' }
    // },
    // {
    //   path: 'settingdata',
    //   component: () => import('@/views/live-manager/settingData'),
    //   name: 'settingdata',
    //   meta: { title: '访问量及倍数', icon: '' }
    // },
    {
      path: 'examine',
      component: () => import('@/views/live-manager/examine'),
      name: 'examine',
      meta: { title: '评论审核', icon: '' }
    },
    {
      path: 'settingcomment',
      component: () => import('@/views/live-manager/settingComment'),
      name: 'settingcomment',
      meta: { title: '系统配置', icon: '' }
    }
  ]
}

export default liveRouter

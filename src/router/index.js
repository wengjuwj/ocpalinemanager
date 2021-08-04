import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/livelist',
    name: 'livelist',
    meta: {
      title: '直播间管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'livelist',
        component: () => import('@/views/manager/live-manager/liveList'),
        name: 'livelist',
        meta: { title: '直播列表', icon: 'el-icon-s-unfold' },
      },
      {
        path: 'live',
        component: () => import('@/views/manager/live-manager/addLive'),
        name: 'live',
        meta: { title: '新建直播间', icon: 'el-icon-circle-plus-outline' },
        hidden:true
      },
      {
        path: 'comment',
        component: () => import('@/views/manager/audits-management/comment'),
        name: 'comment',
        meta: { title: '评论审核', icon: 'el-icon-s-operation' },
        hidden:true
      },
      {
        path: 'analysis',
        component: () => import('@/views/manager/data-analysis/index'),
        name: 'analysis',
        meta: { title: '数据分析', icon: 'el-icon-s-operation' },
        hidden:true
      },
    ]
  },
  {
    path: '/liveclassification',
    component: Layout,
    redirect: '/liveclassification',
    name: 'liveclassification',
    meta: {
      title: '直播间分类管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'liveclassification',
        component: () => import('@/views/manager/live-classfication-manager/liveClassification'),
        name: 'liveclassification',
        meta: { title: '分类管理', icon: 'el-icon-s-operation' }
      }
    ]
  },
  {
    path: '/systemconfig',
    component: Layout,
    redirect: '/systemconfig',
    name: 'systemconfig',
    meta: {
      title: '配置管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'thumbsconfig',
        component: () => import('@/views/manager/system-config/thumbsRobotConfig'),
        name: 'thumbsconfig',
        meta: { title: '点赞机器人配置', icon: 'el-icon-s-operation' }
      },
      {
        path: 'commentconfig',
        component: () => import('@/views/manager/system-config/commentRobotConfig'),
        name: 'commentconfig',
        meta: { title: '评论机器人配置', icon: 'el-icon-s-operation' }
      },
      {
        path: 'complexconfig',
        component: () => import('@/views/manager/system-config/complexConfig'),
        name: 'complexconfig',
        meta: { title: '组合配置', icon: 'el-icon-s-operation' }
      },
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人信息', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/professors',
    component: Layout,
    redirect: '/professors',
    hidden: false,
    children: [
      {
        path: 'professors',
        component: () => import('@/views/manager/professor-list/professor'),
        name: 'professors',
        meta: { title: '专家列表', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/autocomment',
    component: Layout,
    redirect: '/autocomment',
    hidden: false,
    children: [
      {
        path: 'autocomment',
        component: () => import('@/views/manager/auto-comment/autoComment'),
        name: 'autocomment',
        meta: { title: '自动评论列表', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    hidden:true,
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

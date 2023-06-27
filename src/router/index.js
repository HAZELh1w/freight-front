import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  },

  {
    path: '/basicInfo',
    component: Layout,
    redirect: '/basicInfo/staff',
    name: 'BasicInfo',
    meta: { title: '基本信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'staff',
        name: 'Staff',
        component: () => import('@/views/basicInfo/staff'),
        meta: { title: '人员信息管理', icon: 'table' }
      },
      {
        path: 'vehicle',
        name: 'Vehicle',
        component: () => import('@/views/basicInfo/vehicle'),
        meta: { title: '车辆信息管理', icon: 'tree' }
      },
      {
        path: 'company',
        name: 'Company',
        component: () => import('@/views/basicInfo/company'),
        meta: { title: '公司信息管理', icon: 'table' }
      },
      {
        path: 'freight',
        name: 'Freight',
        component: () => import('@/views/basicInfo/freight'),
        meta: { title: '货物信息管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/maintenance',
    component: Layout,
    redirect: '/maintenance/repairmanMaintenanceRecord',
    name: 'Maintenance',
    meta: { title: '汽车检修管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'repairmanMaintenanceRecord',
        name: 'RepairmanMaintenanceRecord',
        component: () => import('@/views/maintenance/repairmanMaintenanceRecord'),
        meta: { title: '修理工维修记录', icon: 'table' }
      },
      {
        path: 'vehicleMaintenanceRecord',
        name: 'VehicleMaintenanceRecord',
        component: () => import('@/views/maintenance/vehicleMaintenanceRecord'),
        meta: { title: '车辆维修记录', icon: 'tree' }
      }
    ]
  },

  {
    path: '/dispatch',
    component: Layout,
    redirect: '/dispatch/record',
    name: 'Dispatch',
    meta: { title: '运输调度管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'record',
        name: 'Record',
        component: () => import('@/views/dispatch/record'),
        meta: { title: '单车运输记录管理', icon: 'table' }
      },
      {
        path: 'task',
        name: 'Task',
        component: () => import('@/views/dispatch/task'),
        meta: { title: '运输记录管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/statistic',
    component: Layout,
    redirect: '/statistic/reportForm',
    name: 'Statistic',
    meta: { title: '数据统计分析', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'reportForm',
        name: 'ReportForm',
        component: () => import('@/views/statistic/reportForm'),
        meta: { title: '周期性报表', icon: 'tree' }
      },
      {
        path: 'graph',
        name: 'Graph',
        component: () => import('@/views/statistic/graph'),
        meta: { title: '数据统计图', icon: 'tree' }
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

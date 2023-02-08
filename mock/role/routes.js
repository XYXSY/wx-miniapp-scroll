// Just a mock data

const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

const asyncRoutes = [
  {
    path: '/permission',
    component: 'layout/Layout',
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: 'views/permission/page',
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: 'views/permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
        }
      },
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['editor']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
const LcRoutes = [
  {
    path: '/ticketManagement',
    component: 'layout/Layout',
    redirect: '/ticketManagement/table',
    name: 'ticketManagement',
    alwaysShow: true,
    meta: { title: '售票管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'ticketManagement',
        name: '协议团队售票',
        component: () => import('@/views/ticketManagement/agreementTeam'),
        meta: { title: '协议团队售票', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '团散客售票', icon: 'tree' }
      }
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/test/index'),
    meta: {
      index: 0
    }
  }
]
module.exports = {
  constantRoutes,
  asyncRoutes,
  LcRoutes
}

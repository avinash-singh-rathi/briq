
const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { auth: false },
    component: () => import('pages/Login')
  },
  {
    path: '/auth/:provider/:token',
    name: 'getLoginToken',
    meta: { auth: false },
    component: () => import('pages/LoginToken')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'),name: 'home',meta: { auth: true }, },
      { path: '/quotes', component: () => import('pages/Index.vue'),name: 'quotes',meta: { auth: false }, }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

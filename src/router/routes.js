
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'diets', component: () => import('pages/Diets.vue') },
      { path: 'diet/:dietPath', name: 'diet', component: () => import('pages/Diet.vue'), props: true },
      { path: 'compositions', name: 'compositions', component: () => import('pages/Compositions.vue') },
      { path: 'calculator', name: 'calculator', component: () => import('pages/Calculator.vue') }
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

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/Products.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/Coupons.vue')
      },
      {
        path: 'order',
        component: () => import('../views/admin/Order.vue')
      },
      {
        path: 'image',
        component: () => import('../views/admin/Image.vue')
      }
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

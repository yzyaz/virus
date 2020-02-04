import Vue from 'vue'
import VueRouter from 'vue-router'
// import Nav from '../components/nav/Nav.vue'
// import Status from '../components/status/Status.vue'
// import New from '../components/new/New.vue'
// import Inquire from '../components/inquire/Inquire.vue'
// import Cure from '../components/cure/Cure.vue'
const Nav = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/nav/Nav.vue')
const Status = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/status/Status.vue')
const New = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/new/New.vue')
const Inquire = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/inquire/Inquire.vue')
const Cure = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/cure/Cure.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Nav,
    redirect: '/status',
    children: [
      { path: '/status', component: Status },
      { path: '/new', component: New },
      { path: '/inquire', component: Inquire },
      { path: '/cure', component: Cure }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

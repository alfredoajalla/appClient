import Vue from 'vue'
import VueRouter from 'vue-router'
import ClientList from '@/components/clientList'
import ClientEdit from '@/components/clientEdit';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Client',
    component: ClientList
  },
  {
    path: '/edit',
    name: 'ClientEdit',
    component: ClientEdit
  },
  {
    path: '/providerEdit',
    name: 'ProviderEdit',
    component: ClientEdit
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

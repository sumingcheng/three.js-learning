import {createRouter, createWebHistory} from 'vue-router';


const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/*',
    name: '404',
    component: () => import('@/views/error/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHashHistory } from 'vue-router';

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            component: () => import('./pages/Home.vue')
        },
        {
            name: 'map',
            path: '/map',
            component: () => import('./pages/Map.vue')
        },
        {
            name: 'my-qr',
            path: '/my-qr',
            component: () => import('./pages/MyQR.vue')
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('./pages/Login.vue')
        },
        {
            name: 'register',
            path: '/register',
            component: import('./pages/Login.vue')
        }
    ]
});
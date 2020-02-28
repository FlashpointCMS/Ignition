import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/entities',
            name: 'entities',
            component: () => import('../views/entities.vue'),
            alias: ['/']
        },
        {
            path: '/entities/:name/collection',
            name: 'entities.collection',
            props: true,
            component: () => import('../views/collection.vue')
        },
        {
            path: '/entities/:name/entity/:id',
            name: 'entities.entity',
            props: true,
            component: () => import('../views/entity.vue')
        },
        {
            path: '/entities/:name/revision/:id/:sequence',
            name: 'entities.revision',
            props: true,
            component: () => import('../views/revision.vue')
        },
    ]
});
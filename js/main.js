'use strict';

import appHeader from './main-cmps/header.cmp.js';
import routes from './routes.js';

const theRoutes = new VueRouter({
    routes: routes
})

var app = new Vue({
    el: '#app',
    template: `
    <div class="main">
        <app-header></app-header>
        <router-view></router-view>
    </div>
    `,
    mounted() {
        console.log('Main app mounted', 'success');
    },
    data: {

    },
    methods: {

    },
    computed: {

    },
    components: {
        appHeader,
    },
    router: theRoutes
})
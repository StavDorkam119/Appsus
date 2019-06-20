'use strict';

import appHeader from './main-cmps/header.cmp.js';
import homePage from './main-cmps/home.cmp.js';

var app = new Vue({
    el: '#app',
    template: `
    <div>
        <app-header></app-header>
        <home-page></home-page>
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
        homePage
    },
})
'use strict';

import appHeader from './main-cmps/header.cmp.js';

var app = new Vue({
    el: '#app',
    template: `
    <div>
        <app-header></app-header>
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
        appHeader
    },
})
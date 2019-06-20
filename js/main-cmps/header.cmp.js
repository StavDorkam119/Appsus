'use strict';

import {
    filters
} from '../../data/filters.js';

export default {
    name: 'appHeader',
    template: `
        <header class="app-header">
            <div class="logo">
                <img src="imgs/logo.svg"/>
                <h1>Appsus</h1>
            </div>
            <component v-if="this.filter" :is="this.filter.component"></component>
            <label for="header-nav-toggler-label">Input Nav</label>
            <input type="checkbox" id="header-nav-toggler" />
            <nav>
                <ul>
                    <li>
                        <router-link to="/">
                            Home
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/about">
                            About
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/email">
                            Email
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/keep">
                            Keep
                        </router-link>
                    </li>
                </ul>
            </nav> 
        </header>
    `,
    data() {
        return {
            filter: null
        }
    },
    watch: {
        '$route': {
            handler(route) {
                if (route.path.includes('/email')) {
                    this.filter = filters.cmps.find(filter => filter.type === 'email');
                } 
                // else if (route.path.includes('/keep')) {

                // }
            },
            deep: true
        }
    },
    components: {
        filters
    }
}
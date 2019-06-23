'use strict';

import {
    filters
} from '../../data/filters.js';


import {utilService} from '../services/util.service.js';

import eventBus from '../services/event-bus.service.js';

export default {
    name: 'appHeader',
    template: `
        <header class="app-header">
            <div class="logo" v-if="!this.mobileMode">
                <img src="imgs/logo.svg"/>
                <h1>Appsus</h1>
            </div>
            <div class="toggle-sidebar" v-if="sideBarIcon" @click="toggleSidebar"><i class="fas fa-bars"></i></div>
            <div class="logo" v-if="this.mobileMode">
                <img src="imgs/logo.svg"/>
                <h1>Appsus</h1>
            </div>
            <component v-if="this.filter && !this.mobileMode" :is="this.filter.component"></component>
            <div class="toggle-menu" @click="toggleMenu"><i class="fab fa-flickr"></i></div>
            <nav class="header-links-container" :class="menuClass">
                <ul>
                    <li>
                        <router-link to="/" exact>
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
                        <router-link to="/keep/main">
                            Keep
                        </router-link>
                    </li>
                </ul>
            </nav> 
        </header>
    `,
    data() {
        return {
            filter: null,
            mobileMode: false,
            showMobileMenu: false
        }
    },
    created () {
        this.checkMobileMode();
        window.addEventListener('resize', this.checkMobileMode);
        this.checkForFilter(this.$route)
    },
    methods: {
        checkMobileMode() {
            if (utilService.checkIfMobile()) this.mobileMode = true; 
            else this.mobileMode = false;
        },
        toggleMenu() {
            this.showMobileMenu = !this.showMobileMenu;
        },
        toggleSidebar () {
            eventBus.$emit('show-sidebar')
        },
        checkForFilter(route) {
            if (route.path.includes('/email')) {
                this.filter = filters.cmps.find(filter => filter.type === 'email');
            } 
            else (this.filter) = null;
        }
    },
    computed: {
        menuClass() {
            if (this.showMobileMenu) return 'shown'; 
        },
        sideBarIcon() {
            if (this.mobileMode && this.$route.path.includes('/email')) return true;
        }
    },
    watch: {
        '$route': {
            handler(route) {
                this.checkForFilter(route);
            },
            deep: true
        }
    },
    components: {
        filters,
    }
}
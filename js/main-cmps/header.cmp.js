'use strict';

import {
    filters
} from '../../data/filters.js';


import {utilService} from '../services/util.service.js';

import eventBus from '../event-bus.js';

export default {
    name: 'appHeader',
    template: `
        <header class="app-header">
            <div class="logo" v-if="!this.mobileMode" @click="goToHome">
                <img src="imgs/logo.svg"/>
                <h1>Appsus</h1>
            </div>
            <div class="toggle-sidebar" v-if="sideBarIcon" @click="toggleSidebar"><i class="fas fa-bars"></i></div>
            <div class="logo" v-if="this.mobileMode" @click="goToHome">
                <img src="imgs/logo.svg"/>
                <h1>Appsus</h1>
            </div>
            <component v-if="this.filter && !this.mobileMode" :is="this.filter.component"></component>
            <div class="toggle-menu" @click="toggleMenu"><i class="fab fa-flickr"></i></div>
            <nav class="header-links-container" :class="menuClass">
                <ul>
                    <li>
                        <router-link to="/" exact>
                        <i class="fas fa-home" v-if="showMobileIcons"></i>
                           <span v-else>Home</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/about">
                        <i class="fas fa-horse-head" v-if="showMobileIcons"></i>
                            <span v-else>About</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/email">
                        <i class="far fa-envelope" v-if="showMobileIcons"></i>
                            <span v-else>Email</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/keep/main" >
                        <i class="far fa-sticky-note" v-if="showMobileIcons"></i>
                            <span v-else>Keep</span>
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
            showMobileMenu: false,
            showMobileIcons: false
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
            if (window.innerWidth <= 990) this.showMobileIcons = true;
            else this.showMobileIcons = false;
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
        },
        goToHome() {
            this.$router.push('/');
        }
    },
    computed: {
        menuClass() {
            if (this.showMobileMenu) return 'show-nav-links-header'; 
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
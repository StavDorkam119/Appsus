
import {utilService} from '../../../services/util.service.js';
import eventBus from '../../../event-bus.js';
import progressBar from '../cmps/email-read-progress.cmp.js';

export default {
    name: 'EmailAppSidebar',
    template: `
    <section class="email-app-sidebar-container" :class="mobileNav">
        <router-link to="/email/compose" class="link-to-compose">
        Compose
        </router-link>
        <button @click="updateFilterNone"><i class="fas fa-envelope-open-text"></i>Inbox</button>
        <button @click="updateFilterStarred"><i class="fas fa-star"></i>Starred</button>
        <button @click="updateFilterSent"><i class="fas fa-paper-plane"></i>Sent</button>
        <progress-bar></progress-bar>
    </section>`,
    data () {
        return{
            isMobileOn: false,
            showMobileSideBar: false
        }
    },
    created () {
        this.checkMobileMode();
        window.addEventListener('resize', this.checkMobileMode)
        eventBus.$on('show-sidebar', () => {
            this.showMobileSideBar = !this.showMobileSideBar
        })
    },
    methods: {
        checkMobileMode() {
            if (utilService.checkIfMobile()) this.isMobileOn = true; 
            else this.isMobileOn = false;
        },
        updateFilterNone() {
            eventBus.$emit('update-filter', 'none');
        },
        updateFilterStarred() {
            eventBus.$emit('update-filter', 'starred');
        },
        updateFilterSent() {
            eventBus.$emit('update-filter', 'sent');
        }
    },
    computed: {
        mobileNav() {
            if (this.showMobileSideBar) return 'shown'
        }
    },
    components: {
        progressBar
    }
}
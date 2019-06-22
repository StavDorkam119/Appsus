
import {utilService} from '../../../services/util.service.js';
import eventBus from '../../../services/event-bus.service.js';

export default {
    name: 'EmailAppSidebar',
    template: `
    <section class="email-app-sidebar-container" v-if="!isMobileOn">
        <router-link to="/email" class="link-to-compose">
        Compose
        </router-link>
        <button @click="updateFilterNone">Inbox</button>
        <button @click="updateFilterStarred">Starred</button>
        <button @click="updateFilterSent">Sent</button>
        <button @click="updateFilterDraft">Draft</button>
        
    </section>`,
    data () {
        return{
            isMobileOn: false
        }
    },
    created () {
        window.addEventListener('resize', this.checkMobileMode)
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
        },
        updateFilterDraft() {
            eventBus.$emit('update-filter', 'draft');
        },
    },

}
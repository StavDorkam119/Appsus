import {
    emailService
} from '../services/email.service.js';
import emailList from '../apps/email/pages/email-list.cmp.js';
import emailSideBar from '../apps/email/cmps/sidebar.cmp.js'; 
import eventBus from '../services/event-bus.service.js';

export default {
    name: 'EmailApp',
    template: `
    <section class="email-app-container">
        <email-side-bar></email-side-bar>
        <email-list :emails="emailsToDisplay"></email-list>
    </section>`,
    data() {
        return {
            emails: null,
            filter: null
        }
    },
    computed: {
        emailsToDisplay() {
            if (!this.filter || !this.filter.searchTerm && 
                this.filter.filterOptions === 'none' 
                && this.filter.sortOptions === 'none' 
                && !this.filter.isStarredOn 
                && !this.filter.showDrafts
                && !this.filter.showSent) return this.emails;
            return emailService.filterEmails(this.emails, this.filter)
        }
    },
    created() {
        emailService.query().then(res => this.emails = res)
        eventBus.$on('filter-emails', filter => {
            if(filter.filterOptions && filter.filterOptions === 'true') filter.filterOptions = true;
            else if(filter.filterOptions && filter.filterOptions === 'false') filter.filterOptions = false;
            this.filter = filter;
        })
    },
    components: {
        emailList,
        emailSideBar
    },

}
import {
    emailService
} from '../services/email.service.js';
import emailList from '../apps/email/pages/email-list.cmp.js';
import eventBus from '../services/event-bus.service.js';

export default {
    name: 'EmailApp',
    template: `
    <section class="email-app-container">
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
            if (!this.filter || !this.filter.searchTerm && !this.filter.filterOptions && !this.filter.sortOptions) return this.emails;
            return emailService.filterEmails(this.emails, this.filter)
            
            // let regex = new RegExp(`(${this.filter.searchTerm})`, 'ig');
            // // debugger;
            // return this.emails.filter(email => {
            //     if (regex !== /()/ && this.filter.filterOptions !== 'none'){
            //         if ((regex.test(email.body) || regex.test(email.subject)) && email.isRead === this.filter.filterOptions) return email;
            //     } else if (regex !== /()/ && this.filter.filterOptions === 'none') {
            //         if (regex.test(email.body) || regex.test(email.subject)) return email;
            //     } else if (regex === /()/ && this.filter.filterOptions !== 'none') {
            //         if (email.isRead === this.filter.filterOptions) return email;
            //     }
            // })
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
        emailList
    },

}
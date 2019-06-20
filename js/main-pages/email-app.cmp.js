
import {emailService} from '../services/email.service.js';
import sideBar from '../apps/email/cmps/sidebar.cmp.js';
import emailList from '../apps/email/pages/email-list.cmp.js';

export default {
    name: 'EmailApp',
    template:`
    <section class="email-app-container">
        <side-bar></side-bar>
        <email-list :emails="emailsToDisplay"></email-list>
    </section>`,
    data () {
        return {
            emails: null,
            filter: null
        }
    },
    computed: {
        emailsToDisplay () {
            if(!this.filter) return this.emails
        }
    },
    created () {
        emailService.query()
            .then(res => {
                this.emails = res
            })
    },
    components: {
        sideBar,
        emailList
    }
}
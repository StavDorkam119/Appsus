
import {emailService} from '../services/email.service.js';


export default {
    name: 'EmailApp',
    template:`
    <section class="email-app-container">
        <div>SideBar</div>
        <div>Email-List</div>
    </section>`,
    data () {
        return {
            emails: null
        }
    },
    created () {
        emailService.query()
            .then(res => {
                this.emails = res
            })
    }
}
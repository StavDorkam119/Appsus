import {
    emailService
} from '../../../services/email.service.js';

export default {
    name: 'EmailDetails',
    template: `
    <section class="email-details-container" v-if="this.email">
        <h1>{{this.email.name}}</h1>
        
    </section>`,
    data() {
        return {
            email: null,
        }
    },
    created() {
        const emailId = this.$route.params.emailId;
        emailService.getEmailById(emailId)
                .then(res => this.email = res)
    },
    watch: {
        '$route.params.emailId'(emailId) {
            emailService.getEmailById(emailId)
                .then(res => this.email = res)
        }
    }
}
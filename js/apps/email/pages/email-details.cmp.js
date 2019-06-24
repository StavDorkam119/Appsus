import {
    emailService
} from '../../../services/email.service.js';

import eventBus from '../../../services/event-bus.service.js';

export default {
    name: 'EmailDetails',
    template: `
    <section class="email-details-container" v-if="this.email">
        <div class="">{{firstNameIni}}</div>
        <div class="crud-buttons">
            <router-link to="/email" ><i class="fas fa-arrow-left"></i>Back to Inbox</router-link>
            <button @click="deleteEmail"><i class="fas fa-trash"></i></button>
            <button @click="replyToEmail">Reply</button>
            <button @click="toggleStarred">
                <i class="far fa-star" v-if="!email.isStarred"></i>
                <i class="fas fa-star" v-else="email.isStarred"></i>
            </button>
        </div>
        <div>
            <h3>{{email.name}}</h3>
            <span>{{email.subject}}</span>
            <span>Date Received: {{dateFormatted}}</span>
        </div>
        <br>
        <p>{{email.body}}</p>
        
    </section>`,
    data() {
        return {
            email: null,
            dateFormatted: null
        }
    },
    methods: {
        toggleStarred() {
            this.email.isStarred = !this.email.isStarred;
            emailService.updateEmail(this.email);
        },
        deleteEmail() {
            if (confirm('Are you sure you want to delete this email?')) {
                emailService.deleteEmail(this.email.id);
                this.$router.push('/email');
            }
        },
        replyToEmail() {
            eventBus.$emit('reply-to-email', this.email)
            this.$router.push(`/email/compose/${this.email.id}`);
        }
    },
    computed: {
        firstNameIni() {
            return this.email.name[0];
        }
    },
    created() {
        const emailId = this.$route.params.emailId;
        emailService.getEmailById(emailId)
            .then(res => {
                this.email = res
                this.email.isRead = true;
                emailService.updateEmail(this.email);
                this.dateFormatted = new Date(this.email.timestamp)
            })
    },
    watch: {
        '$route.params.emailId'(emailId) {
            emailService.getEmailById(emailId)
                .then(res => this.email = res)
        }
    }
}
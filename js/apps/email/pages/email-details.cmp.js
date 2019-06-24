import {
    emailService
} from '../../../services/email.service.js';

import {utilService} from '../../../services/util.service.js';

import eventBus from '../../../event-bus.js';

export default {
    name: 'EmailDetails',
    template: `
    <section class="email-details-container" v-if="this.email">
        
        <div class="buttons-container">
            <router-link to="/email" ><i class="fas fa-arrow-left"></i><span>Back to Inbox</span></router-link>
            <div class="crud-buttons">
                <button @click="deleteEmail"><i class="fas fa-trash"></i></button>
                <button @click="replyToEmail">
                    <i class="fas fa-reply"></i>
                </button>
                <button @click="toggleStarred">
                    <i class="far fa-star" v-if="!email.isStarred"></i>
                    <i class="fas fa-star" v-else="email.isStarred"></i>
                </button>
            </div>
        </div>
        <div class="email-details-name-first" :style="{background: nameColor}">{{firstNameIni}}</div>
        <p>{{email.name}}</p>
        <br>
        <p class="subject">{{email.subject}}</p>
        <br>
        <br>
        <p class="date">Date Received: {{dateFormatted}}</p>
        <br>
        <p class="body">{{email.body}}</p>
        
    </section>`,
    data() {
        return {
            email: null,
            dateFormatted: null,
            nameColor: this.setRandomColor()
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
        },
        setRandomColor() {
            return utilService.getRandomColor()
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
import {
    utilService
} from '../../../services/util.service.js';
import {
    emailService
} from '../../../services/email.service.js';
import eventBus from '../../../event-bus.js';

export default {
    name: 'EmailPreview',
    template: `
    <section @click="goToDetails" class="email-preview" :class="isRead">
            
            <span @click.stop="toggleRead">
                <span class="email-preview-name-first" :style="{background: nameColor}">{{firstNameIni}}</span>
                <span v-if="!email.isRead"><i class="fas fa-envelope"></i></span> 
                <span v-else  ><i class="far fa-envelope-open"></i></span> 
                {{email.name}}
            </span>
            <br>
            <span>{{email.subject}}</span> 
            <br>
            <span>{{bodySize}}</span>
            <span>{{this.dateFormatted}}</span>
    </section>
    `,
    props: ['email'],
    data() {
        return {
            nameColor: this.setRandomColor()
        }
    },
    methods: {
        toggleRead() {
            const updatedEmail = this.email;
            updatedEmail.isRead = !updatedEmail.isRead
            emailService.updateEmail(updatedEmail);
            eventBus.$emit('update-progress');
        },
        emailUrl() {
            return '/email/' + this.email.id;
        },
        goToDetails() {
            this.$router.push(`${this.emailUrl()}`)
        },
        setRandomColor() {
            return utilService.getRandomColor()
        }
    },
    computed: {
        bodySize() {
            if (this.email.body.length > 30) return this.email.body.substring(0, 30) + '...';
            else return this.email.body;
        },
        dateFormatted() {
            // debugger;
            return new Date(this.email.timestamp).toDateString();
        },
        isRead() {
            if (this.email.isRead) return 'read';
        },
        firstNameIni() {
            return this.email.name[0];
        }

    },
    components: {}
}
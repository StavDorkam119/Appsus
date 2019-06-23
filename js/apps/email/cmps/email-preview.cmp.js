
import {utilService} from '../../../services/util.service.js';
import {emailService} from '../../../services/email.service.js';


export default {
    name: 'EmailPreview',
    template: `
    <router-link :to="emailUrl" class="email-preview" :class="isRead">
            
            <span>
            <input type="checkbox" :checked="isRead" @click.stop="toggleRead"/>
                <span v-if="!email.isRead"><i class="fas fa-envelope"></i></span> 
                <span v-else><i class="far fa-envelope-open"></i></span> 
                {{email.name}}
            </span>
            <br>
            <span>{{email.subject}}</span> 
            <br>
            <span>{{bodySize}}</span>
            <span>{{this.dateFormatted}}</span>
    </router-link>
    `,
    props: ['email'],
    methods: {
        toggleRead() {
            const updatedEmail = this.email;
            updatedEmail.isRead = !updatedEmail.isRead
            emailService.updateEmail(updatedEmail);
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
        emailUrl() {
            return '/email/' + this.email.id;
        },
        isRead() {
            if (this.email.isRead) return 'read';
        }
    },
    components: {
    }
}
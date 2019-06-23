
import {utilService} from '../../../services/util.service.js';

export default {
    name: 'EmailPreview',
    template: `
    <router-link :to="emailUrl" class="email-preview" :class="isRead">
            <span>
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
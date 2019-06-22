
import {utilService} from '../../../services/util.service.js';

export default {
    name: 'EmailPreview',
    template: `
    <router-link :to="emailUrl" class="email-preview" :class="isRead">
            <span>{{email.name}}</span>
            <span>{{email.subject}}</span> 
            <span>{{bodySize}}</span>
            <span>{{this.dateFormatted}}</span>
    </router-link>
    `,
    props: ['email'],
    created() {
        // debugger;
        this.dateTimeStamp = new Date(this.email.timestamp)
    },
    data () {
        return {
            dateTimeStamp: ''
        }
    },
    methods: {
  
    },
    computed: {
        bodySize() {
            if (this.email.body.length > 30) return this.email.body.substring(0, 30) + '...';
        },
        dateFormatted() {
            // debugger;
            return this.dateTimeStamp.toDateString();
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
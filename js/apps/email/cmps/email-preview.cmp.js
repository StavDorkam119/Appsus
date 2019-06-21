
import {utilService} from '../../../services/util.service.js';

export default {
    name: 'EmailPreview',
    template: `
    <router-link :to="emailUrl">
        <li class="email-preview-container">
            <span>{{email.name}}</span>|
            <span>{{email.subject}}</span> - 
            <span>{{bodySize}}</span>|
           <span>{{this.dateFormatted}}</span>
        </li>
    </router-link>
    `,
    props: ['email'],
    created() {
        this.dateTimeStamp = new Date(this.email.sentAtTimestamp)
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
            return this.dateTimeStamp.toDateString().split(' ').slice(1,3).join(' ')
        },
        emailUrl() {
            return '/email/' + this.email.id;
        }
    },
    components: {
    }
}
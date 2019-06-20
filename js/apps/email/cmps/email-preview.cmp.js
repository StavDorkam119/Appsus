
import {utilService} from '../../../services/util.service.js';

export default {
    name: 'EmailPreview',
    template: `
    <li class="email-preview-container" @click="moveToEmailDisplay">
        <span>{{email.name}}</span>|
        <span>{{email.subject}}</span> - 
        <span>{{bodySize}}</span>|
        <span>{{this.dateFormatted}}</span>
    </li>`,
    props: ['email'],
    created() {
        // this.dateFormatted = new Date(this.email.sentAtTimestamp).getMonth()+'/'+ new Date(this.email.sentAtTimestamp).getDay();
        this.dateFormatted = new Date(this.email.sentAtTimestamp).toDateString().split(' ').slice(1,3).join(' ')
    },
    data () {
        return {
            dateFormatted: ''
        }
    },
    methods: {
        moveToEmailDisplay() {
            console.log('Clicked')
        }
    },
    computed: {
        bodySize() {
            if (this.email.body.length > 30) return this.email.body.substring(0, 30) + '...';
        }
    },
    components: {
    }
}
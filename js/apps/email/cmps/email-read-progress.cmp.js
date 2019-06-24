
import {emailService} from '../../../services/email.service.js';
import eventBus from '../../../event-bus.js';

export default {
    name: 'Email-Read-Progress',
    template:`
    <div class="progress-bar">
        <div :style="progressBarFilling"></div>
        <h1>{{readEmailPercentage}}</h1>
    </div>`,
    created() {
        emailService.query()
            .then(this.updateProgress)
        eventBus.$on('update-progress', () => {
            emailService.query()
            .then(this.updateProgress)
        })
    },
    data () {
        return {
            readEmailProgress: 0
        }
    },
    methods: {
        updateProgress(emails) {
            const numberOfRead = emails.filter(email => email.isRead).length;
            const readEmailsPercentage = parseInt((numberOfRead/emails.length) * 100);
            this.readEmailProgress = readEmailsPercentage
        }
    },
    computed: {
        readEmailPercentage(){
            return this.readEmailProgress + '%'
        },
        progressBarFilling() {
            return 'width: ' + this.readEmailProgress + '%';
        }
    }
}
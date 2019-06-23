
import {emailService} from '../../../services/email.service.js';


export default {
    name: 'Email-Read-Progress',
    template:`
    <div class="progress-bar">
        <div :style="progressBarFilling"></div>
        <h1>{{readEmailPercentage}}</h1>
    </div>`,
    created() {
        emailService.query()
            .then(emails => {
                const numberOfRead = emails.filter(email => email.isRead).length;
                const readEmailsPercentage = parseInt((numberOfRead/emails.length) * 100);
                this.readEmailProgress = readEmailsPercentage
            })
    },
    data () {
        return {
            readEmailProgress: 0
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
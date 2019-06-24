
import {utilService} from '../../../services/util.service.js';
import {emailService} from '../../../services/email.service.js';
import eventBus from '../../../event-bus.js';

export default {
    name: 'EmailMaker',
    template:`
    <section class="email-maker-container">
        <h2>New Message</h2>
        <input type="text" placeholder="To:" autofocus v-model="composedEmail.name"/>
        <input type="text" placeholder="Title:" v-model="composedEmail.subject"/>
        <textarea cols="20" v-model="composedEmail.body"></textarea>
        <div>
            <button @click="sendEmail">Send</button>
            <button @click="sendToKeep">Save In Keeps</button>
            <button @click="discardEmail">Trash</button>
        </div>
    </section>`,
    created() {
        const emailId = this.$route.params.emailId;
        if (emailId) {
            emailService.getEmailById(emailId)
            .then(emailToReplyTo => {
                this.composedEmail.name = 'To: ' + emailToReplyTo.name;
                this.composedEmail.subject = 'Re: ' + emailToReplyTo.subject;
                this.composedEmail.body = emailToReplyTo.body
            })
        }
        eventBus.$on('send-to-email', this.receiveKeep)
    },
    data () {
        return {
            composedEmail: {
                name: '',
                timestamp: 0,
                subject: '',
                body: '',
                company: 'misterBit',
                emailAddress: 'misterbit@gmail.com',
                wasSentByUser: true,
                id: utilService.makeId(),
                isRead: false,
                isStarred: false,
            },
        }
    },
    methods: {
        discardEmail() {
            this.$router.push('/email');
        },
        sendEmail() {
            this.composedEmail.timestamp = +new Date();
            emailService.addEmail(this.composedEmail);
            this.$router.push('/email');
        },
        receiveKeep(keep) {
            if (keep) {
                console.log(keep);
                if (keep.title) this.composedEmail.subject = keep.title;
                if (keep.type === 'note') this.composedEmail.body = keep.data.content;
                else if (keep.type === 'checkList') {
                    let listitems = keep.data.map(item => {
                        return `◾ ${item.content}`
                    })
                    this.composedEmail.body = listitems.join("\n");;
                }
            }
        },
        sendToKeep() {
            setTimeout(() => {
                eventBus.$emit('send-email-to-keep', this.composedEmail);
            }, 0);
            this.$router.push('/keep/editor');
        }
    }
}
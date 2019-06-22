
import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    name: 'EmailList',
    template: `
    <section class="email-list-container">
            <email-preview v-for="(email, idx) in emails" :key="idx" :email="email"></email-preview>
    </section>`,
    props: ['emails'],
    components: {
        emailPreview
    },

}
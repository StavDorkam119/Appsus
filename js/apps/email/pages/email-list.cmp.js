
import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    name: 'EmailList',
    template: `
    <section class="email-list-container">
        <ul class="email-list">
            <email-preview v-for="(email, idx) in emails" :key="idx" :email="email"></email-preview>
        </ul>
    </section>`,
    props: ['emails'],
    components: {
        emailPreview
    }
}
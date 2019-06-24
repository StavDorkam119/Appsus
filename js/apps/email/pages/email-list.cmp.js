import emailPreview from '../cmps/email-preview.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import {
    utilService
} from '../../../services/util.service.js';


export default {
    name: 'EmailList',
    template: `
    <section class="email-list-container">
            <email-filter v-if="mobileMode"></email-filter>
            <email-preview v-for="(email, idx) in emails" :key="idx" :email="email"></email-preview>
    </section>`,
    props: ['emails'],
    created() {
        window.addEventListener('resize', () => {
            if (utilService.checkIfMobile()) this.mobileMode = true;
            else this.mobileMode = false;
        })
        if (utilService.checkIfMobile()) this.mobileMode = true;
        else this.mobileMode = false;
    },
    data() {
        return {
            mobileMode: false
        }
    },
    components: {
        emailPreview,
        emailFilter
    },

}
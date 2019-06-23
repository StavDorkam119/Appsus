
import {keepService} from '../../../services/keep.service.js';
import keepList from '../cmps/keep-list.cmp.js';

export default {
    name: 'mainApp',
    template: `
    <section class="keep-main">
    <h1>Main</h1>
    <router-link to="/keep/creator"> Create keep </router-link>
        <keep-list :keeps="keepsForDisplay"></keep-list>
    </section>
    `,
    data() {
        return {
            keeps: null,
        }
    },
    methods: {

    },
    computed: {
        keepsForDisplay() {
            return this.keeps;
        }
    },
    components: {
        keepList
    },
    created() {
        keepService.query()
            .then(res => this.keeps = res) 
    }
}






import {keepService} from '../services/keep.service.js';
import keepList from '../apps/keep/cmps/keep-list.cmp.js';

export default {
    name: 'keepApp',
    template:`
    <section class="keep-app-container">
        <h1>Keep App</h1>
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


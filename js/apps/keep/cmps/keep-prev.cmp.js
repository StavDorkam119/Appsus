
import {utilService} from '../../../services/util.service.js';

export default {
    name: 'keepPrev',
    template: `
    <section class="keep-prev">
    <router-link :to="keepUrl">
        <h2>keep prev</h2>
    </router-link>
    </section>
    `,
   
    props: ['keep'],

    data() {
        return {
            
        }
    },
    created() {
    
    },
  
    methods: {
       
    },
    computed: {
        keepUrl() {
            return ''
        }
    },
    components: {
    }
}


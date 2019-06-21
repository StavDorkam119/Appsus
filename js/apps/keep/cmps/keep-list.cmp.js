
import {utilService} from '../../../services/util.service.js';
import keepPrev from './keep-prev.cmp.js';


export default {
    name: 'keepList',
    template: `
    <section class="keep-list">
    <h2>keep list</h2>
    <div v-for="keep in keeps">
    <keep-prev :keep="keep"></keep-prev>
    </div>
    </section>
    `,
   
    props: ['keeps'],

    data() {
        return {
            
        }
    },
    created() {
    
    },
  
    methods: {
    },
    computed: {
        
    },
    components: {
        keepPrev
    }
}


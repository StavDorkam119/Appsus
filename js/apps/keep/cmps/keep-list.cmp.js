
import {utilService} from '../../../services/util.service.js';
import keepPrev from './keep-prev.cmp.js';


export default {
    name: 'keepList', 
    template: `
    <section class="keep-list">
        <div class="pined-container" v-for="keep in keeps" v-if="keep.isPined">
            <div class="keep-item">
                <keep-prev :keep="keep"></keep-prev>
            </div>
        </div>    
        <div class="keeps-container">
            <div v-for="keep in keeps" class="keep-item" v-if="!keep.isPined">
                <keep-prev :keep="keep"></keep-prev>
            </div>
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


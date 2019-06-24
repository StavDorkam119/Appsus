
import {utilService} from '../../../services/util.service.js';
import keepPrev from './keep-prev.cmp.js';
import {keepService} from '../../../services/keep.service.js';
import eventBus from '../../../services/event-bus.service.js';

export default {
    name: 'keepList', 
    template: `
    <section class="keep-list">
        <div class="pined-container grid">
            <div v-for="(keep, idx) in keeps" v-if="keep.isPined" class="flex">
                <keep-prev :keep="keep" :idx="idx"></keep-prev>
            </div>
        </div>    
        <div class="un-pined-container grid">
            <div v-for="(keep, idx) in keeps" v-if="!keep.isPined">
                <keep-prev :keep="keep" :idx="idx"></keep-prev>
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


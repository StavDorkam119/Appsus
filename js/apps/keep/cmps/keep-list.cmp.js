
import keepPrev from './keep-prev.cmp.js';

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



import {utilService} from '../../../services/util.service.js';

export default {
    name: 'keepPrev',
    template: `
    <section class="keep-prev" :style="{backgroundColor: keep.bgColor}">
    <router-link :to="keepUrl">
        <div class="keep-display">
        <div class="img-container" v-if="keep.img">
            <img :src="keep.img" /> 
        </div>
        <h3 class="title">{{keep.title}}</h3>
        <div v-if="keep.type==='note'" class="note" >
        {{keep.data.content}}
        </div>
        <div v-else class="item-container flex" v-for="(item, idx) in checkList" :key="item.id"> 
            <div class="item-editor-container flex">
                <div class="item-display" :class="{line : item.isDone}">
                {{item.content}}</div>
            </div>    
        </div>
        </div>
    </router-link>
    </section>
    `,
   
    props: ['keep'],

    data() {
        return {
            checkList: this.keep.data,
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


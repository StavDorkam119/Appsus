
import {utilService} from '../../../services/util.service.js';

export default {
    name: 'keepPrev',
    template: `
    <section class="keep-prev" :style="{backgroundColor: keep.bgColor}">
    <router-link :to="keepUrl">EDIT</router-link>
        <div class="keep-display">
        <div  v-if="keep.isPined" class="pin-icon">PIN Icon</div>
        <div class="img-container" v-if="keep.img">
            <img :src="keep.img" /> 
        </div>
        <h3 class="title">{{keep.title}}</h3>
        <h4 v-if="keep.tag" class="keep-tag">#{{keep.tag}} </h4>
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
            return 'editor/' + this.keep.id
        }
    },
    components: {
    }
}


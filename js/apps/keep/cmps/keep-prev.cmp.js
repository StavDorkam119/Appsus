
import {utilService} from '../../../services/util.service.js';
import eventBus from '../../../services/event-bus.service.js';

export default {
    name: 'keepPrev',
    template: `
    <section class="keep-prev" :style="{backgroundColor: keep.bgColor}" @click="goToEdit">
    <router-link :to="keepUrl">
    Click To Edit 
    <i class="fas fa-pencil-alt"></i>
    
    </router-link>
    <button @click.stop="sendToEmail">Send To Email</button>
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
        goToEdit() {
            this.$router.push(`editor/${this.keep.id}`)
        },
       sendToEmail() {
        eventBus.$emit('send-to-email', {title:this.keep.title, type:this.keep.type, data:this.keep.data})
        this.$router.push('/email/compose');
       }
    },
    computed: {
        keepUrl() {
            return 'editor/' + this.keep.id
        }
    },
    components: {
    }
}


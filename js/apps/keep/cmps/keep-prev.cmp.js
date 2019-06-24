
import eventBus from '../../../event-bus.js';

export default {
    name: 'keepPrev',
    template: `
    
    <section v-if="currKeep" class="sticky" :style="{backgroundColor: keep.bgColor}" @click="goToEdit">

        <div class="keep-prev-top flex">
            <i class="far fa-paper-plane icon" @click.stop="sendToEmail"></i>
            <i class="fas fa-thumbtack icon pin" @click.stop="togglePin" :style="{active: keep.isPined}"></i>
            <i class="far fa-trash-alt icon trash" @click.stop="emitDeleted"></i>
        </div>

        <div class="keep-prev-title" v-if="keep.title">
            <h3>{{keep.title}}</h3>
        </div>

        <div v-if="keep.img" class="img-container">
            <img :src="keep.img">
        </div>

        <div class="content-container">

            <div v-if="keep.type==='note'">
                {{keep.data.content}}
            </div>

            <div v-else class="item-container flex" v-for="(item, idx) in checkList" :key="item.id"> 
                <div class="item-editor-container flex">
                <div><i v-if="item.isDone" class="far fa-check-square"></i>
                    <i v-else class="far fa-square"></i>
                </div>
                    <div class="item-display" :class="{line : item.isDone}">
                    {{item.content}}
                    </div>
                </div>    
            </div>

        </div>

            <div class="keep-bottom">
                <div v-if="keep.tag" class="tag">#{{keep.tag}}</div>
            <div class="last-edit">{{dateFormatted}}</div>
        </div>

    </section>
    `,
   
    props: ['keep', 'idx'],

    data() {
        return {
            checkList: this.keep.data,
            currKeep: null
        }
    },
    created() {
        this.currKeep = this.keep;
    }, 
  
    methods: {
        goToEdit() {
            this.$router.push(`editor/${this.keep.id}`)
        },
        togglePin() {
            this.keep.isPined = !this.keep.isPined;
        },
        emitDeleted() {
            eventBus.$emit('deleted', this.idx);
            this.currKeep = null;
        },
       sendToEmail() {
           this.$router.push('/email/compose');
           setTimeout(()=> {
               eventBus.$emit('send-to-email', {title:this.keep.title, type:this.keep.type, data:this.keep.data})
           }, 0)
       }
    },
    computed: {
        keepUrl() {
            return 'editor/' + this.keep.id
        },
        dateFormatted() {
            return new Date(this.keep.date).toDateString()
        }
    },
    components: {
    }
}


{/* <i class="fas fa-user-plus icon" @click.stop="sendToEmail"></i> */}
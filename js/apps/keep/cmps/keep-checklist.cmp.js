import {keepService} from '../../../services/keep.service.js';
import eventBus from '../../../services/event-bus.service.js';

export default {
    name: 'checkList',
    template: `
    <section class="checklist-container">
    <div class="add-icon">+</div>
    <input type="text" placeholder="Add Item..." 
        v-model="txt" @keyup.enter="addItem" v-focus @blur="addItem"/>
    <div class="item-container flex" v-for="(item, idx) in checkList" :key="item.id">
            <div class="item-editor-container flex">
                <input type="checkbox" class="check-btn" v-model="item.isDone"/>
                <div v-if="item.isEditing">
                <input class="item-edit" type="text" v-model="item.content" 
                    @keyup.enter="stopEditing(item, idx)" 
                    @blur="stopEditing(item, idx)" @keyup.esc="cancleEditing(item)"
                v-focus/>
                </div>
                <div class="item-display" :class="{line : item.isDone}" v-else @click="editItem(item)">
                {{item.content}}</div>
            </div>    
            <div class="remove-btn" @click="removeItem(idx)">&times</div>
    </div>
    </section> 
    `,

    props: [],

    data() {
        return {
            currItem: null,
            txt: '',
            contentBeforeEdit: '',
            checkList: [],
        }
    },
    created() {
        this.currItem = keepService.getEmptyCheckItem()
        eventBus.$on('add-data', this.addCheckList);
        eventBus.$on('delete-data', this.initialize)
        console.log()
    },

    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },

    methods: {
        updateContent() {
            console.log();
        },
     
        addItem() {
            if (!this.txt) return;
            this.currItem.content = this.txt;
            this.checkList.unshift(this.currItem);
            this.txt = '';
            this.currItem = keepService.getEmptyCheckItem();
            console.log(this.checkList)
        },
        removeItem(idx) {
            this.checkList.splice(idx, 1);
        },
        editItem(item) {
            this.contentBeforeEdit = item.content;
            item.isEditing = true;  
        },
        stopEditing(item, idx) {
            if(!item.content) this.removeItem(idx)
            else {
                item.isEditing = false; 
            }
        },
        cancleEditing(item) {
            item.content = this.contentBeforeEdit;
            this.contentBeforeEdit = '';
            item.isEditing = false;
        },
        addCheckList(keep) {
            if(keep.type === 'checkList') {
                this.emitCheckList();
                this.initialize();
            }
            else return;
        },
        emitCheckList() {
            this.$emit('send-data', this.checkList)
        },
        initialize() {
            this.currItem = keepService.getEmptyCheckItem()
            this.contentBeforeEdit = '';
            this.checkList = [];
        }
    },
    computed: {
     
    },
    components: {

    }
}
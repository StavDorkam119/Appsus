import { keepService } from '../../../services/keep.service.js';
import eventBus from '../../../event-bus.js';
import checkList from '../cmps/keep-checklist.cmp.js'
import note from '../cmps/keep-note.cmp.js'

export default {
    name: 'keepEditor',
    template: `
    <section class="keep-editor" v-if="keep" :style="{'backgroundColor': keep.bgColor}">

    <h1>keepEditor</h1>
    <router-link to="/keep/main">
        <button class="btn-back" @click="addKeep">
            <img src="https://img.icons8.com/ios/50/000000/circled-left-2-filled.png">
        </button>  
    </router-link>

    <div v-if="keep.img" class="img-container">
        <img :src="keep.img" /> 
    </div>

    <div class="keep-title flex">
     
        <div v-if="keep.isEditing">
            <input class="title-edit" type="text" placeholder="Title..." v-model="keep.title"
                @keyup.enter="stopEditing(keep)" @blur="stopEditing(keep)" @keyup.esc="cancleEditing(keep)" />
        </div>
        <div v-else class="title-display" @click="editKeep(keep)">
        <h3 v-if="keep.title">{{keep.title}} </h3>
            Title...   
        </div>
    </div>
    <component :is="keep.type" :noteForEdit="keep.data" :checkListForEdit="keep.data" v-on:send-data="addDataToKeep"></component>
    <div class="keep-menu">
    
    <select v-model="keep.type" class="keep-type" title="type">
        <option disabled value="">Select Type</option>
        <option value="note">Note</option>
        <option value="checkList">Checklist</option>
    </select>
        <input type="color" v-model="keep.bgColor" class="color-picker" title="background color"/>
        <input type="file" @change="uploadNewImg" title="upload image" />
        <button class="btn-pin" title="pin" @click="pinKeep">
        <img src="https://img.icons8.com/color/48/000000/pin3.png">
        </button>
        <button class="btn-delete" title="delete" @click="deleteKeep">
        <img src="https://img.icons8.com/android/24/000000/trash.png">
        </button>
    </div>
<router-link to="/keep/main">
<button class="add-keep-btn" @click="addKeep">Add Keep</button>
</router-link>


    
    </section>
    `,
    props: [],
    data() {
        return {
            keep: null
        }
    },
    created() {
        const keepId = this.$route.params.keepId;
        keepService.getById(keepId)
        .then(keep => {
            this.keep = keep
            this.keep.isEditing = true;
            console.log(this.keep);
            
        })
        
    },
  
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },
    methods: {
        editKeep(keep) {
            this.titleBeforeEdit = keep.title;
            keep.isEditing = true;
        },
        stopEditing(keep) {
            keep.isEditing = false;
        },
        cancleEditing(keep) {
            keep.title = this.title.BeforeEdit;
            this.titleBeforeEdit = '';
            keep.isEditing = false;
        },
        uploadNewImg(ev) {
            this.handleImgFromInput(ev, this.addImageToKeep)
        },
        handleImgFromInput(ev, onImgReady) {
            var reader = new FileReader()
            reader.onload = function (event) {
                var img = new Image()
                img.onload = onImgReady.bind(null, img)
                img.src = event.target.result
            }
            reader.readAsDataURL(ev.target.files[0])
        },
        pinKeep() {
            this.keep.isPined = true;
        },
        addImageToKeep(img) {
            this.keep.img = img.src;
        },
        addKeep() {
            this.emitAddKeep()
            // if (this.keep.data.length === 0 && !this.keep.title) {
            //     let answer = confirm('are you sure? Your keep is empty');
            //     if (answer || !answer) return; // TODO: fixed this
                // else {
                    this.keep.date = Date.now()
                    keepService.saveKeep()
                    this.initialize()
                    //TODO: change router location from here
                // }
            // }
        },
        emitAddKeep() {
            eventBus.$emit('add-data', this.keep);
        },
        addDataToKeep(data) { 
            this.keep.data = data;
        },
        initialize() {
            eventBus.$emit('delete-data', this.keep);
            this.keep = keepService.getEmptyKeep()
            this.titleBeforeEdit = '';
        },
        deleteKeep() {
            this.initialize()
        }

    },
    computed: {

    },
    components: {
        checkList,
        note
    }
}

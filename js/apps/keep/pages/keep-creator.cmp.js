import { keepService } from '../../../services/keep.service.js';
import eventBus from '../../../event-bus.js';
import checkList from '../cmps/keep-checklist.cmp.js'
import note from '../cmps/keep-note.cmp.js'



export default {
    name: 'keepCreator',
    template: `
    <section class="creator-container flex" >
        <div class="btn-back" @click="saveKeep"><i class="fas fa-arrow-circle-left icon"></i></div>
        <h2>My Keep</h2>
        <div class="keep-creator" :style="{backgroundColor: keep.bgColor}" >
            <div v-if="keep.img" class="img-container">
                <img :src="keep.img" /> 
            </div>
            
            <div class="content-input">
                <div class="keep-title flex" @click="editKeep(keep)">
                    <div v-if="keep.isEditing">
                        <input class="title-edit input-field" type="text" placeholder="Subject... " v-model="keep.title"
                             @keyup.enter="stopEditing(keep)" @blur="stopEditing(keep)" @keyup.esc="cancleEditing(keep)" v-focus />
                    </div> 

                    <div v-else class="title-display" >
                        <div class="input-field" v-if="keep.title">{{keep.title}} </div>
                        <div v-else class="input-field">Subject...</div>     
                    </div>
                </div>
                <div class="content-component">
                <component :is="keep.type" v-on:send-data="addDataToKeep"></component>
                </div>
                </div>
            </div>

        <input title="Image Address" v-if="imgType==='url'" type="text" v-model="keep.img" placeholder="Image address..." />

            <div class="creator-menu">
            <div class="checklist-icon" :class="{active : keep.type === 'checkList'}" @click="changeToCheckList">
            <i class="fas fa-tasks icon"></i>
            </div>
          
            
                

               
                <div class="image-upload">
                <label for="file-input">
                <i class="fas fa-image icon"></i>
                </label>
                    <input id="file-input" type="file" @change="uploadNewImg" title="upload image"/>
                </div>

                <div class="color-picker">
                <label for="color-input">
                <i class="fas fa-palette icon" title="background color"></i>
                </label>
                    <input id="color-input" type="color" v-model="keep.bgColor" />
                </div>
               
                <div class="img-address"><i class="fas fa-link icon" @click="addImgUrl"></i></div>
                

                <div class="pin-icon" title="pin" @click="pinKeep" :class="{active : keep.isPined}">
                <i class="fas fa-thumbtack icon"></i>
                </div>
                <div class="btn-delete" title="delete" @click="deleteKeep">
                <i class="far fa-trash-alt icon"></i>
                </div>
            </div>
        <button class="save-keep-btn" @click="saveKeep">Save</button>
        
    </section>
    `,

    props: [],

    data() {
        return {
            keep: null,
            titleBeforeEdit: '',
            imgType: 'file'
        }
    },
    created() {
        keepService.query() // TODO: remove from here :)
        this.keep = keepService.getEmptyKeep()
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },

    methods: {
        changeToCheckList() {
            if (this.keep.type === 'checkList') {
                this.keep.type = 'note'
            }
            else {
                this.keep.type = 'checkList'
            }
        },
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
            this.keep.isPined = !this.keep.isPined;
        },
        addImageToKeep(img) {
            this.keep.img = img.src;
        },
        addImgUrl() {
            this.imgType = 'url'
        },
        saveKeep() {
            eventBus.$emit('add-data', this.keep);
            if(this.keep.type === 'note')
            if () {
                alert('Your keep is empty and will not be saved');
                this.$router.push('/keep/main')
                return;
            }
            else {
            this.keep.date = Date.now()
                keepService.addKeep(this.keep)
                this.initialize()
                this.$router.push('/keep/main')
        }
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


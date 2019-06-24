import {
    keepService
} from '../../../services/keep.service.js';
import eventBus from '../../../event-bus.js';
import checkList from '../cmps/keep-checklist.cmp.js'
import note from '../cmps/keep-note.cmp.js'

export default {
    name: 'keepEditor',
    template: `
    <section class="editor-container flex" v-if="keep">
        <div class="btn-back" @click="saveKeep"><i class="fas fa-arrow-circle-left icon"></i></div>  
        <h2>Editor</h2><i class="fas fa-pencil-alt icon" @click="editKeep(keep)"></i>

        <div class="keep-editor" v-if="keep" :style="{'backgroundColor': keep.bgColor}">
            <div v-if="keep.img" class="img-container">
                <img :src="keep.img" /> 
            </div>

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

                <component :is="keep.type" :noteForEdit="keep.data" :checkListForEdit="keep.data" v-on:send-data="addDataToKeep"></component>

                </div>
            </div>

        <input title="Image Address" v-if="imgType==='url'" type="text" v-model="keep.img" placeholder="Image address..." />
    
        <div class="editor-menu">
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
            imgType: 'file',
            lastContent: '',
            checkList: []
        }
    },
    created() {
        const keepId = this.$route.params.keepId;
        if (keepId) {
            keepService.getById(keepId)
                .then(keep => {
                    this.keep = keep
                    this.keep.isEditing = true;
                    console.log(this.keep);

                })
        }
        eventBus.$on('send-email-to-keep', (email) => {
            this.keep = {
                type: 'note',
                data: {
                    content: email.body,
                    isEditing: false,
                },
                title: email.subject,
                isPinned: false,
                bgColor: 'lightgray',
                img: null,
                isEditing: false,
                tag: ''
            }
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
        addImgUrl() {
            this.imgType = 'url'
        },
        saveKeep() {
            eventBus.$emit('add-data', this.keep);
            this.keep.date = Date.now()
            keepService.saveKeep(this.keep)
            this.initialize()
            this.$router.push('/keep/main')
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
        },
        changeToCheckList() {
            if (this.keep.type === 'checkList') {
                this.lastContent = '';
                this.checkList = this.keep.data;
                this.checkList.forEach(item => {
                    if (item.content) this.lastContent += item.content;
                })
                this.keep.type = 'note';
                this.keep.data = null;
                this.keep.data = keepService.getEmptyNote()
                this.keep.data.content = this.lastContent;
            } else {
                this.lastContent = this.keep.data.content;
                this.keep.data = null;
                this.keep.type = 'checkList';
                this.checkList.push(keepService.getEmptyCheckItem())
                this.keep.data = this.checkList;
                this.keep.data[0].content = this.lastContent;
            }
        },
    },
    components: {
        checkList,
        note
    }
}
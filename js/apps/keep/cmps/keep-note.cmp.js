import { keepService } from '../../../services/keep.service.js';
import eventBus from '../../../services/event-bus.service.js';

export default {
    name: 'note',
    template: `
        <section class="note-container">
        <div class="note-content flex">
        <label class="note-lable">Note:</label>
        <div v-if="note.isEditing">
            <input class="title-edit" type="text" placeholder="Enter note..." v-model="note.content"
                @keyup.enter="stopEditing(note)" @blur="stopEditing(note)" @keyup.esc="cancleEditing(note)" v-focus />
        </div>
        <div v-else class="note-display" @click="editNote(note)">
            {{note.content}}
        </div>
    </div>

        </section>
    `,

    props: ['noteForEdit'],

    data() {
        return {
            note: null,
            contentBeforeEdit: '',
        }
    },
    created() {
        if(this.noteForEdit) {
            this.note = this.noteForEdit
        }
        else this.note = keepService.getEmptyNote()
        eventBus.$on('add-data', this.addNote);
        eventBus.$on('delete-data', this.initialize)
        // console.log(this.note)
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },

    methods: {
        editNote(note) {
            this.contentBeforeEdit = note.console;
            note.isEditing = true;
        },
        stopEditing(note) {
            note.isEditing = false;
        },
        cancleEditing(note) {
            note.content = this.title.contentBeforeEdit;
            this.contentBeforeEdit = '';
            note.isEditing = false;
        },
        addNote(keep) {
            if (keep.type === 'note') {
                this.emitNote();
                this.initialize();
            }
            else return;
        },
        emitNote() {
            this.$emit('send-data', this.note)
        },
        initialize(){
            this.note = keepService.getEmptyNote()
            this.contentBeforeEdit = '';
        }
    },
    computed: {
    },
    components: {

    }
}
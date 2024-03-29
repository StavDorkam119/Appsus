import {
    keepService
} from '../../../services/keep.service.js';
import eventBus from '../../../event-bus.js';

export default {
    name: 'note',
    template: `
    <section class="note-container">
    <div class="note-content flex" @click="editNote(note)">
        <div v-if="note.isEditing">
            <textarea placeholder="Note..." class="input-field" type="text" v-model="note.content" @keyup.enter="stopEditing(note)"
                @blur="stopEditing(note)" @keyup.esc="cancleEditing(note)" v-focus>
                    Note...
            </textarea>
        </div>
            <div v-else class="note-display" >
                <div v-if="note.content" class="input-field">{{note.content}} </div>
                <div v-else class="input-field">Note...</div>
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
        if (this.noteForEdit) {
            this.note = this.noteForEdit
        } else this.note = keepService.getEmptyNote()
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
            } else return;
        },
        emitNote() {
            this.$emit('send-data', this.note)
        },
        initialize() {
            this.note = keepService.getEmptyNote()
            this.contentBeforeEdit = '';
        }
    },
    computed: {},
    components: {

    }
}
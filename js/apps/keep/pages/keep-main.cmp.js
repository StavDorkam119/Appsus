import {
    keepService
} from '../../../services/keep.service.js';
import keepList from '../cmps/keep-list.cmp.js';
import keepFilter from '../cmps/keep-filter.cmp.js';
import keepSort from '../cmps/keep-sort.cmp.js';
import eventBus from '../../../event-bus.js';


export default {
    name: 'keepMainApp',
    template: `
    <section class="keep-main">
        <div class="main-menu-container flex wrap"> 
            <router-link to="/keep/creator">
                <div class="new-keep-btn"> New Keep... <i class="fas fa-pencil-alt"></i></div>
            </router-link>
            <keep-filter v-on:filtered="setFilter"></keep-filter>
        </div>
       
        
      
        <keep-list :keeps="keepsForDisplay"></keep-list>
       
    </section>
    `,
    data() {
        return {
            keeps: null,
            filteredKeeps: null
        }
    },
    methods: {
        setFilter(filterBy) {
            filterBy.txt.toLowerCase();
            this.filterbyTxt(filterBy.txt)
        },
        filterbyTxt(txt) {
            this.filteredKeeps = this.keeps.filter(function (keep) {
                return (keep.title.includes(txt) || keep.tag.includes(txt))
            })
        },
        setSort(value) {
            console.log('setting sort', value);
        },
        deleteKeep(idx) {
            keepService.deleteKeep(idx)
        }
    },
    computed: {
        keepsForDisplay() {
            if (!this.filteredKeeps) return this.keeps
            else return this.filteredKeeps
        },
    },
    components: {
        keepList,
        keepFilter,
        keepSort
    },
    created() {
        eventBus.$on('deleted', this.deleteKeep);
        keepService.query()
            .then(res => this.keeps = res)
    }
}
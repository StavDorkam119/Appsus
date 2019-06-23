import { keepService } from '../../../services/keep.service.js';
import { utilService } from '../../../services/util.service.js';
import keepList from '../cmps/keep-list.cmp.js';
import keepFilter from '../cmps/keep-filter.cmp.js';
import keepSort from '../cmps/keep-sort.cmp.js';


export default {
    name: 'mainApp',
    template: `
    <section class="keep-main">
        <h1>Main</h1>
        <router-link to="/keep/creator"> Create keep </router-link>
        <keep-filter v-on:filtered="setFilter"></keep-filter>
        <keep-sort v-on:sorted="setSort" ></keep-sort>
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
        keepService.query()
            .then(res => this.keeps = res)
    }
}





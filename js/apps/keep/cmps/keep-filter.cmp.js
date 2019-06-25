import keepSort from '../cmps/keep-sort.cmp.js';
export default {
    template: `
        <section class="keep-filter flex">
            <label for="search-keep" class="search-keep">
                <input type="search" id="search-keep" v-model="filterBy.txt" @input="emitFilter"/>
                <i class="fas fa-search"></i>
            </label>
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
            }
        }
    },
    methods: {
        emitFilter() {
            this.$emit('filtered', {
                txt: this.filterBy.txt
            });
        }
    }

}
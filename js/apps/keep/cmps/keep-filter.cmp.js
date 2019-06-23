
export default {
    template: `
        <section class="keep-filter flex">
            <input type="search" v-model="filterBy.txt" @input="emitFilter" placeholder="Search keep..."/>
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
            this.$emit('filtered', { txt: this.filterBy.txt });
        }
    }

}
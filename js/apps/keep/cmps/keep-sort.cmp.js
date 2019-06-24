
export default {
    template: `
        <section class="sort-container">
        <label for="sort">Sort</label>
        <select id="sort" @change="emitSort" v-model="sortBy" class="keep-sort">
        <option value="A-Z">A-Z</option>
        </select>
        </section>
    `,
    data() {
        return {
           sortBy: ''
        }
    },
    methods: {
        emitSort() {
            this.$emit('sorted', this.sortBy);
        }
    }
}
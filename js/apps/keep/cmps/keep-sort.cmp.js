
export default {
    template: `
        <section class="keep-sort flex">
        <label>sort by:</label>
        <select @change="emitSort" v-model="sortBy">
        <option value="A-Z">A-Z</option>
        <option value=""></option>
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
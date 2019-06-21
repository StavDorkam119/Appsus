import eventBus from '../../../services/event-bus.service.js';

export default {
    name: 'emailFilter',
    template: ` 
        <section class="email-filter-container">
            <form @submit.prevent> 
            <input id="email-filter-search" type="search" v-model.lazy="filter.searchTerm" placeholder="Search"/>
            <select v-model="filter.sortOptions">
                <option>All</option>
                <option>Date</option>
                <option>Title</option>
            </select>
            <label for="email-filter-is-read">Read/Unread</label>
            <input id="email-filter-is-read" type="checkbox" v-model="filter.isRead" />
            </form>
        </section>`,
    data() {
        return {
            filter: {
                searchTerm: '',
                sortOptions: 'All',
                isRead: false,
            }
        }
    },
    computed: {

    },
    watch: {
        'filter': {
            handler(filter) {
                eventBus.$emit('filter-emails', filter);
            },
            deep: true
        }
    }
}
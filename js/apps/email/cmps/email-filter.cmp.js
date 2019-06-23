import eventBus from '../../../services/event-bus.service.js';

export default {
    name: 'emailFilter',
    template: ` 
        <section class="email-filter-container">
            <form @submit.prevent> 
            <input id="email-filter-search" type="search" v-model.lazy="filter.searchTerm" placeholder="Search"/>
            <select v-model="filter.filterOptions">
                <option value="none">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>
            <select v-model="filter.sortOptions">
                <option value="none">None</option>
                <option value="name">Name</option>
                <option value="title">Title</option>
                <option value="date">Date</option>
            </select>
            </form>
        </section>`,
    created() {
        eventBus.$on('update-filter', update => {
            if (update === 'none') this.filter.isStarredOn = false;
            else if (update === 'starred') this.filter.isStarredOn = true;
            // else if (update === )
        })
    },
    data() {
        return {
            filter: {
                searchTerm: '',
                filterOptions: 'none',
                sortOptions: 'none',
                isStarredOn: false,
                showSent: false,
                showDrafts: false
            }
        }
    },
    computed: {

    },
    watch: {
        'filter': {
            handler(filter) {
                // debugger;
                
                eventBus.$emit('filter-emails', filter);
            },
            deep: true
        }
    }
}
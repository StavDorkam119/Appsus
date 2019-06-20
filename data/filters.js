
export const filters = {
    cmps: [
        {
            type: 'email',
            pageUrl: '/email',
            cmpInfo: {
                template: `
                <section>
                    <label for="email-filter-search">Search</label>
                    <input id="email-filter-search" type="search" v-model="searchTerm"/>
                    <select v-model="sortOptions">
                        <option>All</option>
                        <option>Date</option>
                        <option>Title</option>
                    </select>
                    <label for="email-filter-is-read">Read/Unread</label>
                    <input id="email-filter-is-read" type="checkbox" v-model="isRead" />
                </section>`,
                data () {
                    return {
                        searchTerm: '',
                        sortOptions: 'All',
                        isRead: false,
                    }
                }
            }
        }
    ]
}

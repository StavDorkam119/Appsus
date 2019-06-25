import keepPrev from './keep-prev.cmp.js';

export default {
    name: 'keepList',
    template: `
    <section class="keep-list">
        <h4 v-if="isPinnedKeeps">#Pinned</h4>
        <div class="pinned-container masonry">
            <div v-for="(keep, idx) in keeps" v-if="keep.isPined" class="box">
                <keep-prev :keep="keep" :idx="idx"></keep-prev>
            </div>
        </div>    
        <h4 v-if="isPinnedKeeps">#Other</h4>
        <div class="masonry">
            <div v-for="(keep, idx) in keeps" v-if="!keep.isPined" class="box">
                <keep-prev :keep="keep" :idx="idx"></keep-prev>
            </div>
        </div>
    </section>
    `,

    props: ['keeps'],

    data() {
        return {

        }
    },
    created() {     
    },

    methods: {

    },
    computed: {
        isPinnedKeeps() {
            if(this.keeps) return this.keeps.some(keep => keep.isPined);
        }
        

    },
    components: {
        keepPrev
    }
}
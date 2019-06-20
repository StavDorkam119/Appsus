
import {keepService} from '../services/keep.service.js';

export default {
    name: 'keepApp',
    template:`
    <section class="keep-app-container">
        <h1>Keep App</h1>
        <div class="keeps-container" >
        <div class="keep-item" v-for="keep in keeps">
        {{keep.title}}
        <img src=""/>
        </div>
        </div>
    </section>`,

    data() {
        return {
            keeps: null,
        }
    },
    methods: {

    },
    computed: {
        
    },
    
    created() {
        keepService.query()
            .then(res => this.keeps = res) 
    }

}


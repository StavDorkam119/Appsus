
import {keepService} from '../services/keep.service.js';

export default {
    name: 'keepApp',
    template:`
    <section class="keep-app-container">
        <h1>Keep App</h1>
        <div v-for="keep in keeps">{{keep.title}}</div>
    </section>`,

    data() {
        return {
            keeps: null,
        }
    },
    
    
    created() {
        keepService.query()
            .then(res => this.keeps = res) 
    }

}

import {keepService} from '../services/keep.service.js';

export default {
    name: 'keepApp',
    template:`
    <section class="keep-app-container">
        <h1>Keep App</h1>
    </section>`,
    
    created() {
        keepService.query()
            .then(res => console.log('res', res))
    }

}
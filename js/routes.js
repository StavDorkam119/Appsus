// import homeCmp from './'

import homeCmp from './main-pages/home.cmp.js';
import aboutCmp from './main-pages/about.cmp.js';
import emailApp from './main-pages/email-app.cmp.js';
import keepApp from './main-pages/keep-app.cmp.js';
import emailDetailsCmp from './apps/email/pages/email-details.cmp.js';


export default [
    {path: '/', component: homeCmp},
    {path: '/about', component: aboutCmp},
    {path: '/keep', component: keepApp},
    {path: '/email', component: emailApp},
    {path: '/email/:emailId', component: emailDetailsCmp}
]
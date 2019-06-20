// import homeCmp from './'

import homeCmp from './main-pages/home.cmp.js';
import aboutCmp from './main-pages/about.cmp.js';
import emailApp from './main-pages/email-app.cmp.js';
import keepApp from './main-pages/keep-app.cmp.js';


export default [
    {path: '/', component: homeCmp},
    {path: '/about', component: aboutCmp},
    {path: '/email', component: emailApp},
    {path: '/keep', component: keepApp}
]
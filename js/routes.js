// import homeCmp from './'

import homeCmp from './main-pages/home.cmp.js';
import aboutCmp from './main-pages/about.cmp.js';
import emailApp from './main-pages/email-app.cmp.js';
import emailDetailsCmp from './apps/email/pages/email-details.cmp.js';
import emailComposeCmp from './apps/email/pages/email-maker.cmp.js';
import keepApp from './main-pages/keep-app.cmp.js';
import keepMain from './apps/keep/pages/keep-main.cmp.js';
import keepEditor from './apps/keep/pages/keep-editor.cmp.js';
import keepCreator from './apps/keep/pages/keep-creator.cmp.js';

export default [
    {path: '/', component: homeCmp},
    {path: '/about', component: aboutCmp},
    {path: '/keep', component: keepApp, children:
    [
        {path: 'main', component: keepMain},
        {path: 'editor/:keepId', component: keepEditor},
        {path: 'creator', component: keepCreator}
    ]},
    {path: '/email', component: emailApp},
    {path: '/email/compose/', component: emailComposeCmp},
    {path: '/email/:emailId', component: emailDetailsCmp},
]
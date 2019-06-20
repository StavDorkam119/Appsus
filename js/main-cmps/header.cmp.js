'use strict';

export default {
    name: 'appHeader',
    template: `
        <header class="app-header">
            <div class="logo">
                <img src="imgs/logo.svg"/>
                <h1>Appsus</h1>
            </div>
            <h1>Filter?</h1>
            <label for="header-nav-toggler-label">Input Nav</label>
            <input type="checkbox" id="header-nav-toggler" />
            <nav>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Email</li>
                    <li>Keep</li>
                </ul>
            </nav> 
        </header>
    `,
}
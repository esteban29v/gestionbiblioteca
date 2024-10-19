import {logout} from './authentication/login.js'

document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById('logout') as HTMLAnchorElement;

    boton.addEventListener('click', (event) => {
        event.preventDefault();
        logout();
    });
});
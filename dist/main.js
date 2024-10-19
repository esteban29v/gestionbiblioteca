import { logout } from './authentication/login.js';
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById('logout');
    boton.addEventListener('click', (event) => {
        event.preventDefault();
        logout();
    });
});

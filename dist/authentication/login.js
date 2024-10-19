import { ROOT_URL } from '../config.js';
function getUsersFromLocalStorage() {
    const usersJSON = localStorage.getItem("users");
    if (!usersJSON) {
        return [];
    }
    return JSON.parse(usersJSON);
}
export function logout() {
    localStorage.removeItem('authToken');
    window.location.href = `${ROOT_URL}src/authentication/login.html`;
}
export function authenticateUser(email, password) {
    const users = getUsersFromLocalStorage();
    const userFound = users.find(user => user.email === email && user.password === password);
    if (userFound !== undefined) {
        localStorage.setItem("authToken", email);
        window.location.href = `${ROOT_URL}index.html`;
    }
    else {
        alert("Credenciales incorrectas. Por favor intente de nuevo.");
    }
}
function handleLoginSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    authenticateUser(email, password);
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (form !== null) {
        form.addEventListener("submit", handleLoginSubmit);
    }
});

import { ROOT_URL } from '../config.js';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

function getUsersFromLocalStorage(): User[] {
    const usersJSON = localStorage.getItem("users");
    if (!usersJSON) {
        return [];
    }

    return JSON.parse(usersJSON) as User[];
}

export function logout() {
    localStorage.removeItem('authToken');
    window.location.href = `${ROOT_URL}src/authentication/login.html`;
}

export function authenticateUser(email: string, password: string): void {
    const users = getUsersFromLocalStorage();

    const userFound = users.find(user => user.email === email && user.password === password);

    if (userFound !== undefined) {
        localStorage.setItem("authToken", email);
        window.location.href = `${ROOT_URL}index.html`;
    } else {
        alert("Credenciales incorrectas. Por favor intente de nuevo.");
    }
}

function handleLoginSubmit(event: Event): void {
    event.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    authenticateUser(email, password);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm") as HTMLFormElement;

    if (form !== null) {
        form.addEventListener("submit", handleLoginSubmit);
    }
});
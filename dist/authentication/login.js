function getUsersFromLocalStorage() {
    const usersJSON = localStorage.getItem("users");
    if (!usersJSON) {
        return [];
    }
    return JSON.parse(usersJSON);
}
export function authenticateUser(email, password) {
    const users = getUsersFromLocalStorage();
    const userFound = users.find(user => user.email === email && user.password === password);
    if (userFound !== undefined) {
        localStorage.setItem("authToken", email);
        window.location.href = "../index.html";
    }
    else {
        alert("Credenciales incorrectas123. Por favor intente de nuevo.");
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

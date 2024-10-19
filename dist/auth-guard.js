"use strict";
const relativePath = window.location.pathname;
console.log(relativePath);
function isAuthenticated() {
    const token = localStorage.getItem("authToken");
    return token !== null;
}
function redirectToLogin() {
    const currentPath = window.location.pathname;
    const loginPath = currentPath.includes("authentication/")
        ? "src/authentication/login.html"
        : "src/authentication/login.html";
    window.location.href = loginPath;
}
document.addEventListener("DOMContentLoaded", () => {
    if (!isAuthenticated()) {
        redirectToLogin();
    }
});

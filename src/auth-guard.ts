const relativePath = window.location.pathname;
console.log(relativePath);
function isAuthenticated(): boolean {
    const token = localStorage.getItem("authToken");
    return token !== null;
}

function redirectToLogin(): void {
    const currentPath = window.location.pathname;

    const loginPath = currentPath.includes("/authentication/")
        ? "login.html"
        : "authentication/login.html";

    window.location.href = loginPath;
}

document.addEventListener("DOMContentLoaded", () => {
    if (!isAuthenticated()) {
        redirectToLogin();
    }
});

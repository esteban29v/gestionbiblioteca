import { authenticateUser } from './login.js';
let users = [];
function validateRegistrationForm(name, surname, email, password) {
    const errors = [];
    if (!name.trim()) {
        errors.push("El nombre es requerido.");
    }
    if (!surname.trim()) {
        errors.push("El apellido es requerido.");
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        errors.push("El correo electrónico no es válido.");
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
    if (!passwordPattern.test(password)) {
        errors.push("La contraseña debe tener al menos 8 caracteres, con al menos una mayúscula y una minúscula.");
    }
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
        errors.push("El correo electrónico ya está registrado.");
    }
    return errors;
}
function getFormData() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = { firstName, lastName, email, password };
    return user;
}
function saveUsersToLocalStorage() {
    const usersJSON = JSON.stringify(users);
    localStorage.setItem("users", usersJSON);
}
function handleFormSubmit(event) {
    event.preventDefault();
    const newUser = getFormData();
    const validationErrors = validateRegistrationForm(newUser.firstName, newUser.lastName, newUser.email, newUser.password);
    if (validationErrors.length > 0) {
        alert(validationErrors.join("\n"));
    }
    else {
        users.push(newUser);
        saveUsersToLocalStorage();
        authenticateUser(newUser.email, newUser.password);
        document.getElementById("registerForm").reset();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    form.addEventListener("submit", handleFormSubmit);
});

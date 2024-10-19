import {authenticateUser} from './login.js';

console.log(authenticateUser('asd', 'asd'))

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

let users: User[] = [];

function validateRegistrationForm(name: string, surname: string, email: string, password: string): string[] {
    const errors: string[] = [];

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

    const passwordPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
    if (!passwordPattern.test(password)) {
        errors.push("La contraseña debe tener al menos 8 caracteres, con al menos una mayúscula y una minúscula.");
    }

    return errors;
}


function getFormData(): User {
    const firstName = (document.getElementById("firstName") as HTMLInputElement).value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const user: User = { firstName, lastName, email, password };
    return user;
}

function saveUsersToLocalStorage(): void {
    const usersJSON = JSON.stringify(users);
    localStorage.setItem("users", usersJSON);
}

function handleFormSubmit(event: Event): void {
    event.preventDefault();
    const newUser = getFormData();

    const validationErrors = validateRegistrationForm(newUser.firstName, newUser.lastName, newUser.email, newUser.password);

    if (validationErrors.length > 0) {
        alert(validationErrors.join("\n"));
    } else {
        users.push(newUser);
        saveUsersToLocalStorage();
        alert("Usuario creado correctamente");
        (document.getElementById("registerForm") as HTMLFormElement).reset();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm") as HTMLFormElement;
    form.addEventListener("submit", handleFormSubmit);
});

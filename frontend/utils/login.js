import handleAuthentication from "./handleAuth.js";

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const feedback = document.querySelector("#login-form .feedback")
    const email = document.querySelector("#login-form #email").value;
    const password = document.querySelector("#login-form #password").value;

    const userData = {
        email,
        password
    }

    handleAuthentication("http://localhost:3000/api/auth/login", userData, feedback)
})



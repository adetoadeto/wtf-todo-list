import handleAuthentication from "./handleAuth.js";

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const feedback = document.querySelector("#signup-form .feedback")
    const username = document.querySelector("#signup-form #username").value;
    const email = document.querySelector("#signup-form #email").value;
    const password = document.querySelector("#signup-form #password").value;

    const userData = {
        username,
        email, 
        password
    }

    let modalType = "sign-up"
    handleAuthentication("http://localhost:3000/api/auth/signup", userData, feedback, modalType )
})



const BASE_URL = "https://todoapp-bydf.onrender.com/api/auth";
//const BASE_URL = "http://localhost:3000/api/auth";

export default async function handleAuthentication (endpoint, userData, feedback, modalType="") {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        const data = await response.json()

        if (!response.ok) {
            feedback.classList.add("error")
            feedback.textContent = data.message
        } else {
            feedback.classList.add("valid")
            feedback.textContent = data.message

            localStorage.setItem("user", JSON.stringify({signedIn: true}))
            
            {modalType && setTimeout(() => {
                window.location.href = "../pages/login.html"
            }, 1000)};
            clearTimeout();
            
        }
    } catch (err) {
        console.log(err)
    }
}


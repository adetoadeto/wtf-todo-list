const BASE_URL = "https://todoapp-bydf.onrender.com/api/auth";

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
            }, 1500)};
            clearTimeout();
            
        }
    } catch (err) {
        console.log(err)
    }
}


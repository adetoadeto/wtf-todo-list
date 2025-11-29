const taskForm = document.querySelector("#add-task");
const feedback = document.querySelector("#add-task .feedback")
const userSignedIn = JSON.parse(localStorage.getItem("user")) || []
const BASE_URL = "https://todoapp-bydf.onrender.com"

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    if (!userSignedIn.userSignedIn) {
        window.location.href = "../pages/login.html";
        return;
    }
    const taskName = document.querySelector("#add-task #name").value;
    const taskDescription = document.querySelector("#add-task #description").value;
    const dueDate = document.querySelector("#add-task #due-date").value;
    const dueTime = document.querySelector("#add-task #due-time").value;
  
    try {
        const response = await fetch(`${BASE_URL}/api/task/create`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: taskName, description: taskDescription, dueDate, dueTime })
        })

        const data = await response.json();

        if (!response.ok) {
            feedback.classList.add("error")
            feedback.textContent = data.message

        } else {
            feedback.classList.add("valid")
            feedback.textContent = `${data.message} Redirecting...`
            
            setTimeout(() => {
                window.location.href = "../index.html"
            }, 1500)
        };
    }

    catch (err) {
        console.log(err)
    }

})

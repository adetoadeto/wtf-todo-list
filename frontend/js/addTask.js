const taskForm = document.querySelector("#add-task");
const feedback = document.querySelector("#add-task .feedback")

const BASE_URL = "https://todoapp-bydf.onrender.com"
//const BASE_URL = "http://localhost:3000";

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const taskName = document.querySelector("#add-task #name").value;
    const taskDescription = document.querySelector("#add-task #description").value;
    const dueDate = document.querySelector("#add-task #due-date").value;
    const dueTime = document.querySelector("#add-task #due-time").value;
  
    try {
        const data = await fetch(`${BASE_URL}/api/task/create`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: taskName, description: taskDescription, dueDate, dueTime })
        })

        const response = await data.json();

        if (!data.ok) {
            feedback.classList.add("error")
            feedback.textContent = response.message

        } else {
            feedback.classList.add("valid")
            feedback.textContent = `${response.message} Redirecting...`
            
            setTimeout(() => {
                window.location.href = "../index.html"
            }, 1500)
        };
    }

    catch (err) {
        console.log(err)
    }

})

// if (dueDate >= currentDate) {
//     if (dueTime < currentTime) {
//         console.log("time don pass")
//     }
// } else {
//     console.log("day don pass")
// }
const taskId = new URLSearchParams(window.location.search).get("id")

//fetch task by Id
async function fetchTaskById (taskId) {
     try {
        const response = await fetch(`http://localhost:3000/api/task/${taskId}`)
        const data = await response.json()
      
        populateForm(data)
      } catch (err) {
        console.log(err.message)
      }
}
fetchTaskById(taskId)

//populate form with existing data
function populateForm (data) {
    document.querySelector("#update-task #name").value = data.title;

    document.querySelector("#update-task #description").value = data.description;

    document.querySelector("#update-task #due-date").value = data.dueDate;

    document.querySelector("#update-task #due-time").value = data.dueTime;
}

//update task by id
const updateForm = document.querySelector("#update-task");
const feedback = document.querySelector("#update-task .feedback")

updateForm.addEventListener("submit", async (e)=> {
    e.preventDefault()

    const taskName = document.querySelector("#update-task #name").value;

    const taskDescription = document.querySelector("#update-task #description").value;

    const dueDate = document.querySelector("#update-task #due-date").value;

    const dueTime = document.querySelector("#update-task #due-time").value;

    try {
        const response = await fetch(`http://localhost:3000/api/task/update/${taskId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: taskName, description: taskDescription, dueDate, dueTime})
        })
        const data = await response.json()
        
        if (!response.ok) {
            feedback.classList.add("error")
            feedback.textContent = data.message

        } else {
            feedback.classList.add("valid")
            feedback.textContent = `${data.message} Redirecting...`
            
            setTimeout(() => {
                window.location.href = "../index.html"
            }, 1000)
        };
    } catch (err) {
        console.log(err.message)
    }      
})



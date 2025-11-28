const navBtn = document.querySelector("nav button")
const userSignedIn = JSON.parse(localStorage.getItem("user")) || []

//handle loggedIn
if (userSignedIn.signedIn) {
    navBtn.innerHTML = "Logout"
}
// handle loggedOut
navBtn.addEventListener("click", () => {
    if (userSignedIn.signedIn) {
        localStorage.clear()
        navBtn.innerHTML = `<a href="./pages/login.html">Login</a>`
    }
})

//display all task
async function showAllTasks() {
    try {
        const response = await fetch("http://localhost:3000/api/task/all-tasks")

        const data = await response.json();

        if (response.ok) {
            todoItem(data)
        }

    } catch (err) {
        console.log(err.message)
    }
}
showAllTasks()

function todoItem(data) {
    const parentElement = document.querySelector(".todos")

    //icons
    const icons = {
        pending: "fa-solid fa-clock-rotate-left",
        completed: "fa-solid fa-circle-check",
        overdue: "fa-solid fa-circle-exclamation"
    }

    data.map((item) => {

        const todoItem = document.createElement("div")
        todoItem.className = "todo"

        todoItem.innerHTML =
          `
          <input type="checkbox" name="checkbox" class="checked" title="Select todo to mark as completed, pending or delete task"> 
          <div class="todo__todo-items ${item.status}"> 
              <div class="heading">
                <div>
                    <a href="./pages/updateTask.html?id=${item._id}" class="edit" title="Click to edit todo"><i class="fa-solid fa-pencil"></i></a>
                    <strong class="name">${item.title}</strong>
                </div>    
                <i class="${icons[item.status]}"></i>
            </div>

            <p>${item.description}</p>
            <p class="due">
                <i class="fa-regular fa-calendar-days"></i> ${item.dueDate}; ${item.dueTime}
            </p>
          </div>`
           

        parentElement.appendChild(todoItem)
    })
}

//mark as completed 
const completedBtn = document.querySelector(".action__btns .completed");
completedBtn.addEventListener("click", ()=> {
    handleActionBtns("PATCH", "status-update/completed")
})

//mark as pending 
const pendingBtn = document.querySelector(".action__btns .pending");
pendingBtn.addEventListener("click", ()=> {
    handleActionBtns("PATCH", "status-update/pending")
})

//deleteTask
const deleteBtn = document.querySelector(".action__btns .delete");
deleteBtn.addEventListener("click", ()=> {
    handleActionBtns("DELETE", "delete")
})

async function handleActionBtns (method, endpoint) {
    console.log("clicked")
    const todoIds = []
    const allTodos = document.querySelectorAll(".checked")

    for (let todo of allTodos) {
        if (todo.checked) {

            const todoId = todo.parentElement.parentElement.parentElement.querySelector("a").href.split("?")[1].split("=")[1]

            todoIds.push(todoId)
        }
    }

    try { 
        const response = await fetch(`http://localhost:3000/api/task/${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(todoIds)
        })
        const data = await response.json()
        if (response.ok) {
           window.location.href = "./index.html" 
        }
        console.log(data)
    } catch (err) {
        console.log(err.message)
    }
}









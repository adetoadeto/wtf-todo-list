const navBtn = document.querySelector("nav button")
const select = document.querySelector(".main-header__sort select")
const completedBtn = document.querySelector(".action__btns .completed");
const pendingBtn = document.querySelector(".action__btns .pending");
const deleteBtn = document.querySelector(".action__btns .delete");
const parentElement = document.querySelector(".todos");
const feedback = document.querySelector(".main-body .feedback")
const userSignedIn = JSON.parse(localStorage.getItem("user")) || []
const icons = {
        pending: "fa-solid fa-clock-rotate-left",
        completed: "fa-solid fa-circle-check",
        overdue: "fa-solid fa-circle-exclamation"
}
const dateToday = new Date().toISOString().split("T")[0]
const BASE_URL = "https://todoapp-bydf.onrender.com"

//handle login status
function loggedInStatus() {
    if (userSignedIn.signedIn) {
        navBtn.innerHTML = "Logout"
    }

    navBtn.addEventListener("click", () => {
        if (userSignedIn.signedIn) {
            localStorage.clear()
            navBtn.innerHTML = `<a href="./pages/login.html">Login</a>`
            parentElement.innerHTML = ""
            feedback.innerHTML = '<a href="./pages/signUp.html">Create an account </a> to get started. Returning user? <a href="./pages/login.html">Login</a> to view tasks.'
        }
    })
}
loggedInStatus()

//display all todos
async function fetchTodos() {
    if (!userSignedIn.signedIn) {
       return;
    }
    try {
        const response = await fetch(`${BASE_URL}/api/task/all-tasks`, {
            credentials: "include"
        })

        const data = await response.json();

        if (response.ok) {
            feedback.textContent = ""
            renderTodos(data)
        } 
    } catch (err) {
        console.log(err.message)
    }
}
fetchTodos()

//sort by selection
select.addEventListener("change", async (e) => {
    const sortBy = e.target.value

    try {
        const response = await fetch(`${BASE_URL}/api/task/all-tasks`, {
            credentials: "include"
        })

        const data = await response.json();

        if (response.ok) {
            parentElement.innerHTML = ""
            renderTodos(data, sortBy)
        }
    } catch (err) {
        console.log(err.message)
    }
})

//mark task(s) as completed 
completedBtn.addEventListener("click", () => {
  
    handleActionBtns("PATCH", "status-update/completed")
})

//mark task(s) as pending 
pendingBtn.addEventListener("click", () => {
    handleActionBtns("PATCH", "status-update/pending")
})

//deleteTask(s)
deleteBtn.addEventListener("click", () => {
    let confirm = window.confirm("Proceed to delete? ")
    if (confirm) {
        handleActionBtns("DELETE", "delete")
    }
})

//handle notifications
async function handleNotifications() {
    if (!userSignedIn.signedIn) {
       return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/task/all-tasks`, {
            credentials: "include"
        })

        const data = await response.json();

        for (let item of data) {
            if (item.dueDate === dateToday) {
              alert(`Task due: ${item.title} ${item.dueTime}`)
            }
        }
    } catch (err) {
        console.log(err.message)
    }
}

handleNotifications()


//Reusable functions
function sorting(data, sortBy) {
   
    if (sortBy === "overdue") {
        overdueTasks = []
        
        const pendingTasks = data.filter((item) => item.status === "pending")

        pendingTasks.map((item) => {
            if (item.dueDate < dateToday) {
                overdueTasks.push(item)
            }
        })
        return overdueTasks;
    } else if (sortBy === "date"){
        const sortedTask = data.sort((a, b)=> new Date(a.dueDate) - (new Date(b.dueDate)))
        return sortedTask
    
    } else {
        const sortedTask = data.filter((item) => item.status === sortBy);
        return sortedTask;
    }
}

function renderTodos(data, sortBy) {
    if (sortBy === "all") {
        sortBy = ""
    }

    if (sortBy) {
        data = sorting(data, sortBy) 
    }

    data.map((item) => {
        if (item.status === "pending" && item.dueDate < dateToday) {
            item.status = "overdue"
        }

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

async function handleActionBtns(method, endpoint) {

    const todoIds = []
    const allTodos = document.querySelectorAll(".checked")

    for (let todo of allTodos) {
        if (todo.checked) {
            const todoId = todo.nextElementSibling.querySelector(".heading a").href.split("=")[1]
            todoIds.push(todoId)
        } 
    }

    try {
        const response = await fetch(`${BASE_URL}/api/task/${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(todoIds)
        })
        const data = await response.json()
        if (response.ok) {
            alert(data.message)
            window.location.href = "./index.html"
        }
    } catch (err) {
        console.log(err.message)
    }
}













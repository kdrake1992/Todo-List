// Imports CSS
import './style.css'

// Fontawesome Free
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

// Import date-fns webpack
import {compareDesc, format, add } from 'date-fns';

// Factory Function Todo Item
const itemToDo = (title, details, dueDate, priority) => {
    title = title;
    details = details;
    dueDate = dueDate;
    priority = priority;
    let checklist = "no";

    const setTitle = (newTitle) => {
        obj.title = newTitle;
    };
    const setDetails = (newDetails) => {
        obj.details = newDetails;
    };
    const setDueDate = (newDueDate) => {
        obj.dueDate = newDueDate;
    };
    const setPriority = (newPriority) => {
        obj.priority = newPriority;
    };
    const setCheck = (check) => {
        if(check === "yes") {
            obj.checklist = "yes"
        }
        else {
            obj.checklist = "no"
        };
    };
    const obj = {title, details, dueDate, priority, checklist, setTitle, setDetails,
        setDueDate, setPriority, setCheck};

    return obj;
}

let first = itemToDo("Clean Room", "Clean room, its been a few days.", format(new Date(2022, 7, 21),'M/dd/yy'), "Low");
let third = itemToDo("Cut Grass", "Grass is getting tall.", format(new Date(2022, 8, 20),'M/dd/yy'), "Medium");
let fifth = itemToDo("Study Japanese", "JLPT test soon.", format(new Date(2022, 11, 4),'M/dd/yy'), "High");

// Create projects or lists of of todo items.
const project = () => {
    let toDoItems = [];

    const addItem = (item) => {
        itemList.toDoItems.push(item);
    };

    const removeItem = (item) => {
        let newList = itemList.toDoItems.filter(e => e.title !== item);
        itemList.toDoItems = newList;
    };

    const findItem = (item) => {
        let foundItem = itemList.toDoItems.filter(e => e.title === item);

        return foundItem[0];
    };

    const itemList = {toDoItems, addItem, removeItem, findItem}

    return itemList;
}

// Create default projects; all, this week, and important
const allProjects = project();
const todaysTasks = project()
const thisWeeksTasks = project();
const importantTasks = project();
let projects = [];


// Filler data
allProjects.addItem(first);
allProjects.addItem(third);
allProjects.addItem(fifth);

// DOM for the body
const body = document.body;

const topMenu = document.createElement('div');
topMenu.classList.add("topMenu");

const sideMenu = document.createElement('div');
sideMenu.classList.add("sideMenu");

const main = document.createElement('div');
main.classList.add("main");

const footer = document.createElement('div');
footer.classList.add("footer");

// Initial loadup
const start = function() {
    const initial = [];

    initial.push(top());
    initial.push(side());
    initial.push(mid());
    initial.push(foot());
    
    return initial;
}

const top = function() {
    topMenu.innerHTML = 
    `

    <div class="logo">
        <h1><i class="fa-solid fa-fire"></i></h1>
        <h1>Yarukoto</h1>
    </div>

    <div class="userName">
        <p id="small">Hello there, Kevin Drake!</p>
    </div>

    <div class="today">
        <div>${todaysDate("long")}</div>
        <div id ="clock" onload="currentTime()"></div>
    </div>
    `;

    return topMenu;
}
     
const side = function() {
    sideMenu.innerHTML = 
    `
    <ol class="toDoList">
        <li><h2><u>Menu</u></h2></li>
        <li id="allTasks"><i class="fa-solid fa-inbox"></i> All Tasks</li>
        <li id="today"><i class="fa-solid fa-calendar-day"></i> Today</li>
        <li id="currentWeek"><i class="fa-solid fa-calendar-week"></i> This Week</li>
        <li id="important"><i class="fa-solid fa-bolt-lightning"></i> Important</li>
    </ol>
    <ol class="toDoList" id="projectList">
        <li><h2><u>Projects</u></h2></li>
        <li id="addProject"><i class="fa-solid fa-plus"></i> New Project</li>
    </ol>
    <div id="addTask"> <i class="fa-solid fa-circle-plus fa-4x"></i></div>
    `;
    
    return sideMenu;
}

const mid = function() {
    main.innerHTML = 
    ``;
    
    return main;
}

const foot = function() {
    footer.innerHTML = 
    `
        <p>Made by Kevin Drake for The Odin Project <a href="https://github.com/kdrake1992"><i class="fa-brands fa-github"></i></a><p>
    `;

    return footer;
}

// Today's date
const todaysDate = function(length) {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    
    if(length === "long") {
        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    else if(length === "short") {
        return today = format(new Date(yyyy, mm-1, dd), 'M/dd/yy');
    }
}

// Initial site load
start().forEach(e=> {
    body.appendChild(e);
})

// Current time
function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
  
    if(hh === 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + ":" + ss + " " + session;
  
    document.getElementById("clock").innerText = time; 
    let t = setTimeout(function(){ currentTime() }, 1000);
  };
  currentTime();

// Create DOM elements
const tasks = document.getElementById("allTasks");
const day = document.getElementById("today");
const week = document.getElementById("currentWeek");
const thunder = document.getElementById("important");

const plusProject = document.getElementById("addProject");
const plusTasks = document.getElementById("addTask");

// Check if elements exist
const formChecker = function() {
    const projectCheck = document.getElementById('projectForm');
    if (!!projectCheck) {
        projectCheck.remove();
    }

    const taskCheck = document.getElementById('formTask');
    if (!!taskCheck) {
        taskCheck.remove();
    }
}

// Checks menus and removes old html menu
const menuCheck = function() {

    const allTaskCheck = document.getElementById("taskList");
    if(!!allTaskCheck) {
        allTaskCheck.remove();
    }

    const dayCheck = document.getElementById("dayList");
    if(!!dayCheck) {
        dayCheck.remove();
    }

    const weekCheck = document.getElementById("weekList");
    if(!!weekCheck) {
        weekCheck.remove();
    }
    const importantCheck = document.getElementById("importantList");
    if(!!importantCheck) {
        importantCheck.remove();
    }
}

// Exit form
const exitForm = function(currentForm) {
    const exitCheck = document.getElementById('exit')
    exitCheck.addEventListener('click', e=> {
        currentForm.remove();
        removeBlur();
    });
}

// Add background blur
const addBlur = function() {
    topMenu.classList.add("blur");
    sideMenu.classList.add("blur");
    main.classList.add("blur");
    footer.classList.add("blur");
}

// Remove background blur
const removeBlur = function() {
    topMenu.classList.remove("blur");
    sideMenu.classList.remove("blur");
    main.classList.remove("blur");
    footer.classList.remove("blur"); 
}

// Normal Task information
const taskDetails = function(project, name) {
    const taskL = document.createElement("div");
    taskL.classList.add("list");
    taskL.setAttribute("id","taskList");
    
    taskL.innerHTML = `<h2><u>${name}</u></h2>`;
    
    project.toDoItems.forEach(e=> {
        const newTask = document.createElement("div");
        newTask.classList.add("task")
    
        const taskName = document.createElement("h4");
        taskName.setAttribute("id","taskName");
    
        const taskDescript = document.createElement("p");
    
        const taskDate = document.createElement("p");
    
        const taskPrio = document.createElement("p");
    
        const expandTask = document.createElement("div");
        expandTask.classList.add("open")
        const removeTask = document.createElement("div");
        removeTask.classList.add("remove")
    
        taskName.innerHTML = e.title;
        taskDescript.innerHTML = e.details.slice(0,15) + "...";
        taskDate.innerHTML = e.dueDate;
        taskPrio.innerHTML = e.priority;
        expandTask.innerHTML = `<i class="fa-solid fa-plus-minus"></i>`;
        removeTask.innerHTML = `<i class="fa-solid fa-x"></i>`;
    
    
        newTask.appendChild(taskName);
        newTask.appendChild(taskDescript);
        newTask.appendChild(taskDate);
        newTask.appendChild(taskPrio);
        newTask.appendChild(expandTask);
        newTask.appendChild(removeTask);
    
        taskL.appendChild(newTask);
        })
    
    main.appendChild(taskL);
    projectToModule();

}

// Remove task
const removeTask = function(tasks) {
    const removeT = document.querySelectorAll(".remove")
    removeT.forEach(e=> {
        e.addEventListener('click', event => {
            tasks.removeItem(e.parentElement.querySelector("#taskName").innerHTML);
            e.parentElement.remove();
        })
    })
}

// Expand and shrink task details
const expandTask = function(tasks) {
    const expandTask = document.querySelectorAll(".open")
    expandTask.forEach(e=> {
        e.addEventListener('click', event => {

            const currentTask = e.parentElement.querySelector("#taskName").innerHTML;
            
            const foundTask = allProjects.findItem(currentTask);
            
            const expanded = document.createElement("div");
            expanded.classList.add("bigTask");

            expanded.innerHTML = 
            `
            <div id="t">
                <h4>Task:</h4>
                <h4>${foundTask.title}</h4>
            </div>
            <div id="d">
                <p>Details:</p>
                <p>${foundTask.details}</p>
            </div>
            <div class="bottomBigTask">
                <div>
                    <p>Due:</p>
                    <p>${foundTask.dueDate}</p>
                </div>
                <div>
                    <p>Priority:</p>
                    <p>${foundTask.priority}</p>
                </div>
            </div>
            `
            // <div class="open">
            //     <i class="fa-solid fa-plus-minus"></i>
            // </div>
            // <div class="remove">
            //     <i class="fa-solid fa-x"></i>
            // </div>

            e.parentElement.replaceWith(expanded);
        })
    })

}

// Menu and Project event listeners
tasks.addEventListener("click", e=> {
    menuCheck();

    taskDetails(allProjects, "All Tasks");
    expandTask(allProjects);
    removeTask(allProjects);
})

day.addEventListener("click", e=> {
    menuCheck();

    taskDetails(todaysTasks, "Today");
    expandTask(todaysTasks);
    removeTask(todaysTasks);
})

week.addEventListener("click", e=> {
    menuCheck();

    taskDetails(thisWeeksTasks, "This Week");
    expandTask(thisWeeksTasks);
    removeTask(thisWeeksTasks);
})

thunder.addEventListener("click", e=> {
    menuCheck();

    taskDetails(importantTasks, "Important" );
    expandTask(importantTasks);
    removeTask(importantTasks);
})

// Allows DOM element to show project module
const projectToModule = function() {
    let currentProjects = document.querySelectorAll(".projectList");
    let i = 0;
    currentProjects.forEach(e => {
        e.addEventListener("click", e => {
            menuCheck();
            taskDetails(projects[i], e.target.innerHTML)
            expandTask(projects[i]);
            removeTask(projects[i]);
            i++;
        });
    })
}

// Creates new projects
plusProject.addEventListener("click", e=> {
    formChecker();
    addBlur();

    const projectForm = document.createElement("div");
    projectForm.classList.add("projectForm");
    projectForm.setAttribute("id","projectForm");

    projectForm.innerHTML = `
        <form id="addProjectForm">
        <legend>New Project</legend>

        <div class="formInput">
            <label for="task">Project*:</label>
            <input type="text" name="projectName" id="projectName" required placeholder="Project Name">
        </div>

        <div class="submitAndReset">
            <button type="submit" name="button" id="submit">Submit</button>
        </div>
        </form>

        <div id="exit"><i class="fa-solid fa-xmark"></i></div>
        `
        document.body.appendChild(projectForm);

        document.getElementById("submit").addEventListener('click', e=> {
            e.preventDefault();

            let projectN = document.getElementById("projectName");


            if(projectN.value === "") {
                alert("Form Incomplete");
            }
            else {
                let newProject = project()
                projects.push(newProject);

                const list = document.getElementById("projectList");
                let li = document.createElement("li");
                li.setAttribute("id", projectN.value)
                li.setAttribute("class", "projectList")

                li.innerHTML = projectN.value;
                list.appendChild(li)

                projectForm.remove()
                removeBlur();
            }
        })
        exitForm(projectForm);
        projectToModule();
})

// Date converter for form
const dateConverter = function(date) {
    let newDate = date.toString().split("-");
    return date = format(new Date(newDate[0], (newDate[1] - 1), newDate[2]), 'M/dd/yy');
}

// Adds more projects to form data
const addProjectstoForm = function() {
    for(let i = 0; i < projects.length; i++) {
        let options = document.getElementById("grouping");
        let newOption = document.createElement("option");
        newOption.setAttribute("value", `${i}`);

        let currentProjects = document.querySelectorAll(".projectList");
        newOption.text = currentProjects[i].innerHTML;
        options.appendChild(newOption);
    }
}

// Adds Task
plusTasks.addEventListener("click", e=> {
    formChecker();
    addBlur();

    const taskForm = document.createElement("div");
    taskForm.classList.add("formTask");
    taskForm.setAttribute("id", "formTask")

    taskForm.innerHTML = `
        <form id="addFormTask">
        <legend>New Task</legend>

        <div class="formInput">
            <label for="task">Task*:</label>
            <input type="text" name="task" id="task" required placeholder="Task">
        </div>

        <div class="formInput">
            <label for="details">Details:</label>
            <textarea name="details" id="details" cols="30" rows="10"
            placeholder="Task Details(Optional)"></textarea>
        </div>

        <div class="dateAndPrio">
            <div class="formInput">
                <label for="date">Due Date*:</label>
                <input type="date" name="date" id="date" required>
            </div>

            <div class="formInput">
                <label for="priority">Project:</label>
                <select name="grouping" id="grouping">
                    <option value="default">None</option>
                </select>
            </div>
            

            <div class="formInput">
                <label for="priority">Priority*:</label>
                <select name="priority" id="priority" required>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

        </div>
        <div class="submitAndReset">
            <button type="submit" name="button" id="submit">Submit</button>
        </div>
        </form>
        <div id="exit"><i class="fa-solid fa-xmark"></i></div>
        `
        document.body.appendChild(taskForm);

        addProjectstoForm();

        document.getElementById("submit").addEventListener('click', e=> {
            e.preventDefault();

            let task = document.getElementById("task");
            let descrip = document.getElementById("details");
            let date = document.getElementById("date");
            let prio = document.getElementById("priority");
            let whichProject = document.getElementById("grouping");

            if(task.value === "" || date.value == "") {
                alert("Form Incomplete");
            }
            else {
                let newTask = itemToDo(task.value, descrip.value, dateConverter(date.value), prio.value);

                if(newTask.priority === "High") {
                    importantTasks.addItem(newTask);
                }

                if(newTask.dueDate === todaysDate("short")) {
                    todaysTasks.addItem(newTask);
                }

                let oneWeekLater = format(add(new Date(todaysDate("short")), {days: 7}), 'M/dd/yy'); 

                if(compareDesc(new Date(oneWeekLater), new Date(newTask.dueDate)) < 7) {
                    thisWeeksTasks.addItem(newTask)
                }

                if(whichProject.value !== "default") {
                    projects[whichProject.value].addItem(newTask)
                }

                allProjects.addItem(newTask);

                taskForm.remove()
                removeBlur();
                menuCheck();
                taskDetails(allProjects, "All Tasks");
                expandTask(allProjects);
                removeTask(todaysTasks);
            }
        })
        exitForm(taskForm);
        projectToModule();
});
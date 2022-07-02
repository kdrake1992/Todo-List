// Imports CSS
import './style.css'

// Fontawesome Free
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/brands';

// Import date-fns webpack
import {compareDesc, format, add } from 'date-fns';

// Factory Function Todo Item and uniqueID
const itemToDo = (title, details, dueDate, priority, formDate, projectName) => {
    title = title;
    details = details;
    dueDate = dueDate;
    priority = priority;
    formDate = formDate;
    projectName = projectName;

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
    const setFormDate = (newDueDate) => {
        obj.formDate = newDueDate;
    };
    const setProjectName = (projectName) => {
        obj.projectName = projectName;
    };

    const obj = {title, details, dueDate, priority, formDate, projectName,
         setTitle, setDetails, setDueDate, setPriority, setFormDate, setProjectName};

    return obj;
}

let first = itemToDo("Clean Room", "Clean room, its been a few days.", format(new Date(2022, 7, 21),'M/dd/yy'), "Low", "2022-08-21", "default");
let third = itemToDo("Cut Grass", "Grass is getting tall.", format(new Date(2022, 8, 20),'M/dd/yy'), "Medium", "2022-09-20", "default");
let fifth = itemToDo("Study Japanese", "JLPT test soon.", format(new Date(2022, 11, 4),'M/dd/yy'), "High", "2022-12-04", "default");

// Create projects or lists of of todo items.
const project = (name) => {
    name = name;

    let toDoItems = [];

    const setName = (newName) => {
        name = newName;
    }
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

    const filterAll = (item) => {
        let newList = itemList.toDoItems.filter(e => e.uniID !== item.uniID)
        itemList.toDoItems = newList;  
    }

    const filterToday = () => {
        let newList = itemList.toDoItems.filter(e => e.dueDate === todaysDate("short"));
        itemList.toDoItems = newList;
    }

    const filterWeek = () => {
        let oneWeekLater = format(add(new Date(todaysDate("short")), {days: 7}), 'M/dd/yy'); 
        let newList = itemList.toDoItems.filter(e => compareDesc(new Date(oneWeekLater), new Date(e.dueDate), ) == -1);
        itemList.toDoItems = newList;
    }

    const filterPrio = () => {
        let newList = itemList.toDoItems.filter(e => e.priority === "High");
        itemList.toDoItems = newList;
    }

    const itemList = {name, toDoItems, addItem, removeItem, findItem,
        filterAll, filterToday, filterWeek, filterPrio}

    return itemList;
}

// Create default projects; all, this week, and important
let allProjects = project("allProjects");
let todaysTasks = project("todaysTasks")
let thisWeeksTasks = project("thisWeeksTasks");
let importantTasks = project("importantTasks");
let projects = [];

// localStorage
const updateAllLocal = function() {
    localStorage.setItem("localAT", JSON.stringify(allProjects));
    localStorage.setItem("localTT", JSON.stringify(todaysTasks));
    localStorage.setItem("localTWT", JSON.stringify(thisWeeksTasks));
    localStorage.setItem("localI", JSON.stringify(importantTasks));
    localStorage.setItem("localP", JSON.stringify(projects));
}

if(!localStorage.getItem("localAT")) {
    // Filler data
    allProjects.addItem(first);
    allProjects.addItem(third);
    allProjects.addItem(fifth);
    importantTasks.addItem(fifth);

    updateAllLocal();
}

else {
    JSON.parse(localStorage.getItem("localAT")).toDoItems.forEach(e => {
        allProjects.addItem(itemToDo(e.title, e.details, e.dueDate, e.priority, e.formDate, e.projectName));
    })
    JSON.parse(localStorage.getItem("localTT")).toDoItems.forEach(e => {
        todaysTasks.addItem(itemToDo(e.title, e.details, e.dueDate, e.priority, e.formDate, e.projectName));
    })
    JSON.parse(localStorage.getItem("localTWT")).toDoItems.forEach(e => {
        thisWeeksTasks.addItem(itemToDo(e.title, e.details, e.dueDate, e.priority, e.formDate, e.projectName));
    })
    JSON.parse(localStorage.getItem("localI")).toDoItems.forEach(e => {
        importantTasks.addItem(itemToDo(e.title, e.details, e.dueDate, e.priority, e.formDate, e.projectName));
    })
    JSON.parse(localStorage.getItem("localP")).forEach(e => {
        let localProject = project(e.name)
            allProjects.toDoItems.forEach(e => {
                if(localProject.name === e.projectName) {
                    localProject.addItem(itemToDo(e.title, e.details, e.dueDate, e.priority, e.formDate, e.projectName));
                }
            })
        projects.push(localProject);
    })
};

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

// Check if other form elements exist
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
    
        const editTask = document.createElement("div");
        editTask.classList.add("edit")

        const expandTask = document.createElement("div");
        expandTask.classList.add("open")

        const removeTask = document.createElement("div");
        removeTask.classList.add("remove")
    
        taskName.innerHTML = e.title;
        taskDescript.innerHTML = e.details.slice(0,10) + "...";
        taskDate.innerHTML = e.dueDate;
        taskPrio.innerHTML = e.priority;
        editTask.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
        expandTask.innerHTML = `<i class="fa-solid fa-plus-minus"></i>`;
        removeTask.innerHTML = `<i class="fa-solid fa-x"></i>`;
    
    
        newTask.appendChild(taskName);
        newTask.appendChild(taskDescript);
        newTask.appendChild(taskDate);
        newTask.appendChild(taskPrio);
        newTask.appendChild(editTask);
        newTask.appendChild(expandTask);
        newTask.appendChild(removeTask);
    
        taskL.appendChild(newTask);
        })
    
    main.appendChild(taskL);
}

// Edit task
const editTask = function(tasks) {
    const editT = document.querySelectorAll(".edit");
    editT.forEach(e => {
        e.addEventListener("click", ee => {
            formChecker();
            addBlur();

            let currentTask = e.parentElement.querySelector("#taskName").innerHTML;
            const foundTask = allProjects.findItem(currentTask);

            const taskForm = document.createElement("div");
            taskForm.classList.add("formTask");
            taskForm.setAttribute("id", "formTask")
        
            taskForm.innerHTML = `
                <form id="addFormTask">
                <legend>Edit Task</legend>
        
                <div class="formInput">
                    <label for="task">Task*:</label>
                    <input type="text" name="task" id="task" 
                    value="${foundTask.title}" required 
                    placeholder="Task (Max 15 Characters)" maxlength="15">
                </div>
        
                <div class="formInput">
                    <label for="details">Details:</label>
                    <textarea name="details" id="details" cols="30" rows="10"
                    placeholder="Task Details(Optional)">${foundTask.details}</textarea>
                </div>
        
                <div class="dateAndPrio">
                    <div class="formInput">
                        <label for="date">Due Date*:</label>
                        <input type="date" name="date" id="date" required
                        value="${foundTask.formDate}">
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
                        foundTask.setTitle(task.value);
                        foundTask.setDetails(descrip.value);
                        foundTask.setDueDate(dateConverter(date.value));
                        foundTask.setPriority(prio.value);
                        foundTask.setFormDate(date.value);
                        foundTask.setProjectName(whichProject.value);
        
                        if(foundTask.priority === "High") {
                            if(importantTasks.findItem(foundTask.title) === foundTask) {
                                // Do Nothing
                            }
                            else {
                                importantTasks.addItem(foundTask);
                            }
                        }

                        if(foundTask.dueDate === todaysDate("short")) {
                            if(todaysTasks.findItem(foundTask.title) === foundTask) {
                                // Do nothing
                            }
                            else {
                                todaysTasks.addItem(foundTask);
                            }
                        }
        
                        let oneWeekLater = format(add(new Date(todaysDate("short")), {days: 7}), 'M/dd/yy'); 

                        if(compareDesc(new Date(oneWeekLater), new Date(foundTask.dueDate)) < 7) {       
                            if(thisWeeksTasks.findItem(foundTask.title) === foundTask) {
                                // Do Nothing
                            }
                            else {;
                                thisWeeksTasks.addItem(foundTask);
                            }
                        }
                        console.log(projects)
                        console.log(whichProject.value)
                        
                        if(whichProject.value !== "default") {
                            projects.forEach(e => {
                                if(e.name == whichProject.value) {
                                    e.addItem(foundTask);
                                }
                            })
                        }

                        todaysTasks.filterToday();
                        thisWeeksTasks.filterWeek()
                        importantTasks.filterPrio();
                        taskForm.remove();
                        updateAllLocal();
                        removeBlur();
                        menuCheck();
                        taskDetails(allProjects, "All Tasks");
                        expandTask(allProjects);
                        removeTask(allProjects);
                        editTask(allProjects);
                    }
                })
                exitForm(taskForm);
        })
    })            
}

// Remove task
const removeTask = function(tasks) {
    const removeT = document.querySelectorAll(".remove")
    removeT.forEach(e => {
        e.addEventListener('click', event => {
            let removeThisTask = e.parentElement.querySelector("#taskName").innerHTML
            tasks.removeItem(removeThisTask);
            allProjects.removeItem(removeThisTask);
            todaysTasks.removeItem(removeThisTask);
            thisWeeksTasks.removeItem(removeThisTask);
            importantTasks.removeItem(removeThisTask);
            removeThisTask = null;
            updateAllLocal();
            e.parentElement.remove();
        })
    })
}

// Expand and shrink task details
const expandTask = function(tasks) {
    const expandTask = document.querySelectorAll(".open")
    expandTask.forEach(e => {
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

// Menu functions together
const menuStandard = function(project, name) {
    menuCheck();
    taskDetails(project, name);
    expandTask(project);
    removeTask(project);
    editTask(project);
}

// Menu and Project event listeners
tasks.addEventListener("click", e=> {
    menuStandard(allProjects, "All Tasks")
})

day.addEventListener("click", e=> {
    menuStandard(todaysTasks, "Today")
})

week.addEventListener("click", e=> {
    menuStandard(thisWeeksTasks, "This Week")
})

thunder.addEventListener("click", e=> {
    menuStandard(importantTasks, "Important")
})

// Allows DOM element to show project module
const projectToModule = function() {
    let currentProjects = document.querySelectorAll(".projectList");
    currentProjects.forEach(e => {
        e.addEventListener("click", e => {
            projects.forEach(element => {
                if(element.name === e.target.innerHTML) {
                    menuStandard(element, element.name)
                }
            })
        })
    })
};

// Creates a new li for project list
const projectListHTML = function(name, list) {
    let li = document.createElement("li");
    li.setAttribute("id", name)
    li.setAttribute("class", "projectList")

    li.innerHTML = name;
    list.appendChild(li)
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
            <input type="text" name="projectName" id="projectName" required 
            placeholder="Project Name (Max 20 Characters)" maxlength="20">
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

            const projectN = document.getElementById("projectName");
            const list = document.getElementById("projectList");

            let doubleProject = [];

            list.childNodes.forEach(e => {
                if (typeof e.innerHTML !== "undefined") {
                    doubleProject.push(e.innerHTML)
                }
            })

            if(projectN.value === "") {
                alert("Form Incomplete");
            }

            else if(doubleProject.includes(projectN.value)) {
                alert("Project already exists.")
            }

            else {
                let newProject = project(projectN.value)
                projects.push(newProject);

                projectListHTML(projectN.value, list);

                menuStandard(allProjects, "All Tasks")

                updateAllLocal();
                projectForm.remove()
                removeBlur();
                projectToModule();
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
        let currentProjects = document.querySelectorAll(".projectList");
        newOption.setAttribute("value", currentProjects[i].innerHTML);
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
            <input type="text" name="task" id="task" required 
            placeholder="Task (Max 15 Characters)" maxlength="15">
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
                let newTask = itemToDo(task.value, descrip.value, dateConverter(date.value), prio.value, date.value, whichProject.value);
                if(newTask.priority === "High") {
                    importantTasks.addItem(newTask);
                }

                if(newTask.dueDate === todaysDate("short")) {
                    todaysTasks.addItem(newTask);
                }

                let oneWeekLater = format(add(new Date(todaysDate("short")), {days: 7}), 'M/dd/yy'); 

                if(compareDesc(new Date(oneWeekLater), new Date(newTask.dueDate)) != 1) {
                    thisWeeksTasks.addItem(newTask)
                }

                if(whichProject.value !== "default") {
                    projects.forEach(e => {
                        if(e.name === whichProject.value) {
                            e.addItem(newTask);
                        }
                    })
                }

                allProjects.addItem(newTask);
                updateAllLocal();

                taskForm.remove()
                removeBlur();
                menuStandard(allProjects, "All Tasks")
            }
        })
        exitForm(taskForm);
});

// Updates projects from local storage
projects.forEach(e=> {
    const list = document.getElementById("projectList");
    projectListHTML(e.name, list)
})

projectToModule();
// Imports CSS
import './style.css'

// Fontawesome Free
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

// Import date-fns webpack
import { compareAsc, format, startOfDay } from 'date-fns';

// Factory Function Todo Item
const itemToDo = (title, details, dueDate, priority) => {
    title = title;
    details = details;
    dueDate = dueDate;
    priority = priority;
    let note = "";
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
    const setNote = (newNote) => {
        obj.note = newNote;
    };
    const setCheck = (check) => {
        if(check === "yes") {
            obj.checklist = "yes"
        }
        else {
            obj.checklist = "no"
        };
    };
    const obj = {title, details, dueDate, priority, note, checklist, setTitle, setDetails,
        setDueDate, setPriority, setNote, setCheck};

    return obj;
}

let first = itemToDo("Clean Room", "Clean room, its been a few days.", new Date(2022, 5, 21), "low");
let third = itemToDo("Cut Grass", "Grass is getting tall.", new Date(2022, 5, 20), "medium");
let fifth = itemToDo("Study Japanese", "JLPT test soon.", new Date(2022, 6, 4), "high");

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

    const itemList = {toDoItems, addItem, removeItem}

    return itemList;
}

// Create default projects; all, this week, and important
const allProjects = project();
const todaysTasks = project()
const thisWeeksTasks = project();
const importantTasks = project();


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
main.classList.add("menu");

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
        <div>${todaysDate()}</div>
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
    <ol class="toDoList">
        <li><h2><u>Projects</u></h2></li>
        <li id="addProject"><i class="fa-solid fa-plus"></i> New Project</li>
    </ol>

    <div id="addTask"> <i class="fa-solid fa-circle-plus fa-4x"></i></div>
    `;
    
    return sideMenu;
}

const mid = function() {
    main.innerHTML = 
    `
        Main
    `;
    
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
const todaysDate = function() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
    return today;
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

tasks.addEventListener("click", e=> {
    console.log("1")
})

day.addEventListener("click", e=> {
    console.log("2")
})

week.addEventListener("click", e=> {
    console.log("3")
})

thunder.addEventListener("click", e=> {
    console.log("4")
})

plusProject.addEventListener("click", e=> {
    console.log("5")
})

plusTasks.addEventListener("click", e=> {
    const taskForm = document.createElement("div");
    taskForm.classList.add("formTask");

    taskForm.innerHTML = `
        <form id="addFormTask">
        <legend>New Task</legend>

        <div class="formInput">
            <label for="task">Task:</label>
            <input type="text" name="task" id="task" placeholder="Task">
        </div>

        <div class="formInput">
            <label for="details">Details:</label>
            <textarea name="details" id="details" cols="30" rows="10"
            placeholder="Task Details(Optional)"></textarea>
        </div>

        <div class="dateAndPrio">
            <div class="formInput">
                <label for="date">Due Date:</label>
                <input type="date" name="date" id="date">
            </div>

            <div class="formInput">
                <label for="priority">Priority:</label>
                <select name="priority" id="priority">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
        </div>

        <div class="submitAndReset">
            <button type="submit" name="button" id="submit">Submit</button>
            <button type="reset">Clear</button>
        </div>
        </form>
        `
        document.body.appendChild(taskForm);

        topMenu.classList.add(".fade");
        sideMenu.classList.add(".fade");
        main.classList.add(".fade");
        footer.classList.add(".fade");

        document.getElementById("submit").addEventListener('click', e=> {
            e.preventDefault();

            let task = document.getElementById("task");
            let descrip = document.getElementById("details");
            let date = document.getElementById("date");
            let prio = document.getElementById("priority");

            let newTask = itemToDo(task.value, descrip.value, date.value, prio.value);
            allProjects.addItem(newTask);
            console.log(allProjects.toDoItems);
        })
})

console.log(allProjects.toDoItems);
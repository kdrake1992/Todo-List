// Imports CSS
import './style.css'

// Import date-fns webpack
import { compareAsc, format } from 'date-fns';
// const today = new Date(2022, 6, 18); example

// Fontawesome Free
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

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

const first = itemToDo("Clean Room", "Clean room, its been a few days.", new Date(2022, 5, 21), "low");
const third = itemToDo("Cut Grass", "Grass is getting tall.", new Date(2022, 5, 20), "medium");
const fifth = itemToDo("Study Japanese", "JLPT test soon.", new Date(2022, 6, 4), "high");

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
const thisWeek = project();
const highPriority = project();


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
    <i class="fa-solid fa-bars"></i>

    <div class="username">
        <div class="userintro">
            <p id="small">Hi there, Kevin Drake!</p>
        </div>
    </div>

    <div class="searchBar">
        <form action="#">
            <div class = "input-wrapper">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="search" id="search" placeholder="      Search:">
            </div>
        </form>
    </div>

    <button>New</button>
    `;

    return topMenu;
}
     
const side = function() {
    sideMenu.innerHTML = 
    `
    <div class="logo">
        <h1><i class="fa-solid fa-fire"></i></h1>
        <h1>Yarukoto</h1>
    </div>
    <ol class="toDoList">
        <li><h2><u>Menu</u></h2></li>
        <li><i class="fa-solid fa-inbox"></i> All Tasks</li>
        <li><i class="fa-solid fa-calendar-day"></i> Today</li>
        <li><i class="fa-solid fa-calendar-week"></i> This Week</li>
        <li><i class="fa-solid fa-bolt-lightning"></i> Important</li>
    </ol>
    <ol class="toDoList">
        <li><h2><u>Projects</u></h2></li>
        <li><i class="fa-solid fa-plus"></i> New Project</li>
    </ol>
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

start().forEach(e=> {
    body.appendChild(e);
})
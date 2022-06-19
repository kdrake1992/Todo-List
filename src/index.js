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
console.log(allProjects.toDoItems);


const body = document.body;

const start = function() {
    const initial = []

    const topMenu = document.createElement('div');
    const sideMenu = document.createElement('div');
    const main = document.createElement('div');
    const footer = document.createElement('div');

    topMenu.innerHTML = 
    `
    <div class="searchBar">
        <form action="#">
            <input type="text" name="search" id="search">
        </form>
    </div>

    <div class="username">
        <div class="userintro">
            <p id="small">Hi there,</p>
            <h3>Kevin Drake</h3>
        </div>
    </div>

    <div class="headerButtons">
        <button>New</button>
        <button>Sort</button>
    </div>
    `;

    sideMenu.innerHTML = 
    `
    <h1>Todo App</h1>
    <ol class="toDoList">
        <li><h2><u>Menu</u></h2></li>
        <li>All Tasks</li>
        <li>Today</li>
        <li>This Week</li>
        <li>Important</li>
    </ol>
    <ol class="toDoList">
        <li><h2><u>Projects</u></h2></li>
        <li>New Project</li>
    </ol>
    `;

    main.innerHTML = 
    `
        Main
    `;

    footer.innerHTML = 
    `
        <p>Made by Kevin Drake for The Odin Project <a href="https://github.com/kdrake1992"><i class="fa-brands fa-github"></i></a><p>
    `;


    initial.push(topMenu);
    initial.push(sideMenu);
    initial.push(main);
    initial.push(footer);
    
    return initial;
}

console.log("Test")
start().forEach(e=> {
    body.appendChild(e);
})
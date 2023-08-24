//Create a task menu when clicked in add icon
const create = document.getElementById("create");

//Toggle the team dropdown
const drop = document.getElementsByClassName("dropdown-container")[0];

//Variable declared to create a task form
const modalContainer = document.createElement("div");

modalContainer.classList.add("modal-container");

modalContainer.innerHTML = `<div class="modal">
<span id="close-button"><i class="fa-solid fa-circle-xmark fa-lg" style="color: #3d4040;"></i></span>

<form id="create-form">
<input type="text" name="title" placeholder="Title" required>
<input type="text" name="assigne" placeholder="Assigne" required>
<select name="status" id="">
<option value="TODO">Todo</option>
<option value="IN_PROGRESS">In Progress</option>
<option value="DONE">Done</option>
</select>
<textarea name="description"  cols="30" rows="5" maxlength = "150"></textarea>
<button>create</button>
</form>
</div>`;

//Object info used to store form data
const info = {};

//Function to toggle the team button
drop.addEventListener("click", (e) => {
  e.stopPropagation();
  const dropdownLists = document.getElementsByClassName("dropdown-lists")[0];

  dropdownLists.style.display === "none"
    ? (dropdownLists.style.display = "flex")
    : (dropdownLists.style.display = "none");
});

// Function to toggle the dark theame
const toggleButton = document.getElementById("dark-mode-toggle");
const createButton = document.getElementsByClassName("fa-circle-plus")[0];
let toggled = false;
toggleButton.addEventListener("click", () => {
    if (!toggled) {
        toggleButton.classList.toggle("active");
        document.body.style.backgroundColor = "black";
        createButton.style.color= "#d4d4d4";
        toggled = true;
      }
      else{
        toggleButton.classList.toggle("active");
        document.body.style.backgroundColor = "white";
        createButton.style.color= "#3d4040";
        toggled = false; 
    }
});


//Function to close the task-form (tab/modal)
const closeModal = () => {
  modalContainer.remove();
};

//Function to extract  form data
const extractData = (event) => {
  event.preventDefault();
  const elements = event.target;
  for (let i = 0; i < elements.length; i++) {
    elements[i].name && (info[elements[i].name] = elements[i].value);
  }
  addTasks(info);
  //Cleaning Up
   for(let i = 0 ; i < elements.length; i++)
  {
    elements[i].name === "status" ? elements[i].value="TODO" : elements[i].value = "";
  }
  event.target.removeEventListener("submit", event.target);
  modalContainer.remove();
};

//EventListener to Create a task
create.addEventListener("click", () => {
  document.body.appendChild(modalContainer);
  //Extract data from form
  const form = document.getElementById("create-form");
  form.addEventListener("submit", extractData);
  //To close the task menu;
  const close = document.getElementById("close-button");
  close.addEventListener("click", closeModal);
});

/* <div class="tasks-card" draggable="true">
  <h3>Title</h3>
  <b>Jerico</b>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio.</p>
</div>; */


//Global count iterator for tasks unique ID
let count = 0;
//Function to add the tasks
function addTasks(task_info) {
  //Create a task
  const newTask = document.createElement("div");
  newTask.id = `task-${count}`;
  count++;
  newTask.className = "tasks-card";
  newTask.draggable = true;
  newTask.innerHTML = ` <h3>${task_info["title"]}</h3>
  <b>${task_info["assigne"]}</b>
 <p class="card-para">${task_info["description"]}</p>`;

  
  const appendTask = document.getElementById(task_info["status"]);
  appendTask.appendChild(newTask);
  newTask.addEventListener("dragstart" , (e)=>{
    e.stopPropagation();
    //Data id for task card
    e.dataTransfer.setData("source", e.target.id);
    //Data Task containers location like TODO  , IN_PROGRESS , DONE
    e.dataTransfer.setData("tasks-panel" , newTask.parentElement.id);
  })
}
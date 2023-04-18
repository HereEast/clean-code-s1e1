// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.


const newTaskInput = document.getElementById("input__new-task");
const addButton = document.getElementById("button--add");
const incompleteTaskHolder = document.getElementById("todo-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");


function createNewTaskElement(taskString) {
    const listItem = document.createElement("li");
    listItem.classList.add("list__item");

    const checkbox = document.createElement("input");
    checkbox.classList.add("item__checkbox");
    checkbox.type = "checkbox";

    const label = document.createElement("label");
    label.classList.add("task", "item__name");
    label.innerText = taskString;

    const editInput = document.createElement("input");
    editInput.classList.add("task", "input", "item__input");
    editInput.type = "text";

    const editButton = document.createElement("button");
    editButton.classList.add("button", "button--edit");
    editButton.innerText = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button", "button--delete");

    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.classList.add("button__img");
    deleteButtonImg.src = "./remove.svg";

    deleteButton.append(deleteButtonImg);

    listItem.append(checkbox, label, editInput, editButton, deleteButton);

    return listItem;
}

function addTask() {
    console.log("Add Task...");

    if (!newTaskInput.value) return;
    let listItem = createNewTaskElement(newTaskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    newTaskInput.value = "";
}


function editTask () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    const listItem = this.parentNode;

    const editInput = listItem.querySelector(".item__input");
    const label = listItem.querySelector(".item__name");
    const editBtn = listItem.querySelector(".button--edit");
    const containsClass = listItem.classList.contains("edit-mode");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("edit-mode");
};


function deleteTask () {
    console.log("Delete Task...");

    let listItem = this.parentNode;
    let ul = listItem.parentNode;

    ul.removeChild(listItem);
};


function taskCompleted() {
    console.log("Complete Task...");

    let listItem = this.parentNode;

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};


function taskIncomplete() {
    console.log("Incomplete Task...");

    let listItem = this.parentNode;

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

addButton.addEventListener("click", addTask);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");

    let checkBox = taskListItem.querySelector(".item__checkbox");
    let editButton = taskListItem.querySelector(".button--edit");
    let deleteButton = taskListItem.querySelector(".button--delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

const taskInput = document.getElementById('input_bt');
const addTaskButton = document.getElementById('button_black');
const taskList = document.getElementById('taskList');
const number_btn=document.querySelectorAll(".numbers_Btn");
const TEXTFIELD=document.getElementById('input_field1');

let currentInput = "";
let currentOperation = null;
let currentResult = null;
let nextValue=0;


addTaskButton.addEventListener('click', addTask);
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const taskId = generateUniqueId();
  const taskItem = createTaskItem(taskId, taskText);

  taskList.appendChild(taskItem);
  taskInput.value = '';
}
function createTaskItem(id, text) {
  const taskItem = document.createElement('li');
  taskItem.innerHTML = `
    <input type="checkbox" id="${id}">
    <label for="${id}">${text}</label>
    <button data-id="${id}" class="btn btn-outline-dark btn-sm removeTaskButton">Remove</button>
  `;

  const checkbox = taskItem.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', toggleTask);

  const removeButton = taskItem.querySelector('.removeTaskButton');
  removeButton.addEventListener('click', removeTask);

  return taskItem;
}

function toggleTask(event) {
  const taskId = event.target.id;
  const label = taskList.querySelector(`label[for="${taskId}"]`);
  label.classList.toggle('completed');
}

function removeTask(event) {
  const taskId = event.target.dataset.id;
  const taskItem = document.getElementById(taskId);
  if (taskItem) {
    taskList.removeChild(taskItem.parentNode);
  }
}

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

document.querySelector("button.reset").addEventListener("click",function(){
    let list = document.querySelector("ol")
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }
})
function number_text(number) {
  currentInput += number;
  TEXTFIELD.value=currentInput
}
function clear_numbers(){
  currentInput = "";
      currentOperation = null;
      currentResult = null;
      TEXTFIELD.value = "";
      nextValue=0;
}
function operation(op) {
  currentOperation = op;
  if (currentResult === null && nextValue==0) {
    currentResult = parseFloat(currentInput);
  } else if (nextValue!==0 && currentResult===null){
    currentResult=parseFloat(nextValue);
    nextValue=0;
  }else  {
    currentResult = performOperation(currentInput);
  }
  currentInput = "";
  TEXTFIELD.value="";
  
  
}
function performOperation(value) {
  switch (currentOperation) {
    case "+":
      return currentResult + parseFloat(value);
    case "-":
      return currentResult - parseFloat(value);
    case "*":
      return currentResult * parseFloat(value);
    case "/":
      return currentResult / parseFloat(value);
  }
}
function calculate() {
  if (currentResult !== null && currentOperation !== null) {
    
    currentResult = performOperation(currentInput);
    TEXTFIELD.value = currentResult;
    nextValue=parseFloat(TEXTFIELD.value);
    currentInput = "";
    currentResult=null;
    currentOperation = null;
  }
}

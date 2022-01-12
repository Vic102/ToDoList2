let arr = new Array();
let indexArr = 0;
let idCount = 10;

function stopExecution(e) {
  e.preventDefault();
  return;
}

function styleDiv(newDivElem, numIndex) {
  if (numIndex % 2 == 0) {
    newDivElem.style.backgroundColor = '#eeeeee';
  } else {
    newDivElem.style.backgroundColor = '#f9f8f9';
  }
  newDivElem.style.paddingLeft = '15px';
  newDivElem.style.paddingTop = '10px';
  newDivElem.style.paddingBottom = '10px';
}

function changeStatus(event){
  const content = event.target;
  const states = {
    1: { value: 'To Do', color: 'lightblue'},
    2: { value: 'In Progress', color: 'yellow'},
    3: { value: 'Done', color: 'lightgreen'}
  };

  let nextState = parseInt(content.id) + 1;
  if (nextState > 3) {
    return;
  }

  content.innerHTML = states[nextState].value;
  content.style.backgroundColor = states[nextState].color;
  content.id = nextState;
}


function eraseTask(event) {
  const btnToErase = document.querySelectorAll('.close-task');
  const hola = event.target.parentElement;

  for (var i = 0; i < btnToErase.length; i++) {
    if (btnToErase[i].id == 10001) {
      event.target.parentElement.remove();
      arr.splice(i, 1);
    }
  }
  indexArr--;
  updateCounter(indexArr);
}

function changeId(event) {
  const element = event.target;
  const states2 = {
    10000: { value: 'X'},
    10001: { value: 'X'}
  };

  let nextState2 = parseInt(element.id) + 1;
  element.id = nextState2;
  eraseTask(event);
}

function setDate(fecha) {
  let year = fecha.getFullYear();
  let month = fecha.getMonth() + 1;
  let day = fecha.getDate();
  let hour = fecha.getHours();
  let minutes = (fecha.getMinutes() < 10 ? '0' : '') + fecha.getMinutes();
  let fullDate = day + "/" + month + "/" + year + " " + hour + ":" + minutes + "h";
  return fullDate;
}

function updateCounter(indexNum) {
  const counter = document.querySelector('.task-counter');
  counter.innerHTML = 'Tienes un total de ' + indexNum + ' tareas que hacer';

  if (indexNum == 0) {
    counter.style.display = 'none';
  } else {
    counter.style.display = 'block';
  }
}

function isMessageEmpty(message) {
  let isEmpty = true;
  const warningMsg = document.querySelector('.warning-msg');
  warningMsg.innerHTML = 'No puedes crear una tarea de nada, pon algo.';

  if (message == "") {
    warningMsg.style.display = 'flex';
    warningMsg.style.backgroundColor = 'blue';
    isEmpty = false;
  } else {
    warningMsg.style.display = 'none';
  }

  return isEmpty;
}

function setFormMessage(message) {
  isMessageEmpty(message);
  if (!isMessageEmpty(message)) {
    return;
  }

  let fecha = new Date();
  const button = '<button id="1" onclick="changeStatus(event)">To Do</button>';
  const closeButton = '<button id="10000" class="close-task" onclick="changeId(event)">&times;</button>';

  let elementDiv = document.createElement('div');
  elementDiv.id = idCount;
  elementDiv.className = 'task-in-list';
  styleDiv(elementDiv, indexArr);
  arr[indexArr] = elementDiv;
  arr[indexArr].innerHTML = '<div class="for-flex">' +setDate(fecha) + " " + button + " " + message + '</div>' + closeButton;
  div.append(arr[indexArr]);
  indexArr++;
  idCount++;
  updateCounter(indexArr);
}


function keepData(event) {
  const thingToDo = document.querySelector('#text-input');
  setFormMessage(thingToDo.value);
  thingToDo.value = "";
  return stopExecution(event);
}

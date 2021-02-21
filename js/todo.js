const pending_list = document.getElementById('pending_list');
const finished_list = document.getElementById('finished_list');
const input_task = document.getElementById('input_task');
const form = document.querySelector('.js-form');
let init_state = true;
const FINISHED = 'finished';
const TODOS = 'todos';

let todo_list = []; // pending ;;

function make_todo_obj(todo) {
  let id = 1;
  if (todo_list.length) {
    id = todo_list[todo_list.length - 1].id + 1;
  }
  return { text: todo, id: id };
}

let finished = []; // finished ;;
function make_finish_obj(todo) {
  let id = 1;
  if (finished.length) {
    id = finished[finished.length - 1].id + 1;
  }
  return { text: todo, id: id };
}

function delete_handle(event) {
  const parent_id = event.target.parentNode.parentNode.id;
  const todo_id = event.target.parentNode.id;
  event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  if (parent_id === 'pending_list') {
    todo_list = todo_list.filter((todo) => {
      return todo.id !== parseInt(todo_id);
    });
    localStorage.setItem(TODOS, JSON.stringify(todo_list));
  } else {
    console.log(finished);
    console.log(todo_id);
    finished = finished.filter((todo) => {
      return todo.id !== parseInt(todo_id);
    });
    console.log(finished);
    localStorage.setItem(FINISHED, JSON.stringify(finished));
  }
}

function move_to_pending(event) {
  add_list(event.target.parentNode.childNodes[0].innerText, 'pending');
  event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  const todo_id = event.target.parentNode.id;
  finished = finished.filter((todo) => {
    return todo.id !== parseInt(todo_id);
  });
  localStorage.setItem(FINISHED, JSON.stringify(finished));
}

function move_to_finished(event) {
  const content = event.target.parentNode.childNodes[0].innerText;
  add_list(content, 'finished');
  event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  const todo_id = event.target.parentNode.id;
  todo_list = todo_list.filter((todo) => {
    return todo.id !== parseInt(todo_id);
  });
  localStorage.setItem(TODOS, JSON.stringify(todo_list));
}

function add_list(todo, kind, id) {
  const del_btn = document.createElement('span');
  const li = document.createElement('li');
  const span = document.createElement('span');
  const finish_btn = document.createElement('span');

  span.innerText = todo;
  li.appendChild(span);
  li.appendChild(del_btn);

  if (kind === 'pending') {
    finish_btn.innerHTML = '👌';
    finish_btn.addEventListener('click', move_to_finished);
    li.appendChild(finish_btn);
    const todoObj = make_todo_obj(todo);
    if (id) {
      li.id = id;
    } else {
      li.id = todoObj.id;
    }
    if (!init_state) {
      todo_list.push(todoObj);
    }
    pending_list.appendChild(li);
    localStorage.setItem(TODOS, JSON.stringify(todo_list));
  } else {
    finish_btn.innerHTML = '👀';
    finish_btn.addEventListener('click', move_to_pending);
    li.appendChild(finish_btn);
    const todoObj = make_finish_obj(todo);
    if (id) {
      li.id = id;
    } else {
      li.id = todoObj.id;
    }
    if (!init_state) {
      finished.push(todoObj);
    }
    finished_list.appendChild(li);
    localStorage.setItem(FINISHED, JSON.stringify(finished));
  }
  del_btn.onclick = delete_handle;
  del_btn.innerHTML = '❌';
  del_btn.classList.add('btn');
  finish_btn.classList.add('btn');
  input_task.value = '';
}

function handle_submit(event) {
  event.preventDefault();
  add_list(input_task.value, 'pending');
}

form.addEventListener('submit', handle_submit);

function init() {
  const todos_json = JSON.parse(localStorage.getItem(TODOS));
  const finished_json = JSON.parse(localStorage.getItem(FINISHED));

  if (todos_json) {
    todo_list = todos_json;
    todos_json.forEach((element) => {
      add_list(element.text, 'pending', element.id);
    });
  }
  if (finished_json) {
    finished = finished_json;
    finished_json.forEach((element) => {
      add_list(element.text, 'finished', element.id);
    });
  }

  init_state = false;
}
init();

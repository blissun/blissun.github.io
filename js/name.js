const USERNAME = 'username';
const user_tag = document.querySelector('.username');
const input = document.querySelector('#user_input');
const span_username = document.querySelector('#username');

function setUsername(username) {
  span_username.innerText = username;
  span_username.classList.remove('hide');
}
function enterKeyHandle(event) {
  if (event.key === 'Enter') {
    const username = input.value;
    localStorage.setItem(USERNAME, username);
    input.classList.add('hide');
    setUsername(username);
  }
}

function getInputHandle(event) {
  span_username.classList.add('hide');
  input.classList.remove('hide');
}

// <input type="text" class="shadow-none focus:outline-none" placeholder="What's your name?"></input>

function getCurrentUser() {
  const username = localStorage.getItem(USERNAME);
  if (username === null) {
    span_username.classList.add('hide');
  } else {
    input.classList.add('hide');
    setUsername(username);
  }
}

function init() {
  input.addEventListener('keydown', enterKeyHandle);
  span_username.addEventListener('click', getInputHandle);
  getCurrentUser();
}

init();

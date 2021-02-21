const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const meridium = document.querySelector('#meridium');
const seconds = document.querySelector('#seconds');
const year = document.querySelector('#year');
const month = document.querySelector('#month');
const date = document.querySelector('#date');
const day = document.querySelector('#day');

function sprintf(num, base) {
  base = 10;
  const len = String(base).length - String(num).length + 1;
  return len > 0 ? new Array(len).join('0') + num : num;
}

function getTime() {
  const _ = new Date();
  return {
    year: _.getFullYear(),
    month: _.getMonth(),
    date: _.getDate(),
    day: () => {
      const day_str = ['일', '월', '화', '수', '목', '금', '토'];
      return day_str[_.getDay()];
    },
    month: _.getMonth() + 1,
    hour24: _.getHours(),
    hour12: () => {
      if (_.getHours() > 12) {
        return sprintf(_.getHours() - 12);
      } else {
        return sprintf(_.getHours());
      }
    },
    meridium: () => {
      if (_.getHours() > 12) {
        return 'PM';
      } else {
        return 'AM';
      }
    },
    minute: sprintf(_.getMinutes()),
    second: sprintf(_.getSeconds()),
  };
}

function setClock() {
  const clockObj = getTime();
  hours.innerHTML = `${clockObj.hour12()}`;
  minutes.innerHTML = `${clockObj.minute}`;
  meridium.innerHTML = `${clockObj.meridium()}`;
  seconds.innerHTML = `${clockObj.second}`;
  year.innerHTML = `${clockObj.year}년`;
  month.innerHTML = `${clockObj.month}월`;
  date.innerHTML = `${clockObj.date}일`;
  day.innerHTML = `${clockObj.day()}요일`;
}

const body = document.getElementsByTagName('body')[0];

function random_background() {
  const urls = [
    'https://images.unsplash.com/photo-1465146633011-14f8e0781093?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&q=80',
    'https://images.unsplash.com/photo-1514064019862-23e2a332a6a6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&q=80',
    'https://images.unsplash.com/photo-1460602594182-8568137446ce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&q=80',
    'https://images.unsplash.com/photo-1498962342534-ee08a0bb1d45?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&q=80',
    'https://images.unsplash.com/photo-1480380799266-582d808d748a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&q=80',
  ];
  const r = Math.floor(Math.random() * urls.length);
  return `url(${urls[r]})`;
}

body.style.backgroundImage = random_background();
body.style.backgroundRepeat = 'no-repeat';
body.style.height = window.innerHeight + 'px';
body.style.backgroundPosition = 'center';
body.style.backgroundSize = 'cover';
body.classList.add('text-white');

window.addEventListener('resize', () => {
  body.style.height = window.innerHeight + 'px';
});
function init() {
  setInterval(setClock, 1000);
  window.document.oncontextmenu = new Function('return false');
  window.document.onselectstart = new Function('return false');
  window.document.ondragstart = new Function('return false');
}

init();

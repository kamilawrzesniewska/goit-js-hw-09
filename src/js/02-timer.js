import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const bntEl = document.querySelector('[data-start]');

bntEl.addEventListener('click', onStart);
bntEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      bntEl.disabled = true;
    } else {
      bntEl.disabled = false;
    }
  },
};

flatpickr(dateEl, options);

function onStart() {
  const timerId = setInterval(() => {
    const selectedDate = new Date(dateEl.value);
    const delta = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(delta);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if (delta <= 999) {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(delta) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(delta / day);
  // Remaining hours
  const hours = Math.floor((delta % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((delta % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((delta % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
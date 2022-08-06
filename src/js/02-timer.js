import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';


const varDays = document.querySelector('[data-days]');
const varHours = document.querySelector('[data-hours]');
const varMinutes = document.querySelector('[data-minutes]');
const varSeconds = document.querySelector('[data-seconds]');



const bntStart = document.querySelector('[data-start]');
bntStart.addEventListener('click', onStart);
bntStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      bntStart.disabled = true;
    } else {
      bntStart.disabled = false;
    }
  },
};
const dateEl = document.querySelector('#datetime-picker');
flatpickr(dateEl, options);

function onStart() {
  const timerId = setInterval(() => {
    const selectedDate = new Date(dateEl.value);
    const delta = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(delta);

    varDays.textContent = addLeadingZero(days);
    varHours.textContent = addLeadingZero(hours);
    varMinutes.textContent = addLeadingZero(minutes);
    varSeconds.textContent = addLeadingZero(seconds);

    if (delta <= 999) {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
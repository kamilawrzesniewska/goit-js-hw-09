import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';


const varDays = document.querySelector('[data-days]');
const varHours = document.querySelector('[data-hours]');
const varMinutes = document.querySelector('[data-minutes]');
const varSeconds = document.querySelector('[data-seconds]');



const btnStart = document.querySelector('[data-start]');
btnStart.addEventListener('click', checkFunction);
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const newDate = selectedDates[0].getTime();
    if (newDate < Date.now()) {
      btnStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
};
const inputDate = document.querySelector('#datetime-picker');
flatpickr(inputDate, options);

function checkFunction() {
  const timer = setInterval(() => {
    const puttedDate = new Date(inputDate.value);
    const difference = puttedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(difference);

    varDays.textContent = addLeadingZero(days);
    varHours.textContent = addLeadingZero(hours);
    varMinutes.textContent = addLeadingZero(minutes);
    varSeconds.textContent = addLeadingZero(seconds);

    if (difference <= 1000) {
      clearInterval(timer);
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

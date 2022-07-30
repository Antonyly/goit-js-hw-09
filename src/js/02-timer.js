import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStartEl = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const dEl = document.querySelector('[data-days]');
const hEl = document.querySelector('[data-hours]');
const mEl = document.querySelector('[data-minutes]');
const sEl = document.querySelector('[data-seconds]');

buttonStartEl.addEventListener('click', () => timer.start());

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

let selectedTime = null;
// let date = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notify.failure('Please choose a date in the future');
            selectedDates[0] = new Date();
        } else {
            buttonStartEl.disabled = false;
            selectedTime = selectedDates[0];
        }
      
    console.log(selectedDates[0]);
  },
};

class Timer {
    constructor() {
        this.timerID = null;
        this.isActive = false;
        buttonStartEl.disabled = true;
    }
    start() {
        if(this.isActive) {
        return;
        }
        this.isActive = true;
        this.timerID = setInterval(() => {
          const thisTime = Date.now();
          let date = options.defaultDate - thisTime;
        const averageTime = selectedTime - thisTime;
        const componentsTimer = convertMs(averageTime);
          this.updateComponentsTimer(componentsTimer);
          
          if (averageTime < 0) {
            this.reupdateComponentsTimer(componentsTimer);
            buttonStartEl.disabled = true;
        // dEl.textContent = '0' + '0';
        // hEl.textContent = '0' + '0';
        // mEl.textContent = '0' + '0';
        // sEl.textContent = '0' + '0';
        }
        }, 1000);
    }
      reupdateComponentsTimer({days, hours, minutes, seconds}) {
        dEl.textContent = addLeadingZero(days * 0);
        hEl.textContent = addLeadingZero(hours * 0);
        mEl.textContent = addLeadingZero(minutes * 0);
        sEl.textContent = addLeadingZero(seconds * 0);


    }
    updateComponentsTimer({days, hours, minutes, seconds}) {
        dEl.textContent = addLeadingZero(days);
        hEl.textContent = addLeadingZero(hours);
        mEl.textContent = addLeadingZero(minutes);
        sEl.textContent = addLeadingZero(seconds);

    }
    stopTimer() {
        clearInterval(this.timerID);
  }
}

const timer = new Timer();
flatpickr(inputEl, options);
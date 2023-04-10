import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// створення посилань на елементи
const refs = { 
  body: document.querySelector('body'), // body
  dateInput: document.querySelector('#datetime-picker'), // input
  btnStartTimer: document.querySelector('[data-start]'), // button
  daysRemaining: document.querySelector('[data-days]'), // span
  hoursRemaining: document.querySelector('[data-hours]'), // span
  minutesRemaining: document.querySelector('[data-minutes]'), // span
  secondsRemaining: document.querySelector('[data-seconds]'), // span
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            // window.alert('Please choose a date in the future');
            Notiflix.Notify.failure('Please choose a date in the future');
            refs.btnStartTimer.disabled = true;
            return;
        }
        refs.btnStartTimer.disabled = false;
    },
}



flatpickr(refs.dateInput, options)

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

// const days = convertMs(new Date());
// console.log(addLeadingZero(days.days), addLeadingZero(days.hours),
//     addLeadingZero(days.minutes), addLeadingZero(days.seconds));


function addLeadingZero(value) { 
  return String(value).padStart(2, '0'); 
}

refs.btnStartTimer.addEventListener('click', () => {
    let timerId = setInterval(() => {
        const difference = new Date(refs.dateInput.value) - new Date();
        if (difference < 0) {
            clearInterval(timerId);
            refs.btnStartTimer.disabled = false; // деактивація кнопки
            Notiflix.Notify.success('Countdown finished');    
            return
        };
        refs.btnStartTimer.disabled = true; 

    const { days, hours, minutes, seconds } = convertMs(difference);
  
        refs.secondsRemaining.textContent = addLeadingZero(seconds);
        refs.minutesRemaining.textContent = addLeadingZero(minutes);
        refs.hoursRemaining.textContent = addLeadingZero(hours);
        refs.daysRemaining.textContent = addLeadingZero(days);
    }, 1000)    
}
)
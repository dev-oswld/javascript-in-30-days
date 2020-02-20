/*
* Pomodoro project 🍅?
*
* Notes:
* JavaScript Timing Events => https://www.w3schools.com/js/js_timing.asp
* How does setInterval and setTimeout work? => https://stackoverflow.com/questions/22051209/how-does-setinterval-and-settimeout-work
*
* JS works single-threaded, also caution with the BROWSER JANK, this is performance on the web page.
* Visit this => http://jankfree.org/ and this => https://developers.google.com/web/fundamentals/performance/rendering
*
*/

let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]'); //All elements in a array

function timer(seconds) {
  clearInterval(countdown); //Clear any existing timers

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  //See notes
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    
    if(secondsLeft < 0) {
      clearInterval(countdown); //Check if we should stop it!
      return;
    }
    
    displayTimeLeft(secondsLeft); //Display it
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  //Turn time into readable time
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`; //Important
  document.title = "🍅 " + display; //Dynamic title, cool!
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  //Turn time into readable time
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`; //Important
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log("Input time: ", mins);
  timer(mins * 60);
  this.reset();
});
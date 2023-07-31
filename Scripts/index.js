// Variables for  buttons

const startButtonElement = document.querySelector('.start');
const resetButtonElement = document.querySelector('.reset-timer');

// Variables for  Timer Elements
let secondsHTMLElement = document.querySelector('.secs');
let minutesHTMLElement = document.querySelector('.mins');
let hoursHTMLElement = document.querySelector('.hours');
let milliSecondHTMLElement = document.querySelector('.millisecond');

// Variables for  timer
let second = 0;
let minute = 0;
let hours = 0;
let millisecond = 0;
let intervalID;
let isTimerOn = false;

startButtonElement.addEventListener('click', () => {
    timerLogic()
})



function startTimer() {
    intervalID = setInterval(() => {
        millisecond++
        milliSecondTimer();
        if (millisecond === 100) {
            millisecond = 0;
            milliSecondTimer()
            second++
            secondTimer()
        }
        if (second === 60) {
            millisecond = 0;
            milliSecondTimer()
            second = 0;
            secondTimer()
            minute++
            minuteTimer()
        }
        if (minute === 60) {
            millisecond = 0;
            milliSecondTimer()
            second = 0
            secondTimer()
            minute = 0
            minuteTimer()
            hours++
            hoursTimer()
        }
    }, 10)
}

function milliSecondTimer() {
    if (millisecond < 10) {
        milliSecondHTMLElement.innerHTML = `0${millisecond}`;
    }
    else {
        milliSecondHTMLElement.innerHTML = `${millisecond}`;
    }
}

function secondTimer() {
    if (second < 10) {
        secondsHTMLElement.innerHTML = `0${second}`;
    }
    else {
        secondsHTMLElement.innerHTML = second;
    }
}

function minuteTimer() {
    if (minute < 10) {
        minutesHTMLElement.innerHTML = `0${minute} :`;
    }
    else {
        minutesHTMLElement.innerHTML = `${minute} :`;
    }
}

function hoursTimer() {
    if (hours < 10) {
        hoursHTMLElement.innerHTML = `0${hours} :`;
    }
    else {
        hoursHTMLElement.innerHTML = `${hours} :`;
    }
}

function timerLogic() {
    // Checks if the timer is on or not and change the image inside button accordingly.
    if (!isTimerOn) {
        startTimer()
        let buttonImageChangeHTML = `<img src="images/pause.png" alt="Pause"
        class = "pause-image function-image"</img>`
        startButtonElement.innerHTML = buttonImageChangeHTML;
        isTimerOn = true;
    }
    else {
        clearInterval(intervalID);
        buttonImageChangeHTML = `<img src="images/start.png" alt="Start" class="start-image function-image" title="Start"</img>`
        startButtonElement.innerHTML = buttonImageChangeHTML;
        isTimerOn = false;

    }
}

resetButtonElement.addEventListener('click', () => {
    clearTimer();

})

// Function to reset the timer
function clearTimer() {
    clearInterval(intervalID);
    second = 0;
    minute = 0;
    hours = 0;
    millisecond = 0;
    milliSecondTimer();
    secondTimer();
    minuteTimer()
    hoursTimer();
    buttonImageChangeHTML = `<img src="images/start.png" alt="Start" class="start-image function-image" title="Start"</img>`
    startButtonElement.innerHTML = buttonImageChangeHTML;
    isTimerOn = false;
}

document.body.addEventListener('keydown', (event) => {
    startTimerFromKeyboard(event)
})

function startTimerFromKeyboard(event) {
    if (event.key === 'Enter') {
        timerLogic()
    }
    else if (event.key === 'Backspace') {
        clearTimer();
    }
}
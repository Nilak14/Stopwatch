// Variables for  buttons
const startButtonElement = document.querySelector('.start');
const resetButtonElement = document.querySelector('.reset-timer');
const lapButtonElement = document.querySelector('.lap-button');
const timerPart = document.querySelector('.timer-main-part');

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
        lapButtonElement.classList.remove('none')

    }
    else {
        clearInterval(intervalID); ``
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
    lapButtonElement.classList.add('none')
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

const lapNumberElement = document.querySelector('.num');
const lapTimeElement = document.querySelector('.lap');
const lapOverAllTimeElement = document.querySelector('.overall');
const headingNum = document.querySelector('.h-num');
const headingLap = document.querySelector('.h-lap');
const headingOverall = document.querySelector('.h-overall');
const lapDiv = document.querySelector('.laps')


lapButtonElement.addEventListener('click', () => {
    timerPart.classList.remove('effect')
    lapSet();
    lapDiv.scrollBy(0, 100);
})


let OverAllTime = []
let htmlNumber;
let htmlLapTime;
let htmlOverAllTime;

function lapSet() {
    headingNum.innerHTML = 'Lap'
    headingOverall.innerHTML = "OverAll Time"
    headingLap.innerHTML = 'Lap Times'

    let h = hours < 10 ? `0${hours}` : hours;
    let m = minute < 10 ? `0${minute}` : minute;
    let s = second < 10 ? `0${second}` : second;
    let ms = millisecond < 10 ? `0${millisecond}` : millisecond;
    OverAllTime.push({
        hourTime: h,
        minTime: m,
        secTime: s,
        milliSecondTime: ms
    });

    OverAllTime.forEach((value) => {
        let numberCounter = OverAllTime.length
        let n = numberCounter < 10 ? `0${numberCounter}` : numberCounter;
        htmlNumber = `<p class="number lap">${n}</p>`;
        htmlOverAllTime = `<p class="lap">
                            ${value.hourTime}:${value.minTime}:${value.secTime}
                        <span class="lapMilliSecond">
                            ${value.milliSecondTime}
                        </span>
                    </p>`
    })
    lapOverAllTimeElement.innerHTML += htmlOverAllTime;
    lapNumberElement.innerHTML += htmlNumber;

    lap();
}

let lapTime = [];
let lapHour;
let lapMinute;
let lapSecond;
let lapMilliSecond;
let finalHour;
let finalMin;
let finalSec;
let finalMilliSecond;
function lap() {
    let h = hours < 10 ? `0${hours}` : hours;
    let m = minute < 10 ? `0${minute}` : minute;
    let s = second < 10 ? `0${second}` : second;
    let ms = millisecond < 10 ? `0${millisecond}` : millisecond;
    lapTime.push({
        hourTime: h,
        minTime: m,
        secTime: s,
        milliSecondTime: ms
    });

    if (lapTime[1] === undefined) {
        lapMilliSecond = lapTime[0].milliSecondTime;
        lapSecond = lapTime[0].secTime
        lapMinute = lapTime[0].minTime;
        lapHour = lapTime[0].hourTime;
        htmlLapTime = `<p class="lap">
                        ${lapHour} : ${lapMinute} : ${lapSecond}
                    <span class="lapMilliSecond">
                        ${lapMilliSecond}
                    </span>
                </p>`
        lapTimeElement.innerHTML += htmlLapTime;
    }
    else {
        for (let i = 1; i < lapTime.length; i++) {
            if (lapTime[i].milliSecondTime < lapTime[i - 1].milliSecondTime) {
                finalSec = lapTime[i].secTime - 1;
                let newMillisecond = parseInt(lapTime[i].milliSecondTime) + 100;
                lapMilliSecond = newMillisecond - lapTime[i - 1].milliSecondTime;
            }
            else {
                finalSec = lapTime[i].secTime
                lapMilliSecond = lapTime[i].milliSecondTime - lapTime[i - 1].milliSecondTime;
            }
            if (finalSec < lapTime[i - 1].secTime) {
                finalMin = lapTime[i].minTime - 1;
                let newSecond = parseInt(finalSec) + 60;
                lapSecond = newSecond - lapTime[i - 1].secTime;
            }
            else {
                finalMin = lapTime[i].minTime
                lapSecond = finalSec - lapTime[i - 1].secTime
            }
            if (finalMin < lapTime[i - 1].minTime) {
                finalHour = lapTime[i].hourTime - 1;
                let newMinute = parseInt(finalMin) + 60;
                lapMinute = newMinute - lapTime[i - 1].minTime;
            }
            else {
                finalHour = lapTime[i].hourTime
                lapMinute = finalMin - lapTime[i - 1].minTime
            }
            lapHour = finalHour - lapTime[i - 1].hourTime;

        }
        let fh = lapHour < 10 ? `0${lapHour}` : lapHour;
        let fm = lapMinute < 10 ? `0${lapMinute}` : lapMinute;
        let fs = lapSecond < 10 ? `0${lapSecond}` : lapSecond;
        let fms = lapMilliSecond < 10 ? `0${lapMilliSecond}` : lapMilliSecond;
        htmlLapTime = `<p class="lap">
                        ${fh} : ${fm} : ${fs}
                    <span class="lapMilliSecond">
                        ${fms}
                    </span>
                </p>`
        lapTimeElement.innerHTML += htmlLapTime;
    }
}

resetButtonElement.addEventListener('click', () => {
    clearLap();
    timerPart.classList.add('effect')

})

function clearLap() {
    lapTimeElement.innerHTML = "";
    lapOverAllTimeElement.innerHTML = "";
    lapNumberElement.innerHTML = "";
    headingNum.innerHTML = "";
    headingOverall.innerHTML = "";
    headingLap.innerHTML = "";
    OverAllTime = [];
    lapTime = [];
}
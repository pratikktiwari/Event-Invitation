const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 30;
const ALERT_THRESHOLD = 10;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};


const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;


// June 9, 2020 4:00 PM IST
var countDownDate = new Date("October 13, 2025 16:00:00").getTime();
var now = new Date().getTime();
var distance = countDownDate - now;
var days = Math.floor(distance / (1000 * 60 * 60 * 24));
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);
var day_hr_min_sec____ = [days, hours, minutes, seconds]

const timer_three_vars = ["main_timer_seconds_","main_timer_minutes_","main_timer_hours_","main_timer_days_"]

for(let item=0; item<4; item++){
    let base_time_label = timer_three_vars[item]+"base";
    let base_time_remaining = timer_three_vars[item]+"rems";

    document.getElementById(timer_three_vars[item]).innerHTML = `
    <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id=${base_time_remaining}
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id=${base_time_label} class="base-timer__label">
        ${day_hr_min_sec____[item]}
    </span>
    </div>
`;
}



startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}



function startTimer(){

    var timerInterval = setInterval(function() {
        now = new Date().getTime();
         distance = countDownDate - now;
         days = Math.floor(distance / (1000 * 60 * 60 * 24));
         hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         seconds = Math.floor((distance % (1000 * 60)) / 1000);


         var day_hr_min_sec = [days, hours, minutes, seconds]
         console.log(day_hr_min_sec)
         for(let i=0; i<4; i++){
            document.getElementById(timer_three_vars[i]+"base").innerHTML = day_hr_min_sec[i];
            setCircleDasharray(timer_three_vars[i]+"rems",day_hr_min_sec[i]);
            setRemainingPathColor(timer_three_vars[i]+"rems",day_hr_min_sec[i]);
         }

        if (seconds === 0) {
            onTimesUp();
        }

    },1000);
}

function setRemainingPathColor(id_h,timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById(id_h)
        .classList.remove(warning.color);
      document
        .getElementById(id_h)
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById(id_h)
        .classList.remove(info.color);
      document
        .getElementById(id_h)
        .classList.add(warning.color);
    }
    else{
        document
        .getElementById(id_h)
        .classList.remove(warning.color);
        document
            .getElementById(id_h)
            .classList.remove(alert.color);
        document
            .getElementById(id_h)
            .classList.add(info.color);
    }
  }

  function calculateTimeFraction(id_b,param_time) {
      switch(id_b){
         case "main_timer_seconds_":
            let rawTimeFraction = param_time / 60;
            return rawTimeFraction - (1 / 60) * (1 - rawTimeFraction);
        case "main_timer_minutes_":
            rawTimeFraction = param_time / 60;
            return rawTimeFraction - (1 / 60) * (1 - rawTimeFraction);
        case "main_timer_hours_":
            rawTimeFraction = param_time / 24;
            return rawTimeFraction - (1 / 24) * (1 - rawTimeFraction);
        case "main_timer_days_":
            rawTimeFraction = param_time / 30;
            return rawTimeFraction - (1 / 30) * (1 - rawTimeFraction);
        default:
            let rawTimeFraction1 = param_time / 60;
            return rawTimeFraction1 - (1 / 60) * (1 - rawTimeFraction1);
      }
      
    
  }

  function setCircleDasharray(id_b,param_time) {
      
    const circleDasharray = `${(
      calculateTimeFraction(id_b,param_time) * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    console.log("--"+circleDasharray+" -- ")
    document
      .getElementById(id_b)
      .setAttribute("stroke-dasharray", circleDasharray);
  }

  
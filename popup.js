/**
 * popup.js - popup script for Facebook Timer extension
 * @author Kunal Chaudhary
 */

var _total, _curr;    //timer variables

function set_timer(){
  var totalTimerBox = document.getElementById('total-timer-display');
  totalTimerBox.innerHTML = getHours(_total)+" : "+getMinutes(_total)+" : "+getSeconds(_total);
  var currentTimerBox = document.getElementById('current-timer-display');
  currentTimerBox.innerHTML = getHours(_curr)+" : "+getMinutes(_curr)+" : "+getSeconds(_curr);
}

document.addEventListener('DOMContentLoaded', function(){
  getTimerValue();
  setTimeout(set_timer, 500);

  //Refreshing the timer  
  var refreshButton = document.getElementById('refreshButton');
  refreshButton.addEventListener('click', function(){
    getTimerValue();
    setTimeout(set_timer, 500);
  }, false);

  //Reseting the current timer
  var timerResetButton = document.getElementById('resetButton');
  timerResetButton.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {clear: "true"}, function(response) {
            console.log(response.message);
            setTimeout(getTimerValue, 1200);  //since one second required by timer.js to store the _curr value
            setTimeout(set_timer, 1500);      //refreshing the timer value on popup
        });
    });
  }, false);
}, false);
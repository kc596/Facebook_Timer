/**
 * popup.js - popup script for Facebook Timer extension
 * @author Kunal Chaudhary
 */
var _total, _curr;

function set_timer(){
  var totalTimerBox = document.getElementById('total-timer-display');
  totalTimerBox.innerHTML = getHours(_total)+" : "+getMinutes(_total)+" : "+getSeconds(_total);
  var currentTimerBox = document.getElementById('current-timer-display');
  currentTimerBox.innerHTML = getHours(_curr)+" : "+getMinutes(_curr)+" : "+getSeconds(_curr);
}

document.addEventListener('DOMContentLoaded', function(){
  getTimerValue();
  setTimeout(set_timer, 800);
  
  var refreshButton = document.getElementById('refreshButton');
  refreshButton.addEventListener('click', function(){
    getTimerValue();
    setTimeout(set_timer, 800);
  }, false);

  var timerResetButton = document.getElementById('resetButton');
  timerResetButton.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {clear: "true"}, function(response) {
            console.log(response.message);
        });
    });
  }, false);
}, false);
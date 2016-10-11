/**
 * timer.js - content script for Facebook Timer Chrome Extension
 * @author Kunal Chaudhary
 */

var _curr, _total, time;		//timer variables


/**
 * Selecting the place on facebook's page to display timer
 */
var myElement = document.createElement("div");
myElement.setAttribute("class", "timer-style");
document.getElementsByTagName("body")[0].appendChild(myElement);
var child = document.createElement("div");
child.setAttribute("class","timer_bg");
child.innerHTML=time;


//Function to display timer
function displayTimer(){
	time = getHours(_curr)+" : "+getMinutes(_curr)+" : "+getSeconds(_curr);
	child.innerHTML = time;
	myElement.appendChild(child);
}

//Monitor function
function set_timer(){
	_curr++; _total++;
	displayTimer();
	setTimerValue();
}

/**
 * Retriving the timer value as soon as facebook is opened
 * Refreshing the timer every second
 */
getTimerValue();
setInterval(set_timer, 1000);


/*
 * Handling timer reset request from popup.js
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("current timer cleared :D ");
	if (request.clear == "true"){
		_curr=0;
		sendResponse({message: "timer successfully reset"});
	}
});
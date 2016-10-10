/**
 * timer.js - content script for Facebook Timer Chrome Extension
 * @author Kunal Chaudhary
 */

/**** Timer variables ****/
var _curr, _total, time;

/**** Selecting the place to display timer ****/
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

/**** Retriving the timer's previous value. Then calling the timer function every second ****/
getTimerValue();
setInterval(set_timer, 1000);

/**** Timer Reset Feature ****/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("current timer cleared :D ");
	if (request.clear == "true"){
		_curr=0;
		sendResponse({message: "timer successfully reset"});
	}
});
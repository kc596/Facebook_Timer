/**** Timer variables ****/
var h1=0, h2=0, m1=0, m2=0, s1=0, s2=0;
var time = h1+""+h2+" : "+m1+""+m2+" : "+s1+s2;

/**** Chossing up the place to display timer ****/
var myElement = document.getElementsByClassName("_4kny _50tm")[0];
var child = document.createElement("div");
child.setAttribute("class","timer-style");
child.innerHTML=time;

/**** Function to display timer ****/
function set_timer(){
	if(s2<9) s2++;
	else if(s1<5){ s1++; s2=0; }
	else if(m2<9){ m2++; s2=0; s1=0; }
	else if(m1<5){ m1++; m2=0; s2=0; s1=0; }
	else if(h2<9){ h2++; m1=0; m2=0; s2=0; s1=0; }
	else {h1++; h2=0; m1=0; m2=0; s2=0; s1=0; }
	time = h1+""+h2+" : "+m1+""+m2+" : "+s1+s2;
	child.innerHTML = time;
	myElement.appendChild(child);
}

/**** Calling the timer function every second ****/
setInterval(set_timer, 1000);
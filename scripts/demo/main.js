var myDemo = new Demo;

function init (reload) {
	myDemo.keyEvent();
	
	if (reload) {
		myDemo.reload();
		myDemo.setRangeInertia();
		myDemo.isPlatform();
	} else
		myDemo.init();
}

//load
init(false);
//reload
myDemo.reloadButton.addEventListener("click", function () {init(true)}, false);

function main () {

	myDemo.clearDraw();

	if (myDemo.isPlatformer) myDemo.platformer();
	else myDemo.classic();

	myDemo.draw ();

	window.requestAnimationFrame(main);
}

window.requestAnimationFrame(main);
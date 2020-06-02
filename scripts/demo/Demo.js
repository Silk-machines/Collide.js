class Demo {

 	#Demo = new Game();
	#P = new Player();
	#C = new Collide(this.#P,
					 this.#Demo.map, 
					 true, 
					 this.#Demo.collider, 
					 this.#Demo.ctx
					);

	#isPlatformer = true;
	#spanPos = document.getElementById ("position");
	#spanColl = document.getElementById ("collisionType");
	#activatePlatformer = document.getElementById("platformerDemo");
	#rangeInertia = document.getElementById("inertia");
	#reloadButton = document.getElementById("reload");

	//getters

	get isPlatformer () {
		return this.#isPlatformer;
	}

	get reloadButton () {
		return this.#reloadButton;
	}

	//setters

	setRangeInertia () {
		this.#P.setInertia(-this.#rangeInertia.value);
	}

	//methods

	reload () {
		this.clearDraw();
		this.#P = new Player();
		this.#C = new Collide(this.#P,
						 this.#Demo.map, 
						 true, 
						 this.#Demo.collider,
						 this.#Demo.ctx
						);
	}

	isPlatform () {
		this.#isPlatformer = this.#activatePlatformer.checked;
	}

	keyEvent () {
		this.#Demo.keyListener();
	}

	init () {
		this.#Demo.drawMap(true);
	}

	clearDraw () {
		this.#Demo.clearCanvas();
	}

	draw () {
		this.#P.drawPlayer(this.#Demo.ctx);
	}

	classic () {
		let xColl = this.#C.move(this.#P.velocityX(this.#Demo.key), "x");
		let yColl = this.#C.move(this.#P.velocityY(this.#Demo.key), "y");

		this.#P.setPos(this.#C.x, this.#C.y);

		this.insertInPage (this.#P.x, this.#P.y, xColl, yColl);
	}

	platformer () {
		let xControl = this.#C.move(this.#P.walkForce, "x"); //use the "move" function from collide to manage the player movement on axe x. (use the walkforce)
		let jump = this.#C.move(this.#P.jumpForce, "y"); //manage the player jump on axe y. (use the jumpforce)

		this.#P.walk(this.#P.velocityX(this.#Demo.key)); //modify the walkforce frame by frame.
		this.#P.jump(jump, "bottom", this.#Demo.key, this.#Demo.gravity); //modify the jumpforce frame by frame.

		this.#P.setPos(this.#C.x, this.#C.y); //the Collide object C verify a movement and after test it against any obstacles in the scan area 
											  //we give the position to the Player object P.

		this.insertInPage (this.#P.x, this.#P.y, xControl, jump);
	}

	insertInPage (x, y, collX, collY) {

		let pos = collX;

		if (collX != collY) {
			if (collY != "nothing") 
				pos = collY;
		}

		this.#spanPos.innerHTML = Math.round(x) + ", " + Math.round(y);
		this.#spanColl.innerHTML = pos;
	}

}
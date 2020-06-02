class Player {
	
	#jumpForce = 0;
	#walkForce = 0;
	#topSpeed = false;

	#x;
	#y;
	#friction;
	#inertia;
	#speed;
	#jumpForceConst;
	#width;
	#height;
	#color;
	#moveKey;

	constructor
	(x = 384,
	 y = 288,
	 friction = 0.9,
	 inertia = 1,
	 speed = 6,
	 jumpForceConst = -32,
	 width = 32,
	 height = 32,
	 color = "red",
	 moveKey = {
		KeyRight : 39,
		KeyLeft : 37,
		KeyTop : 38,
		KeyDown : 40,
		KeySpace : 32
	 }) {

		this.#x = x;
		this.#y = y;
		
		if(friction < 1 && friction >= 0.5)
			this.#friction = friction;
		else
			this.#friction = 0.9;

		if(inertia < 5 && inertia >= 1)
			this.#inertia = inertia;
		else
			this.#inertia = 1;

		this.#speed = speed;

		if(jumpForceConst > -50 && jumpForceConst < 0)
			this.#jumpForceConst = jumpForceConst;
		else
			this.#jumpForceConst = -23;

		this.#width = width;
		this.#height = height;
		this.#color = color;
		this.#moveKey = moveKey;
	}

	//getters

	get x () {
		return this.#x;
	}

	get y () {
		return this.#y;
	}

	get width () {
		return this.#width;
	}

	get height () {
		return this.#height;
	}

	get jumpForce () {
		return this.#jumpForce;
	}

	get walkForce () {
		return this.#walkForce;
	}

	get color () {
		return this.#color
	}

	//setter

	setInertia (x) {
		if(x >= 1 && x < 5)
			this.#inertia = x;
	}

	setPos (x,y) {
		this.#x = x;
		this.#y = y;
	}

	//methods

 	drawPlayer (ctx) {
		ctx.fillStyle = this.#color;
		ctx.fillRect(this.#x, this.#y, this.#width, this.#height);
 	}

	velocityX (keyListenerArray) {

		let listKeys = [
			this.#moveKey.KeyLeft,
			this.#moveKey.KeyRight
		];

		return this.velocity (listKeys, keyListenerArray);
	}

	velocityY (keyListenerArray) {

		let listKeys = [
			this.#moveKey.KeyTop,
			this.#moveKey.KeyDown
		];

		return this.velocity (listKeys, keyListenerArray);
	}

	velocity (listKeys, keyListenerArray) {

		if(keyListenerArray[listKeys[0]] && !keyListenerArray[listKeys[1]])
			return -this.#speed;
		else if(!keyListenerArray[listKeys[0]] && keyListenerArray[listKeys[1]])
			return this.#speed;

		return 0;
	}

	//platformer methods

	walk (speed) {

		if (!this.#topSpeed) {

			if (speed != 0 && Math.abs(this.#walkForce) < 10) {

				let plusWalk = this.roundFixed(this.#walkForce + (this.#inertia * Math.sign(speed)), 0);

				if (plusWalk > 10) this.#walkForce = 10;
				else this.#walkForce = plusWalk;

			} else if (Math.sign(this.#walkForce) != Math.sign(speed))
				this.#topSpeed = true;

		} else {

			if (Math.abs(this.#walkForce) != 0) {

				let minusWalk = this.roundFixed(this.#walkForce - (this.#inertia * Math.sign(this.#walkForce)), 0);

				if (Math.sign(this.#walkForce) != Math.sign(minusWalk)) this.#walkForce = 0;
				else this.#walkForce = minusWalk;

			} else {
				this.#topSpeed = false;
				this.#walkForce = 0;
			}

		}
	}

	jump (CollisionType, CollisionWant, keyListenerArray, gravity) {
		if(CollisionType == CollisionWant && keyListenerArray[this.#moveKey.KeySpace])
			this.#jumpForce = this.#jumpForceConst;

		if (this.#jumpForce < 14)	
			this.#jumpForce = this.roundFixed((this.#jumpForce + gravity) * this.#friction, 0);
	}

	roundFixed (x, n) {
		return +x.toFixed(n);
	}
}
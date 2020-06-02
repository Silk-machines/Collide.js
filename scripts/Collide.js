class Collide {

	#ObjectMove
	#map;
	#scan;
	#collider;
	#ctx;

	/**
	 *Collide constructor
	 *
	 *@param {ObjectMove} object - An Object with this following attributes : x, y, width, height.
	 *@param {Array} map - A matrix with the level informations.
	 *@param {Boolean} scan - Activate or desactivate the scan window around the movable object.
	 *@param {Int} collider - The length of the map and the player collision boxs (in pixel).
	 *@param {DOM canvas} ctx - The context of canvas.
	 */
	constructor
	(object,
	 map, 
	 scan, 
	 collider, 
	 ctx) {
		
		this.#ObjectMove = {
			x: object.x,
			y: object.y,
			width : object.width,
			height : object.height
		};

		this.#map = map;
		this.#scan = scan;
		this.#collider = collider;
		this.#ctx = ctx;
	}

	//getters

	get x () {
		return this.#ObjectMove.x;
	}

	get y () {
		return this.#ObjectMove.y;
	}

	//methods

	/**
	 *Move an object in the canvas and verify a possible collision between the object and the map.
	 *
	 *@param {Float} velocity - The velocity of the object.
	 *@param {String} dir - The direction of the object (axe x or y).
	 *@return {String} the direction of the collision.
	 */
	move (velocity, dir) {

		let tryMove = this.tryMove(velocity, dir);

		if(tryMove != "nothing"){
			this.refined(velocity, dir);
			return tryMove;
		}

		return tryMove;
	}

	/**
	 *Determine the type of a collision between to object on the canvas.
	 *
	 *@param {ObjectMove} ObjectA - An Object with this following attributes : x, y, width, height.
	 *@param {ObjectMove} ObjectB - An Object with this following attributes : x, y, width, height.
	 *@return {String} the direction of the collision.
	 */
	collisionDirection(ObjectA, ObjectB) {

	    let vx = (ObjectA.x + ObjectA.width) - (ObjectB.x + ObjectB.width),
	        vy = (ObjectA.y + ObjectA.height) - (ObjectB.y + ObjectB.height),

	        SWidths = ObjectA.width + ObjectB.width,
	        SHeights = ObjectA.height + ObjectB.height,

	    	dx = SWidths - Math.abs(vx),
	        dy = SHeights - Math.abs(vy);

	    if (dx >= dy) {
	        if (vy > 0) return "top";
	        else return "bottom";
	    } else {
	        if (vx > 0) return "left";
			else return "right";
	    }

	    return "nothing";
	}

	//private methods, don't use this
	//(wait ES10)

	refined (velocity, dir) {
		let i = 0;

		while (i < Math.abs(velocity) && 
			   this.tryMove(Math.sign(velocity), dir) != "nothing")
			  i++;
	}

	tryMove (velocity, dir) {

		let TestMove = {
			x : this.#ObjectMove.x,
			y : this.#ObjectMove.y,

			width : this.#ObjectMove.width,
			height : this.#ObjectMove.height
		}

		if (dir == "x") TestMove.x += velocity;
		else if (dir == "y") TestMove.y += velocity;

		let scan = this.scanCollision(TestMove);

		if(scan == "nothing") {
			this.#ObjectMove.x = TestMove.x;
			this.#ObjectMove.y = TestMove.y;

			return scan;
		}

		return scan;
	}

	scanCollision (Object) {

		let xmin = Math.floor((Object.x) / Object.width),
			ymin = Math.floor(Object.y / Object.height),
			xmax = Math.floor((Object.x + Object.width - 1) / Object.width),
			ymax = Math.floor((Object.y + Object.height - 1) / Object.height);

		for(let j=xmin;j<=xmax;j++) {
			for(let i=ymin;i<=ymax;i++){
				if(this.#scan)	
					this.drawScan (j, i);

				if(this.#map[i][j] == 1){
					let CollideBox = {
						x : this.#collider * j,
						y : this.#collider * i,

						width : this.#collider,
						height : this.#collider
					}

					return this.collisionDirection(this.#ObjectMove, CollideBox);
				}
			}
		}

		return "nothing";
	}

	drawScan (i, j) {
		this.#ctx.fillStyle = "blue";
		this.#ctx.fillRect(i*this.#collider, j*this.#collider, this.#collider, this.#collider);
	}
}
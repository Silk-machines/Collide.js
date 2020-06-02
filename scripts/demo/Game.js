class Game {

	//background elements layer (manage the lvl tiles, clear each time the game load a new map)
	#background = document.createElement("canvas");
	#bckgdCtxt = this.#background.getContext("2d");
	//foreground elements layer (manage the dynamics objects, clear each frame)
	#foreground = document.createElement("canvas");
	#frgdCtxt = this.#foreground.getContext("2d");

	#colliderColor = "blue";
	#gridColor = "blue";
	#key = {};

	#canvas;
	#ctx;
	#gravity;
	#collider;
	#map;

	constructor
	(gravity = 2,
	 colliderLength = 32,
	 map = Data.lvl1) {

		this.#gravity = gravity;
		this.#collider = colliderLength;
		
		//load the map
		this.#map = map;
		//canvas management
		this.#background.width = this.#foreground.width = 800;
		this.#background.height = this.#foreground.height = 608;
		this.#background.style.zIndex = 0;
		this.#background.style.position = "absolute";
		this.#foreground.style.zIndex = 1;
		this.#foreground.style.position = "absolute";
		//insert the canvas in DOM
		document.getElementsByTagName("section")[0].appendChild(this.#background);
		document.getElementsByTagName("section")[0].appendChild(this.#foreground);
	}

	//getters

	get canvas () {
		return this.#background;
	}

	get ctx () {
		return this.#frgdCtxt;
	}

	get key () {
		return this.#key
	}

	get map () {
		return this.#map;
	}

	get collider () {
		return this.#collider;
	}

	get gravity () {
		return this.#gravity;
	}

	//setter

	setKey (id, value) {
		this.#key[id] = value;
 	}

	//methods

	drawMap (grid) {
		this.#bckgdCtxt.fillStyle = this.#colliderColor;
		this.#bckgdCtxt.strokeStyle = this.#gridColor;

		for(let i=0; i < this.#map.length; i++){
			for(let j=0; j < this.#map[i].length; j++){
				if(this.#map[i][j] == 1)
					this.#bckgdCtxt.fillRect(this.#collider*j, this.#collider*i, this.#collider, this.#collider);

				if(grid)
					this.#bckgdCtxt.strokeRect(this.#collider*j, this.#collider*i, this.#collider, this.#collider);
			}
		}
	}

	clearCanvas () {
		this.#frgdCtxt.clearRect(0, 0, this.#map[0].length*this.#collider, this.#map.length*this.#collider);
	}

	tilePosition (i) {
		return i*this.#collider;
	}

	keyAdd (key) {
		onkeydown = onkeyup = function (e){
		    e = e || event;
		    
		    if(e.type == 'keydown')	
		    	key[e.keyCode] = true;
		    else if(e.type == 'keyup')
		    	key[e.keyCode] = false;
		}
	}

	keyListener () {
		this.keyAdd(this.#key);
	}
}
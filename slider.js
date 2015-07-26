Slider = function(section) {
	this.play = this.play.bind(this);
	this.pause = this.pause.bind(this);
	this.stop = this.stop.bind(this);
	this.toggle = this.toggle.bind(this);
	this.pasar = this.pasar.bind(this);
	
	this.section = section;
	this.button = this.section.querySelector("button.control");
	
	this.button.addEventListener("click", this.toggle);	
	this.play();
}

Slider.prototype = {
	"delay" : 5000,
	"speed" : 1000,
	"section" : null,
	"timeout" : null,
	"interval" : null,
	"button" : null,
	"auto" : true,
	"play" : function() {
		// Reproducir.
		this.auto = true;
		this.button.innerHTML = "A";
		this.interval = setInterval(this.pasar, this.speed);
		
		var labels = this.section.querySelectorAll("label");
		for(var nro=0; nro<labels.length; nro++)
			labels[nro].addEventListener("click", this.pause);		
	},
	"pause" : function() {
		// Pausar.
		this.stop();		
		if(this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = false;
		}
		this.timeout = setTimeout(this.play, this.delay);	
	},
	"stop" : function(force) {
		// Pausar.
		this.auto = false;
		this.button.innerHTML = "P";
		clearInterval(this.interval);
		this.interval = false;
		
		if(force) {
			var labels = this.section.querySelectorAll("label");
			for(var nro=0; nro<labels.length; nro++)
				labels[nro].removeEventListener("click", this.pause);				
		}
	},
	"toggle" : function() {
		if(this.timeout)
			clearTimeout(this.timeout);
		
		if(this.interval)
			this.stop(true);
		else 
			this.play();
	},
	"pasar" : function() {
		var inputs = this.section.querySelectorAll("input"),
			check = false;
		for(var nro=0; nro<inputs.length; nro++) {
			if(check) {
				inputs[nro].checked = "checked";
				check = false;				
			} else if(inputs[nro].checked) {
				inputs[nro].checked = false;
				check = true;
			}
		}
		if(check)
			inputs[0].checked = "checked";
	}		
}
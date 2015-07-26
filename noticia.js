Noticia = function(section) {
	this.section = section;
	
	this.ajax("noticias.json", new FormData(), function(status, responseText) {
		try {
			if(status != 200)
				throw "Ocurrio un error en la conexion.";			
			try {
				var data = JSON.parse(responseText);
				
				this.section.innerHTML = "";
				for(var nro=0; nro<data.length; nro++) {
					var article = document.createElement("article"),
						h3 = document.createElement("h3"),
						figure = document.createElement("figure"),
						img = document.createElement("img"),
						figcaption = document.createElement("figcaption"),
						p = document.createElement("p"),
						footer = document.createElement("footer"),
						a = document.createElement("a");
					
					a.href = "noticia-" + data[nro].code + ".html";
					a.innerHTML = "Leer m&aacute;s";
					p.innerText = data[nro]["abstract"];
					figcaption.innerText = data[nro].imageCaption;
					img.src = data[nro].image;
					img.alt = data[nro].imageCaption;
					img.title = data[nro].imageCaption;
					h3.innerText = data[nro].title;
					article.id = "noticia-" + data[nro].code;
					
					footer.appendChild(a);
					figure.appendChild(img);
					figure.appendChild(figcaption);
					article.appendChild(h3);
					article.appendChild(figure);
					article.appendChild(p);
					article.appendChild(footer);
					
					this.section.appendChild(article);
					
					//this.section.innerHTML += '<article id="noticia-1">'+
					//								'<h3>' + data[nro].title + '</h3>'+
					//								'<figure>'+
					//									'<img src="' + data[nro].image + '" alt="' + data[nro].figCaption + '" title="Pino">'+
					//									'<figcaption>'+
					//										data[nro].imageCaption +
					//									'</figcaption>'+
					//								'</figure>'+
					//								'<p>' + data[nro]["abstract"] + '</p>'+
					//								'<footer>'+
					//									'<a href="noticia-' + data[nro].code + '.html">Leer m&aacute;s</a>'+
					//								'</footer>'+
					//							'</article>';					
				}				
			} catch(e) {
				throw "Los datos no son como se esperaban.";
			}	
		} catch (e) {
			alert(e);			
		}
	}.bind(this));
}

Noticia.prototype = {
	"ajax" : function(url, params, callback) {		
		var request = new XMLHttpRequest();
		request.open("POST", url);
		request.onreadystatechange = function(callback) {
			if(this.readyState == 4)
				callback(this.status, this.responseText);
		}.bind(request, callback);
		request.send(params);
	}
}
function aleatorio(piso,techo){
	return Math.floor(Math.random() * (techo - piso + 1)) + piso;
}

function Enemigo(x,y){
	var opc = aleatorio(1,100) % 2;
	if(opc==1)
		this.img = $("#enemigo_1")[0];	
	else
		this.img = $("#enemigo_2")[0];		
	this.x = aleatorio(0,620);
	this.y = aleatorio(140,340);
	this.velocidad = 0;
	while(this.velocidad == 0)
		this.velocidad=aleatorio(-10,10);
			
	this.dibujar = function(ctx){
		var img = this.img;
		ctx.drawImage(img,this.x,this.y);
	}
	
	this.actualizar = function(){
		this.x += this.velocidad;
		this.x = (640 + this.x)%640;
	}
}

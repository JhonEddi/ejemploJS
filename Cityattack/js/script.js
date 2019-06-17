
var jugando;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	jugando = true;
	miCanvas = $("#mi_canvas")[0];
	contexto = miCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	gato = new Gato();
	enemigos = [new Enemigo(), new Enemigo(),
				   new Enemigo(), new Enemigo(),
				   new Enemigo()];
	run();	
	
	$('#instrucciones').click(function(){
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());
        return false;
    });
    
    $('#close').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
    });
    
    $("#iniciar").click(function(){	
		if(jugando==false)
			inicio();	
	});
}

function capturaTeclado(event){
	if(event.which==38 || event.which==87)
		gato.actualizar('arriba');
	if(event.which==40 || event.which==83)
		gato.actualizar('abajo');
	if(event.which==39 || event.which==68)
		gato.actualizar('derecha');
	if(event.which==37 || event.which==65)
		gato.actualizar('izquierda');
	
}

function run(){ 
	buffer.width = miCanvas.width;
	buffer.height = miCanvas.height;
	contextoBuffer = buffer.getContext("2d");
		 
	if(jugando){  
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);

		gato.dibujar(contextoBuffer);
		for(i=0;i<enemigos.length;i++){
			enemigos[i].dibujar(contextoBuffer);
			enemigos[i].actualizar();
			if(gato.colision(enemigos[i].x,enemigos[i].y)){
				gato.sprite = 2;
				gato.vida--;
				$('#pierde')[0].play();
			}
		}
		
		if(gato.vida <= 0)
			jugando = false;
		
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		
	}else{
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#ffffff";
		gato.sprite = 3;
		gato.vida = 0;
		gato.dibujar(contextoBuffer);
		contextoBuffer.font = "50px sans-serif";
		contextoBuffer.fillText("GAMEOVER", 300, 440);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "15px sans-serif";
		contextoBuffer.fillText("try again", 550, 460);
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
	}
	
}



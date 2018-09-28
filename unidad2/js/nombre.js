let canvas = document.getElementById("miCanvas");
let contexto = canvas.getContext("2d");
var color = "#ffffff";
const pintarPixel = (context, x, y, color = "#000000") => {
  context.fillStyle = color;
  context.fillRect(x, y, 1, 1);
};
const nombre = [
  { x: 10, y: 90, x2: 10, y2: 300 },
  { x: 10, y: 90, x2: 180, y2: 90 },
  { x: 10, y: 180, x2: 180, y2: 180 },
  { x: 10, y: 300, x2: 180, y2: 300 }
];
let puntos = [];
function dibujar() {
  //Esta funci�n se ejecuta cada que se hace clic sobre el lienz

  // if(primerPunto){  //Si es el primer clic, se lee el primer punto de la l�nea
  //   puntos.push({x:nombre[0].x, y:nombre[0].y});
  //   ponerPixel(contexto, puntos[puntos.length-1].x, puntos[puntos.length-1].y, color);
  //   primerPunto = false;
  // }
  //pintar l�nea
  nombre.map((v, i) => {
    lineaBresenham(
      nombre[i].x,
      nombre[i].y,
      nombre[i].x2,
      nombre[i].y2,
      contexto,
      color
    );
    puntos.push({ x: nombre[i].x, y: nombre[i].y});
  });

}

//Implementaci�n del algoritmo de Bresenham para l�neas
function lineaBresenham(x0, y0, x1, y1, contexto, color) {
  var dx = Math.abs(x1 - x0);
  var dy = Math.abs(y1 - y0);
  var sx = x0 < x1 ? 1 : -1;
  var sy = y0 < y1 ? 1 : -1;
  var err = dx - dy;

  //contexto.fillText( "(" + x1 + "," + y1 + ")", x1+4, y1);

  while (x0 != x1 || y0 != y1) {
    pintarPixel(contexto, x0, y0, color);
    var e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}

function escalar(){   
  console.log('Escalar');
  var sx = parseInt(document.getElementById("sx").value); //obtenemos el valor 
  var sy = parseInt(document.getElementById("sy").value); //obtenemos el valor 

  var T= new Array (); 
      T[0] = new Array (sx, 0,  0); 
      T[1] = new Array (0,  sy, 0); 
      T[2] = new Array (0,  0,  1); 
      
      transformar2D(T);
}

function trasladar(){   
  var dx = parseInt(document.getElementById("dx").value); //obtenemos el valor 
  var dy = parseInt(document.getElementById("dy").value); //obtenemos el valor 

  var T= new Array (); 
      T[0] = new Array (1, 0, dx); 
      T[1] = new Array (0, 1, dy); 
      T[2] = new Array (0, 0, 1); 
      
      transformar2D(T);
}

function mover(x, y){   

  var T= new Array (); 
      T[0] = new Array (1, 0, x); 
      T[1] = new Array (0, 1, y); 
      T[2] = new Array (0, 0, 1); 
      
      transformar2D(T);
}

function rotar(){   
  var a = parseInt(document.getElementById("angulo").value); //obtenemos el valor del �ngulo de rotaci�n

  var x = puntos[0].x;  //guardamos ubicaci�n origial
  var y = puntos[0].y;

  mover(-x,-y); //trasladamos al origen

  var T= new Array (); 
      T[0] = new Array (Math.cos(a), -Math.sin(a), 0); 
      T[1] = new Array (Math.sin(a), Math.cos(a), 0); 
      T[2] = new Array (0, 0, 1); 
      
      transformar2D(T);  //rotamos

      mover(x,y);  //trasladamos a posici�n inicial
}

function transformar2D(m){
  for(var i = 0; i < puntos.length; i++) {
     
    var p = new Array(puntos[i].x, puntos[i].y, 1);

    puntos[i].x =  Math.round((m[0][0]*p[0]) + (m[0][1]*p[1]) + (m[0][2]*p[2]));
    puntos[i].y =  Math.round((m[1][0]*p[0]) + (m[1][1]*p[1]) + (m[1][2]*p[2])); 
             
  }
  repintar();
}


function repintar(){
  contexto.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 1; i < puntos.length; i++) {
    lineaBresenham(puntos[i-1].x, puntos[i-1].y, puntos[i].x, puntos[i].y, contexto, color);
  }
  
}

document.getElementById('sx').onchange = escalar;
document.getElementById('sy').onchange = escalar;

dibujar();

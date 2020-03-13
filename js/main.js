var optionColor = document.getElementById('color');
var optionSize = document.getElementById('size');
var checkbox = document.getElementById('checkPintar');
var checkboxClean = document.getElementById('checkBorrar');

let vn = document.getElementById('canvas');
let papel = vn.getContext('2d');

var s = getComputedStyle(vn);
var w = s.width;
var h = s.height;

canvas.width = w.split('px')[0];
canvas.height = h.split('px')[0];

let xi;
let yi;
let color;
let colorPintado;
let tipo;
let size;

checkbox.addEventListener("change", habilitarPintar);
checkboxClean.addEventListener("change", habilitarClean);

setInterval(() => {
    colorPintado = optionColor.value;
    size = optionSize.value;
}, 2000);

function habilitarPintar() {
    checkboxClean.checked = false;

    var estado = checkbox.checked;
    tipo = "pintado";

    comenzarOperacion(estado);
}

function habilitarClean() {
    checkbox.checked = false;

    var estado = checkboxClean.checked;
    tipo = "borrado";

    comenzarOperacion(estado);
}


function comenzarOperacion(estado) {
    if (estado) {
        color = "transparent";
        document.addEventListener('mousedown', presionado);
        document.addEventListener('mousemove', mover);
        document.addEventListener('mouseup', soltar);
    } else {
        document.removeEventListener('mousedown', presionado);
        document.removeEventListener('mousemove', mover);
        document.removeEventListener('mouseup', soltar);
    }

}

function dibujarLinea(color, xi, yi, xf, yf, lienzo) {
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.lineWidth = size;
    lienzo.moveTo(xi, yi);
    lienzo.lineTo(xf, yf);
    lienzo.stroke();
    lienzo.closePath();
}

function obtenerPosition(xf, yf) {
    // dibujarLinea(color, xi, yi, xf + 2, yf + 2, papel);
    // console.log("aqui final", xf, yf);
    dibujarLinea(color, xi, yi, xf, yf, papel);
    xi = xf;
    yi = yf;
}

function mover(event) {
    // console.log("Me estoy moviendo, haz lo que necesites...");
    let xf = event.offsetX;
    let yf = event.offsetY;
    obtenerPosition(xf, yf);
    // console.log(xf, yf);
}

function presionado(event) {
    // console.log("Estoy presionado, haz lo que necesites...");
    if (tipo == "pintado") {
        color = colorPintado;
    } else if (tipo == "borrado") {
        color = "white";
    }

    xi = event.offsetX;
    yi = event.offsetY;
    // console.log("aqui inicial", xi, yi);
}

function soltar(event) {
    color = "transparent";
}


/*
Aquí comenzamos a dibujar:
.- lienzo.begin.path(), se coloca el lapiz en el papel
.- lienzo.strokeStyle=“red”, se define el color de la linea
.- lienzo.moveTo(), punto de inicio
.- lienzo.lineTo(), punto de finalización
.- lienzo.stroke(), trazar la linea
.- lienzo.closePath(), se levanta el lapiz
*/

/*
Para obtener los valores de las propiedades ancho y alto en CSS utilizamos
el método getComputedStyle() que devuelve un objeto con todos los estilos
del elemento en CSS. Utilizamos este método para calcular el ancho y alto
del elemento canvas redimensionado en CSS.

var s = getComputedStyle(canvas);
var w = s.width;
var h = s.height;

El alto y ancho del elemento canvas vienen en píxeles así que tenemos que extraer su valor
numérico haciendo uso del método split. Estos valores los asignamos a los valores de
"canvas.width y canvas.height" . Ahora al modificarse responsivamente los valores de las
propiedades alto y ancho de CSS también se modificarán los atributos de alto y ancho
en HTML modificando el tamaño del mapa de bits del elemento canvas.

canvas.width = w.split('px')[0];
canvas.height = h.split('px')[0];
*/

// addEventListener('touchstart', function (event) {
//     //Comprobamos si hay varios eventos del mismo tipo
//     if (event.targetTouches.length == 1) {
//         var touch = event.targetTouches[0];
//         // con esto solo se procesa UN evento touch
//         alert(" se ha producido un touchstart en las siguientes cordenas: X " + touch.offsetX + " en Y " + touch.offsetY);
//     }

// }, false);
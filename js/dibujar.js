//Arreglo de Nodos y Conectores 
let nodos = [];
let conectores = [];

//Recupera información del  canvas 
let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * (2 / 3);
canvas.height = window.innerHeight;
let dragging;
let startX;
let startY;
let x_offset = canvas.offsetLeft;
let y_offset = canvas.offsetTop;
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmousemove = mouseMove;

//Definición de los nodos 
function Nodo(x, y) {
    this.x = x;
    this.y = y;
    this.rx = 25;
    this.text = "A";
    this.bg_color = "#FFFFFF";
    this.text_color = "black";
    this.stroke_color = "black";
    this.nodos_adj = [];
    this.dragging = false;
    this.selected = false;
}

//Crea y dibuja el nodo
function CrearNodo(e){
        let x_cord = e.clientX - x_offset;
        let y_cord = e.clientY - y_offset;
        canvas.onclick = null;
        let nod = new Nodo(x_cord,y_cord);
        nodos.push(nod)
        ctx.beginPath();
        ctx.arc(nod.x, nod.y, 30, 0, 2 * Math.PI);
        ctx.fillStyle = nod.bg_color;
        ctx.fill();
        ctx.fillStyle = nod.text_color;
        ctx.font = "12px Montserrat";
        ctx.fillText(nod.text, nod.x - nod.rx / 4, nod.y);
        ctx.strokeStyle = nod.stroke_color;
        ctx.lineWidth = 1;
        ctx.stroke();
}

//Dibujar Nodo 
function DibujarNodo(nod){
    ctx.beginPath();
    ctx.arc(nod.x, nod.y, 30, 0, 2 * Math.PI);
    ctx.fillStyle = nod.bg_color;
    ctx.fill();
    ctx.fillStyle = nod.text_color;
    ctx.font = "12px Montserrat";
    ctx.fillText(nod.text, nod.x - nod.rx / 4, nod.y);
    ctx.strokeStyle = nod.stroke_color;
    ctx.lineWidth = 1;
    ctx.stroke();
}

//Para arrastrar la figura 

function mouseInShape(shape, mx, my) {
    if (shape instanceof Nodo) {
        let x = Math.pow(mx - shape.x, 2) / Math.pow(shape.rx, 2);
        let y = Math.pow(my - shape.y, 2) / Math.pow(shape.rx, 2);
        return x + y <= 1;
    }
}

function mouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    let mouseX = e.clientX - x_offset;
    let mouseY = e.clientY - y_offset;
    dragging = false;
    for (let i = 0; i < nodos.length; i++) {
        if (mouseInShape(nodos[i], mouseX, mouseY)) {
            document.getElementById("main-canvas").style.cursor = "grabbing";
            dragging = true;
            nodos[i].dragging = true;
        }
    }
    reDraw();
    startX = mouseX;
    startY = mouseY;
}

function mouseUp(e) {
    e.preventDefault();
    e.stopPropagation();
    dragging = false;
    for (let i = 0; i < nodos.length; i++) {
        document.getElementById("main-canvas").style.cursor = "-webkit-grab";
        nodos[i].dragging = false;
    }
}

function mouseMove(e) {
    let mouseX = e.clientX - x_offset;
    let mouseY = e.clientY - y_offset;
    for (let i = 0; i < nodos.length; i++) {
        if (mouseInShape(nodos[i], mouseX, mouseY)) {
            document.getElementById("main-canvas").style.cursor = "-webkit-grab";
        } else {
            document.getElementById("main-canvas").style.cursor = "auto";
        }
    }
    if (dragging) {
        document.getElementById("main-canvas").style.cursor = "grabbing";
        e.preventDefault();
        e.stopPropagation();
        let mx = e.clientX - x_offset;
        let my = e.clientY - y_offset;
        let dx = mx - startX;
        let dy = my - startY;
        for (let i = 0; i < nodos.length; i++) {
            if (nodos[i].dragging) {
                nodos[i].x += dx;
                nodos[i].y += dy;
            }
        }
        reDraw();
        startX = mx;
        startY = my;
    }
}

// Redibujar circulos
function reDraw() {
    clearCanvas();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    for (let i = 0; i < nodos.length; i++) {
        DibujarNodo(nodos[i]);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function limpiarPantalla() {
    clearCanvas();
    nodos = [];
}
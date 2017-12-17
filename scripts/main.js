


var mainCanvas = document.getElementById("mainCanvas");

var context = mainCanvas.getContext("2d");

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
var currentX = 0;
var currentY = 0;

// caching this element so we need not traverse the DOM often:
var freeHand = document.getElementById("freehand");

let redSlider = document.getElementById("red");
let greenSlider = document.getElementById("green");
let blueSlider = document.getElementById("blue");

function rgb(r, g, b)
{
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function getMousePos(canvas, event) 
{
  let rect = canvas.getBoundingClientRect();
  let pos = {  x: Math.ceil((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width),// canvas.offsetLeft,
               y: Math.ceil((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height) // canvas.offsetTop 
            };
  return pos;  
}

mainCanvas.addEventListener("mousedown", function(event)
{        
    // console.log("(" + startX + ", " + startY + ")");
    let pos = getMousePos(this, event);
    startX = pos.x;
    startY = pos.y;
});

mainCanvas.addEventListener("mousemove", function(event){
    let pos = getMousePos(this, event);
    let h3 = document.getElementById("coords");

    h3.innerHTML = "(X, Y) : " + "(" + pos.x + ", " + pos.y + ")";
    
    if(event.which === 1)
    {
        if(freeHand.checked === true)
        {
            // we need to draw free-hand style
            let color = getColor(redSlider, greenSlider, blueSlider);
            context.fillStyle = rgb(color[0], color[1], color[2]);
            context.strokeStyle = rgb(color[0], color[1], color[2]);
            context.beginPath();
            context.arc(pos.x, pos.y, 1, 0, 2*Math.PI);
            context.stroke();
        }
    }
    
    
});

mainCanvas.addEventListener("mouseup", function(event)
{
    let pos = getMousePos(this, event);
    endX = pos.x;
    endY = pos.y;
    handleCanvas();
});


function getColor(r, g, b)
{
    let RGB = [r.value, g.value, b.value];
    return RGB;
}

//-----------------------

function handleMouse()
{    
    let RGB = getColor(redSlider, greenSlider, blueSlider);
    let red = RGB[0];
    let green = RGB[1];
    let blue = RGB[2];

    let square = document.getElementById("square");
    let label = document.getElementById("rgbcolor");

    square.style.backgroundColor = rgb(red, green, blue);
    label.innerHTML = "RGB(" + red + ", " + green + ", " + blue + ")";    
}

//-----------------------

let btn = document.getElementById("clearbtn");

btn.addEventListener("click", function(){
    context.fillStyle = "#ffffff";
    context.strokeStyle = "#ffffff";
    context.fillRect(0, 0, mainCanvas.width, mainCanvas.height);    
    context.stroke();
}, false);

redSlider.addEventListener("input", function()
{       
   handleMouse();
});

greenSlider.addEventListener("input", function()
{
    handleMouse();
});

blueSlider.addEventListener("input", function()
{
    handleMouse();
});


function drawPoint()
{
 
    let x = startX; 
    let y = startY;  
    let color = document.getElementById("square").style.backgroundColor;    
    context.fillStyle = color;
    context.strokeStyle = color;
    
    context.beginPath();    
    context.arc(x, y, 1, 0, Math.PI*2, false);   
    context.stroke();
}

function drawLine()
{
    let x = startX; 
    let y = startY; 
    let color = document.getElementById("square").style.backgroundColor;
       
    context.strokeStyle = color;    
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(endX, endY);   
    context.stroke();
}

function drawCricle()
{
    let color = document.getElementById("square").style.backgroundColor;
    let radius = Math.sqrt( (startX - endX)*(startX - endX) + (startY - endY)*(startY - endY) );
    context.fillStyle = color;
    context.strokeStyle = color;

    context.beginPath();        
    context.arc(startX, startY, radius, 0, Math.PI*2);
    context.fill();
    context.stroke();
}

function drawRect()
{
    let color = document.getElementById("square").style.backgroundColor;
   
    context.fillStyle = color; 
    context.fillRect(startX, startY, endX - startX, endY - startY);
    context.stroke();
}


function handleCanvas()
{  
    let p = document.getElementById("point");
    let l = document.getElementById("line");
    let c = document.getElementById("circle");
    let r = document.getElementById("rect");    

    if(p.checked === true)
    {
        drawPoint();
        return;
    } 
    
    if(l.checked === true)
    {
        drawLine();
        return;
    }

    if(c.checked === true)
    {
        drawCricle();
        return;
    }

    if(r.checked === true)
    {
        drawRect();
        return;
    }
    
}


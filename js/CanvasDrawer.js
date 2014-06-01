/*
Author: Marc Guilera

Create a CanvasDrawer passing the canvas object and the array of colors
in hex that you want to use.

Example:
 new CanvasDrawer(document.getElementById('mycanvas'),
 new Array('#00ff00','#ff0000','#0000ff','ffff00','ff00ff','00ffff','#ffffff','#000000'));
 */

function CanvasDrawer(canvas, colors){
    var ctx=canvas.getContext("2d"); //Context 2d for painting purposes
    var mouseDown = false; //Whether the mouse is being clicked or not
    var currentColor = null;
    var mousePos = {x: 0, y: 0};
    var colorsArray = new Array();

    //Painting loop
    setInterval(function(){
        //Paint in the canvas
        if(mouseDown) currentColor.drawPath();
    },1);


    //Event handlers
    window.onmousedown = function() {
        //Check if user is clicking on an option
        for(var i=0;i<colorsArray.length;i++){
            if(mousePos.x>=colorsArray[i].posX-5&&mousePos.x<=colorsArray[i].posX+40+5
                &&mousePos.y>=colorsArray[i].posY-5&&mousePos.y<=colorsArray[i].posY+20+5){
                //Hit
                currentColor=colorsArray[i];
                return;
            }
        }
        mouseDown = true;
    }
    window.onmouseup = function() {
        mouseDown = false;
    }
    window.onmousemove = function(event){
        event = event || window.event; // IE-ism
        mousePos = {
            x: event.clientX,
            y: event.clientY
        };
    }

    //Creation of the colorsArray acording to colors passed in the header
    for(var i=0;i<colors.length;i++) colorsArray.push(new Color(colors[i]));

    /*
    FUNCTIONS
     */
    drawTools();
    //Draws right tools
    function drawTools(){
        var posX=10;
        var posY=10;
        for(var i=0;i<colorsArray.length;i++){
            colorsArray[i].drawSquare(posX,posY);
            posY+=30;
            if(posY+20>canvas.height) {posX+=50; posY=10} //Creates new columns if colors don't fit the canvas height
        }

        //Set first color to active
        currentColor=colorsArray[0];
    }

    function clear(){
        canvas.width = canvas.width;
        drawTools();
    }

    /*
    Classes
     */

    //Color class
    function Color(hex){
        //Creates a color by hex code
        this.hex = hex;
        this.drawPath = function(){
            ctx.beginPath();
            ctx.arc(mousePos.x, mousePos.y, 20, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.hex;
            ctx.fill();
        }

        //Square vars
        this.posX = 0;
        this.posY = 0;
        this.drawSquare = function(posX,posY){
            this.posX=posX;
            this.posY=posY;
            ctx.rect(posX,posY,40,20);
            ctx.fillStyle=this.hex;
            ctx.fillRect(posX,posY,40,20);
            ctx.stroke();
        }
    }
}


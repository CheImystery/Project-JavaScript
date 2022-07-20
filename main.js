let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let shmelik = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

shmelik.src = "content/shmelik.png";
bg.src = "content/bg.png";
fg.src = "content/fg.png";
pipeUp.src = "content/pipeUp.png";
pipeBottom.src = "content/pipeBottom.png";

let gap = 90;
let score = 0;
let xPos = 10;
let yPos = 150;
let grav = 1.5;
let pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

document.addEventListener("keydown", moveUp);

function moveUp() {yPos -= 25;}

function draw() 
{
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) 
    {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 125)
        {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if(xPos + shmelik.width >= pipe[i].x
           && xPos <= pipe[i].x + pipeUp.width
           && (yPos <= pipe[i].y + pipeUp.height || yPos + shmelik.height >= pipe[i].y + pipeUp.height + gap)
           || yPos + shmelik.height >= cvs.height - fg.height) {location.reload();}

        if(pipe[i].x == 5) {score++;}
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(shmelik, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;

function draw(ctx, sq, n) {// draws a grid of n x n with squares of width sq


    var grid = 0;
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= n; j++) {
            //console.log(Math.round(Math.random()*255));
            if (grid % 2 == 0)
                ctx.fillStyle = "rgb(80,150,0)";
            else
                ctx.fillStyle = "rgb(10,70,10)";
            ctx.fillRect(j * sq, i * sq, sq, sq);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.strokeRect(j * sq, i * sq, sq, sq);
            grid++;
        }
        grid--;
    }

}
function snake(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 200);
    ctx.stroke();
}
class player {
    constructor(ctx, x, y, n) {
        //const color,x,y;
        const colors = ["red", "green", "blue", "yellow"];
        this.color = colors[n - 1];
        this.x = x;
        this.y = y;
        this.n = n;


    }
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.loop = true;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
var myMusic;
function start(ctx, player) {
    blink();
    myMusic = new sound("coverMusic.mp3");
    myMusic.play();
    console.log(player.x + " " + player.y);
    
    ctx.beginPath();
    //ctx.arc(175,425,15,0,2*Math.PI);
    ctx.arc(player.x, player.y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = player.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
function blink(){
    console.log(document.getElementById("dice").style.boxShadow);
    var dice =  document.getElementById("dice");
    
    setInterval(function(){
        dice.style.boxShadow = `0px 0px ${Math.round(Math.random() * 30)}px ${Math.round(Math.random() * 15)}px black`;
    },200);
    
}
let dir = 1;
function move(ctx, player, sq, n, pts) {
   
    var initialX = player.x;
    var initialY = player.y;
    var newX, newY;

    console.log(player.x, player.y, dir, pts);
    //remove old position/circle***************************************
    ctx.clearRect(player.x - 17, player.y - 17, 34, 34);

    if ((Math.round((player.y - sq) / sq)) % 2 == 0 && Math.round(((player.x - sq) / sq)) % 2 == 1)
        ctx.fillStyle = "black";//"rgb(10,70,10)";
    else if ((Math.round((player.y - sq) / sq)) % 2 == 1 && Math.round(((player.x - sq) / sq)) % 2 == 0)
        ctx.fillStyle = "black";//"rgb(10,70,10)";
    else
        ctx.fillStyle = "white"//"rgb(80,150,0)";
    ctx.fillRect(player.x - 17, player.y - 17, 34, 34);
    //create new position/circle****************************************
    //general player move logic
    if (initialX + dir * sq * pts < sq + (sq / 2) && initialY <= sq + (sq / 2)) {
        newX = initialX;
        newY = initialY;
    }
    else if (initialX + dir * sq * pts > (sq * n) + (sq / 2)) {
        newY = initialY - sq;
        var xoverflow = (initialX + sq * pts) - (sq * n);
        newX = (sq * n) - xoverflow + 2 * sq;
        dir = -1;
        //console.log(xoverflow);
    }
    else if (initialX + dir * sq * pts < sq + (sq / 2)) {
        newY = initialY - sq;
        var xoverflow = -(initialX - sq * pts) + sq + (sq / 2);
        newX = (sq / 2) + xoverflow;
        dir = 1;
    }
    else {
        //console.log(player.x,player.y,dir);
        newX = initialX + dir * sq * pts;
        newY = initialY;
    }
    //draw first for visual effect
    player.x = newX;
    player.y = newY;
    ctx.beginPath();
    ctx.arc(newX, newY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = player.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    //snakes and ladder logic: 275,475 <- 125,425 , 425,425 -> 425,275,
    // 275,275 <- 275,175, 125,275 -> 125,175
    //isGameOver?
    if(player.x == sq + (sq/2) && player.y == sq + (sq/2)){
        document.getElementById("button").disabled = true;
        myMusic.stop();
        myMusic = new sound("winMusic.wav");
        myMusic.play();
        setTimeout(function(){
            window.location.reload();
        },5950);
       
    }
    document.getElementById("button").disabled = true;
    if (newX == 125 && newY == 425 || newX == 275 && newY == 125 || newX == 425 && newY == 425 || newX == 125 && newY == 275) {
        //snake1
        if (newX == 125 && newY == 425) {
            newY = 475;
            newX = 275;
            dir = -1;
            //effect
            setTimeout(function(){ 
                ctx.clearRect(player.x - 17, player.y - 17, 34, 34);

                if ((Math.round((player.y - sq) / sq)) % 2 == 0 && Math.round(((player.x - sq) / sq)) % 2 == 1)
                    ctx.fillStyle = "black";//"rgb(10,70,10)";
                else if ((Math.round((player.y - sq) / sq)) % 2 == 1 && Math.round(((player.x - sq) / sq)) % 2 == 0)
                    ctx.fillStyle = "black";//"rgb(10,70,10)";
                else
                    ctx.fillStyle = "white"//"rgb(80,150,0)";
                ctx.fillRect(player.x - 17, player.y - 17, 34, 34);
            }, 200);
            
        }
        //snake2
        else if (newX == 275 && newY == 125) {
            newY = 275;
            newX = 275;
            dir = -1;
             //effect
             setTimeout(function(){ 
                ctx.clearRect(player.x - 17, player.y - 17, 34, 34);

                if ((Math.round((player.y - sq) / sq)) % 2 == 0 && Math.round(((player.x - sq) / sq)) % 2 == 1)
                    ctx.fillStyle = "black";//"rgb(10,70,10)";
                else if ((Math.round((player.y - sq) / sq)) % 2 == 1 && Math.round(((player.x - sq) / sq)) % 2 == 0)
                    ctx.fillStyle = "black";//"rgb(10,70,10)";
                else
                    ctx.fillStyle = "white"//"rgb(80,150,0)";
                ctx.fillRect(player.x - 17, player.y - 17, 34, 34);
            }, 200);
        }
        //ladder1
        else if (newX == 425 && newY == 425) {
            newY = 275;
            newX = 475;
            dir = -1;
             //effect
             setTimeout(function(){ 
                ctx.clearRect(player.x - 17, player.y - 17, 34, 34);

                if ((Math.round((player.y - sq) / sq)) % 2 == 0 && Math.round(((player.x - sq) / sq)) % 2 == 1)
                    ctx.fillStyle = "black";//"rgb(10,70,10)";
                else if ((Math.round((player.y - sq) / sq)) % 2 == 1 && Math.round(((player.x - sq) / sq)) % 2 == 0)
                    ctx.fillStyle = "black";//"rgb(10,70,10)";
                else
                    ctx.fillStyle = "white"//"rgb(80,150,0)";
                ctx.fillRect(player.x - 17, player.y - 17, 34, 34);
            }, 200);
        }
        //ladder2
        else if (newX == 125 && newY == 275) {
            newY = 175;
            newX = 125;
            dir = -1;
             //effect
             setTimeout(function(){ 
                ctx.clearRect(player.x - 17, player.y - 17, 34, 34);

                if ((Math.round((player.y - sq) / sq)) % 2 == 0 && Math.round(((player.x - sq) / sq)) % 2 == 1)
                    ctx.fillStyle = "black";//"rgb(10,70,10)";
                else if ((Math.round((player.y - sq) / sq)) % 2 == 1 && Math.round(((player.x - sq) / sq)) % 2 == 0)
                    ctx.fillStyle = "black";//"rgb(10,70,10)";
                else
                    ctx.fillStyle = "white"//"rgb(80,150,0)";
                ctx.fillRect(player.x - 17, player.y - 17, 34, 34);
            },300);
        }

        //draw circle at newX,newY***********************************
        setTimeout(function(){ 
            player.x = newX;
            player.y = newY;
            ctx.beginPath();
            ctx.arc(newX, newY, 15, 0, 2 * Math.PI);
            ctx.fillStyle = player.color;
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }, 600);
        
    }
    setTimeout(function(){
        document.getElementById("button").disabled = false;
    }, 700); // max allowed click speed of dice casting button!(must be > 800)
    
}
window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    const sq = 50;//square width
    const n = 10;//board size(n x n)
    canvas.height = n * sq + 100;
    canvas.width = n * sq + 100;
    draw(ctx, sq, n);
    //snake(ctx);
    //const player2 =new player(ctx,175,425,2);
    const player1 = new player(ctx, sq + sq / 2, sq + (n * sq) - (sq / 2), 1);
    
    document.getElementById("start").addEventListener("click", () => {
        start(ctx, player1);
        document.getElementById("start").style.visibility = "hidden";
        document.getElementById("dice").style.visibility = "visible";
        document.getElementById("button").style.visibility = "visible";
    });
    document.getElementById("button").addEventListener("click", () => {
        var diceVal = 1+ Math.round(Math.random()*5);
        document.getElementById("dice").style.backgroundImage = "url("+diceVal+".png)";
        move(ctx, player1, sq, n, diceVal);
    });

    //ctx.strokeStyle = "black";
    //ctx.strokeRect(100,100,100,100);
    //ctx.fillRect(200,100,100,100);

})

window.addEventListener('resize', () => {
    //console.log(n,sq);
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = n * sq + 100;
    canvas.width = n * sq + 100;
    draw(ctx);
});


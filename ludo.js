
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
    constructor(ctx, x, y, n, sq) {
        //const color,x,y;
        const colors = ["red", "green", "blue", "yellow"];
        this.color = colors[n - 1];
        this.x = x;
        this.y = y;
        this.n = n;
        if ((Math.round((y - sq) / sq)) % 2 == 0)
            this.dir = 1;
        if ((Math.round((y - sq) / sq)) % 2 == 1)
            this.dir = -1;

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
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}
var myMusic;
function backgroundMusic() {
    myMusic = new sound("coverMusic.mp3");
    myMusic.play();
}
function start(ctx, player) {
    //blink();

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
function end(player, sq) {
    //isGameOver?
    if (player.x == sq + (sq / 2) && player.y == sq + (sq / 2)) {
        document.getElementById("button").disabled = true;
        document.getElementById("p" + player.n + "win").style.visibility = "visible";
        myMusic.stop();
        myMusic = new sound("winMusic.wav");
        myMusic.play();
        setTimeout(function () {
            window.location.reload();
        }, 5900);

    }
}
function blink() {
    console.log(document.getElementById("dice").style.boxShadow);
    var dice = document.getElementById("dice");

    setInterval(function () {
        dice.style.boxShadow = `0px 0px ${Math.round(Math.random() * 30)}px ${Math.round(Math.random() * 15)}px black`;
    }, 200);

}
function focus(){

}
//let dir = 1;
function move(ctx, player, player2, sq, n, pts) {
    document.getElementById("d").style.borderColor = player.color;
    var initialX = player.x;
    var initialY = player.y;
    var newX, newY;

    console.log("1=" + player.x, player.y + "  2=" + player2.x, player2.y, pts, player.n);
    //remove old position/circle of player1***************************************
    ctx.clearRect(player.x - 17, player.y - 17, 34, 34);

    if ((Math.round((player.y - sq) / sq)) % 2 == 0 && Math.round(((player.x - sq) / sq)) % 2 == 1)
        ctx.fillStyle = "rgb(10,70,10)";
    else if ((Math.round((player.y - sq) / sq)) % 2 == 1 && Math.round(((player.x - sq) / sq)) % 2 == 0)
        ctx.fillStyle = "rgb(10,70,10)";
    else
        ctx.fillStyle = "rgb(80,150,0)";
    ctx.fillRect(player.x - 17, player.y - 17, 34, 34);

    //create new position/circle of player1****************************************
    //check if collision has occured!
    if (player.x == player2.x && player.y == player2.y) {
        console.log("1=" + player.x, player.y + "  2=" + player2.x, player2.y);
        ctx.beginPath();
        ctx.arc(player2.x, player2.y, 15, 0, 2 * Math.PI);
        ctx.fillStyle = player2.color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    //general player move logic
    if (initialX + player.dir * sq * pts < sq + (sq / 2) && initialY <= sq + (sq / 2)) {
        newX = initialX;
        newY = initialY;
    }
    else if (initialX + player.dir * sq * pts > (sq * n) + (sq / 2)) {
        newY = initialY - sq;
        var xoverflow = (initialX + sq * pts) - (sq * n);
        newX = (sq * n) - xoverflow + 2 * sq;
        player.dir = -1;
        //console.log(xoverflow);
    }
    else if (initialX + player.dir * sq * pts < sq + (sq / 2)) {
        newY = initialY - sq;
        var xoverflow = -(initialX - sq * pts) + sq + (sq / 2);
        newX = (sq / 2) + xoverflow;
        player.dir = 1;
    }
    else {
        //console.log(player.x,player.y,player.dir);
        newX = initialX + player.dir * sq * pts;
        newY = initialY;
    }
    //draw first for visual effect fro snake bites and ladder climbs

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


    if ((newX == 125 && newY == 425) || (newX == 275 && newY == 125) || (newX == 425 && newY == 425) || (newX == 125 && newY == 275)) {
        //snake1
        console.log(newX, newY, player.n)
        if (newX == 125 && newY == 425) {

            player.dir = -1;
            //effect
            setTimeout(function () {
                ctx.clearRect(newX - 17, newY - 17, 34, 34);

                if ((Math.round((newY - sq) / sq)) % 2 == 0 && Math.round(((newX - sq) / sq)) % 2 == 1)
                    ctx.fillStyle = "rgb(10,70,10)";
                else if ((Math.round((newY - sq) / sq)) % 2 == 1 && Math.round(((newX - sq) / sq)) % 2 == 0)
                    ctx.fillStyle = "rgb(10,70,10)";
                else
                    ctx.fillStyle = "rgb(80,150,0)";
                ctx.fillRect(newX - 17, newY - 17, 34, 34);
                newY = 475;
                newX = 275;
            }, 200);


        }
        //snake2
        else if (newX == 275 && newY == 125) {

            player.dir = -1;
            //effect
            setTimeout(function () {
                ctx.clearRect(newX - 17, newY - 17, 34, 34);

                if ((Math.round((newY - sq) / sq)) % 2 == 0 && Math.round(((newX - sq) / sq)) % 2 == 1)
                    ctx.fillStyle = "rgb(10,70,10)";
                else if ((Math.round((newY - sq) / sq)) % 2 == 1 && Math.round(((newX - sq) / sq)) % 2 == 0)
                    ctx.fillStyle = "rgb(10,70,10)";
                else
                    ctx.fillStyle = "rgb(80,150,0)";
                ctx.fillRect(newX - 17, newY - 17, 34, 34);
                newY = 275;
                newX = 275;
            }, 200);

        }
        //ladder1
        else if (newX == 425 && newY == 425) {

            player.dir = -1;
            //effect
            setTimeout(function () {
                ctx.clearRect(newX - 17, newY - 17, 34, 34);

                if ((Math.round((newY - sq) / sq)) % 2 == 0 && Math.round(((newX - sq) / sq)) % 2 == 1)
                    ctx.fillStyle = "rgb(10,70,10)";
                else if ((Math.round((newY - sq) / sq)) % 2 == 1 && Math.round(((newX - sq) / sq)) % 2 == 0)
                    ctx.fillStyle = "rgb(10,70,10)";
                else
                    ctx.fillStyle = "rgb(80,150,0)";
                ctx.fillRect(newX - 17, newY - 17, 34, 34);
                newY = 275;
                newX = 475;
            }, 200);

        }
        //ladder2
        else if (newX == 125 && newY == 275) {

            player.dir = -1;
            //effect
            setTimeout(function () {
                ctx.clearRect(newX - 17, newY - 17, 34, 34);
                if ((Math.round((newY - sq) / sq)) % 2 == 0 && Math.round(((newX - sq) / sq)) % 2 == 1)
                    ctx.fillStyle = "rgb(10,70,10)";
                else if ((Math.round((newY - sq) / sq)) % 2 == 1 && Math.round(((newX - sq) / sq)) % 2 == 0)
                    ctx.fillStyle = "rgb(10,70,10)";
                else
                    ctx.fillStyle = "rgb(80,150,0)";
                ctx.fillRect(newX - 17, newY - 17, 34, 34);
                newY = 175;
                newX = 125;
            }, 200);

        }

        //draw circle at newX,newY***********************************
        setTimeout(function () {

            ctx.beginPath();
            ctx.arc(newX, newY, 15, 0, 2 * Math.PI);
            ctx.fillStyle = player.color;
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }, 600);

    } //snakes and ladder logic: ends
    setTimeout(function () {
        player.x = newX;
        player.y = newY;
        //is Game Over?
        end(player, sq);
    }, 300);//must be greater than the time out of newX newY update on sankes & ladder logic >200

    console.log("1=" + player.x, player.y, player.n);
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
    const player2 = new player(ctx, sq + sq / 2, sq + (n * sq) - (sq / 2), 2, sq);
    const player1 = new player(ctx, sq + sq / 2, sq + (n * sq) - (sq / 2), 1, sq);

    document.getElementById("start").addEventListener("click", () => {
        backgroundMusic();

        start(ctx, player2);
        start(ctx, player1);
        //highlight player 1  &&  disble player2
        document.getElementById("d").style.visibility = "visible";
        document.getElementById("p1").style.visibility = "visible";
        document.getElementById("button2").disabled = true;
        document.getElementById("start").style.visibility = "hidden";
        document.getElementById("dice").style.visibility = "visible";
        document.getElementById("button").style.visibility = "visible";
        document.getElementById("button2").style.visibility = "visible";
    });
    document.getElementById("button").addEventListener("click", () => {
        var diceVal = 1 + Math.round(Math.random() * 5);
        document.getElementById("dice").style.backgroundImage = "url(" + diceVal + ".png)";
        move(ctx, player1, player2, sq, n, diceVal);
        //effect
        document.getElementById("p1").style.visibility = "hidden";
        document.getElementById("p2").style.visibility = "visible";
        document.getElementById("button").disabled = true;
        document.getElementById("button2").disabled = false;
    });
    document.getElementById("button2").addEventListener("click", () => {
        var diceVal = 1 + Math.round(Math.random() * 5);
        document.getElementById("dice").style.backgroundImage = "url(" + diceVal + ".png)";
        move(ctx, player2, player1, sq, n, diceVal);
        //effect
        document.getElementById("p1").style.visibility = "visible";
        document.getElementById("p2").style.visibility = "hidden";
        document.getElementById("button").disabled = false;
        document.getElementById("button2").disabled = true;
    });

    //ctx.strokeStyle = "black";
    //ctx.strokeRect(100,100,100,100);
    //ctx.fillRect(200,100,100,100);

});

window.addEventListener('resize', () => {
    //console.log(n,sq);
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = n * sq + 100;
    canvas.width = n * sq + 100;
    draw(ctx);
});


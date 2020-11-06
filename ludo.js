function draw(ctx,sq,n){// draws a grid of n x n with squares of width sq
    
    
    var grid = 0;
    for(i=1;i<=n;i++){
        for(j=1;j<=n;j++){
            //console.log(Math.round(Math.random()*255));
            if(grid % 2 == 0)
                ctx.fillStyle = "rgb(80,150,0)";
            else
                ctx.fillStyle = "rgb(10,70,10)";
            ctx.fillRect(j*sq,i*sq,sq,sq);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.strokeRect(j*sq,i*sq,sq,sq);
            grid++;
        }
        grid--;
    }
    
}
function snake(ctx){
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.lineTo(200,200);
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
function show(ctx,player){
    console.log(player.x+" "+player.y);
    ctx.beginPath();
    ctx.arc(player.x,player.y,15,0,2*Math.PI);
    ctx.fillStyle = player.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
let dir = 1;
function move(ctx,player,sq,n,pts){
    var initialX = player.x;
    var initialY = player.y;
    var newX,newY;
    
    console.log(player.x,player.y,dir,pts);
    //remove old position
    ctx.clearRect(player.x-17,player.y-17,34,34);
    
    if( (Math.round((player.y-sq)/sq)) % 2 == 0 && Math.round(((player.x-sq)/sq)) % 2 == 1)
        ctx.fillStyle = "black";//"rgb(10,70,10)";
    else if((Math.round((player.y-sq)/sq)) % 2 == 1 && Math.round(((player.x-sq)/sq)) % 2 == 0)
        ctx.fillStyle = "black";//"rgb(10,70,10)";
    else
        ctx.fillStyle = "white"//"rgb(80,150,0)";
    ctx.fillRect(player.x-17,player.y-17,34,34);
    //create new position
    if(initialX + dir*sq*pts < sq+(sq/2) && initialY <= sq+(sq/2)){
        newX = initialX;
        newY = initialY; 
    }
    else if(initialX + dir*sq*pts > (sq*n)+(sq/2)){
        newY = initialY - sq;
        var xoverflow = (initialX + sq*pts) - (sq*n);
        newX = (sq*n) - xoverflow + 2*sq;
        dir = -1;
        //console.log(xoverflow);
    }
    else if(initialX + dir*sq*pts < sq+(sq/2)){
        newY = initialY - sq;
        var xoverflow = -(initialX - sq*pts) + sq+(sq/2);
        newX = (sq/2) + xoverflow ;
        dir = 1;
    }
    else{
        //console.log(player.x,player.y,dir);
        newX = initialX + dir*sq*pts;
        newY = initialY; 
    }
   /* if(player.x == sq*10-(sq/2)){
        player.y-=sq;
        ctx.fillStyle = player.color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        return;
    }*/
    
    player.x = newX;
    player.y = newY;
    ctx.beginPath();
    ctx.arc(newX,newY,15,0,2*Math.PI);
    ctx.fillStyle = player.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
window.addEventListener('load', ()=>{
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    const sq = 50;//square width
    const n = 10;//board size(n x n)
    canvas.height  = n * sq + 100;
    canvas.width = n * sq + 100;
    draw(ctx,sq,n);
    //snake(ctx);
    const player1 =new player(ctx,sq+sq/2,sq+(n*sq)-(sq/2),1);
    show(ctx,player1);
    document.getElementById("button").addEventListener("click", ()=>{
        move(ctx,player1,sq,n,Math.round(Math.random()*6));
    });
    
    //ctx.strokeStyle = "black";
    //ctx.strokeRect(100,100,100,100);
    //ctx.fillRect(200,100,100,100);
    
})

window.addEventListener('resize',()=>{
    //console.log(n,sq);
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height  = n * sq + 100;
    canvas.width = n * sq + 100;
    draw(ctx);
});


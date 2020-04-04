var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var paddleheight=10;
var paddlewidth=75;
var paddlex=(canvas.width)/2;
var rightpressed=false;
var leftpressed=false;
var x= canvas.width/2;
var y=canvas.height-30;
var dx= 2 ;
var dy= -2;
var ballradius=10;
var brickrowcount= 3;
var brickcolumncount= 8;
var brickwidth= 75;
var brickheight=20;
var brickoffsettop=30;
var brickoffsetleft=40;
var brickpadding=30;
var score=0;
var lives=3;

var bricks=[];
for(var c=0; c<brickcolumncount; c++){
  bricks[c]=[];
  for(var r=0;r<brickrowcount;r++){
  bricks[c][r]={x:0,y:0,status:1};
  }
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove",mousemovehandler,false);
function mousemovehandler(e){
  var relativex=e.clientX - canvas.offsetLeft;
  if(relativex>0 && relativex<canvas.width){
    paddlex=relativex-paddlewidth/2;
  }
}
function keyDownHandler(e) {
  if(e.key=="Right" || e.key=="ArrowRight"){
    rightpressed=true;
  }
  else if(e.key=="Left" || e.key=="ArrowLeft"){
    leftpressed=true;
  }

}
function keyUpHandler(e) {
  if(e.key=="Right" || e.key=="ArrowRight"){
    rightpressed=false;
  }
  else if(e.key=="Left" || e.key=="ArrowLeft"){
    leftpressed=false;
  }

}
function collisiondetection() {
    for (var c = 0; c < brickcolumncount; c++) {
        for (var r = 0; r < brickrowcount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickwidth && y > b.y && y < b.y + brickheight) {
                    dy = -dy;
                    b.status = 0;
                    score=score+10;
                    if(score== brickrowcount*brickcolumncount*10){
                      alert("YOU WIN CONGRSTULATION!!!")
                      document.location.reload();
                      clearInterval(interval);
                    }
                }
            }
        }
    }
}
function drawscore(){
  ctx.font = "20px bold";
  ctx.fillStyle="black";
  ctx.fillText("Score:"+score,8,20);
}
function drawlives(){
  ctx.font="20px bold";
  ctx.fillStyle="black";
  ctx.fillText("Lives:"+lives,800,20);
}

function drawball() {

    ctx.beginPath();
    ctx.arc(x, y, ballradius, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

}

function drawpaddle(){
  ctx.beginPath();
  ctx.rect(paddlex,canvas.height-paddleheight,paddlewidth,paddleheight);
  ctx.fillStyle="blue";
  ctx.fill();
  ctx.closePath();
}
function drawbricks() {
  for(var c=0;c<brickcolumncount;c++){
    for(var r=0;r<brickrowcount;r++){
      if(bricks[c][r].status==1){
      var brickx=(c*(brickwidth+brickpadding))+brickoffsetleft;
      var bricky=(r*(brickheight+brickpadding))+brickoffsettop;
      bricks[c][r].x=brickx;
      bricks[c][r].y=bricky;
      ctx.beginPath();
      ctx.rect(brickx,bricky,brickwidth,brickheight);
      ctx.fillStyle="blue";
      ctx.fill();
      ctx.closePath();
    }
    }
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
    drawball();
    drawpaddle();
    drawbricks();
    collisiondetection();
    drawscore();
    drawlives();
  if(x+dx>canvas.width-ballradius || x+dx<ballradius)
  {
    dx = -dx ;
  }
  if(y+dy<ballradius){
    dy=-dy;
  }
  else if(y+dy>canvas.height-ballradius )
  {
    if(x>paddlex && x<paddlex+paddlewidth)
    {
      dy=-dy;
    }

    else {
      if(lives==1){alert("GAME OVER!");
      location.reload();
      clearInterval(interval);}
      else{
        alert("YOU LOST ONE LIFE");
        lives=lives-1;
        dy=-dy;
      }
    }
  }

  if(rightpressed){
    paddlex +=7;
    if(paddlex+paddlewidth>canvas.width){
      paddlex=canvas.width-paddlewidth;}
    }
  else if(leftpressed){
    paddlex -=7;
    if(paddlex <0){
      paddlex= 0;
    }
  }


  x += dx;
  y += dy;
}

var interval = setInterval(draw, 10);

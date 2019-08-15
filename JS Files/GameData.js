ctx = canvas.getContext("2d");

/**
0 is Header
1 is Full Screen Button
2 is Small Screen Button
3 is Ocean Tile
4 is Sand Tile
5 is Drax
6 is Canisqua
7 is Unicubb
8 is Troffinch
9 i Feliphene
10 is Switch Button
11 is Up Button
12 is Right Button
13 is Down Button
14 is Left Button
15 is Inventory Button
16 is Inventory Box
17 is Music On
18 is Music Off
19 is Sound Effects On
20 is Sound Effect Off
21 is Full Button
**/
gifname = ["Gif Files/Header.gif","Gif Files/FullScreenButton.gif","Gif Files/SmallScreenButton.gif","Gif Files/OceanTile.gif","Gif Files/SandTile.gif","Gif Files/Drax.gif","Gif Files/Canisqua.gif","Gif Files/Unicubb.gif","Gif Files/Troffinch.gif","Gif Files/Feliphene.gif","Gif Files/SwitchButton.gif","Gif Files/UpButton.gif","Gif Files/RightButton.gif","Gif Files/DownButton.gif","Gif Files/LeftButton.gif","Gif Files/InventoryButton.gif","Gif Files/InventoryBox.gif","Gif Files/MusicOnButton.gif","Gif Files/MusicOffButton.gif","Gif Files/SoundEffectOnButton.gif","Gif Files/SoundEffectOffButton.gif","Gif Files/FullButton.gif"];
gifload = [];

for(let loader = 0;loader < gifname.length;loader++){
    
gifload.push(new Image());
gifload[loader].src = gifname[loader];

}

fullscreen = new Image();
fullscreen.src = "Gif Files/FullScreenButton.gif";


currentpixpet = 0;
pixpets = [];
pixpets.push(new pixpet("Drax",14,3));

/**Lily Pads should always be the first/second item coding wise and visually because they are also tiles**/
items = [];

completion = 0;

ws = canvas.width;
hs = canvas.height;
mousex = 0;
mousey = 0;
mousedown = false;
seconds = 0;

itemamount = 3;
timer = 0;
timerbonus = 1;

//score is mainly used for animation
scoreanimation = seconds;
score = 0;
endgame = true;
difficultypage = true;

//clock animation when deleting time
clockanimation = 0;

music = new Audio("Audio Files/MainTheme.mp3");
music.volume = 1;
music.loop = true;
music.play()

sounds = [0,0,0,0,0,0];
soundeffectvolume = 1;
soundsloop = 0;

tileload = 
    [ [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,2],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,2],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    ];

tooltips = function(){  

//score keeper
if(Math.floor(seconds) > 0&&!(score > Math.floor((3000-scoreanimation*30)+(50*(itemamount-3))*(timerbonus)))){

score += Math.floor((3000-scoreanimation*30)+(50*(itemamount-3))*(timerbonus))/30;
seconds -= scoreanimation/30;
    
if(seconds <= 0){ seconds = 0; score = Math.floor(score)}
if(score >= (3000-scoreanimation*30)){ score = Math.floor(((3000-scoreanimation*30)+(50*(itemamount-3))*(timerbonus))); seconds = 0;}
if(score < 30+(50*(itemamount-3))*(timerbonus)){ score == 30+(50*(itemamount-3))*(timerbonus) }      
    
} else {
   
score = Math.floor((3000-scoreanimation*30)+(50*(itemamount-3))*(timerbonus));
if(score < 30+(50*(itemamount-3))*(timerbonus)){ score = 30+(50*(itemamount-3))*(timerbonus) }
seconds = 0;          
}  
  
ctx.globalAlpha = 1;   
    
if(difficultypage){
textmaker("CHOOSE YOUR DIFFICULTY",80,100,25); 
} else if(!timer||timer > 0) {
    
textmaker("FINAL SCORE: "+Math.floor(score),264-ctx.measureText("FINAL SCORE: "+Math.floor(score)).width/(0.78*(hs/297)),125,25);
    //alert(ctx.measureText("FINAL SCORE: "+Math.floor(score)).width);
} else {
    alert(timer);
textmaker("YOUR TIME IS UP",140,125,25); 
}

    if(!difficultypage){
    
    if(seconds <= 0){
    collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),150*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75;
    ctx.drawImage(gifload[21],(264-gifload[21].width/6)*(hs/297),150*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),150*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ difficultypage = true }
    textmaker("TRY AGAIN",(277-gifload[21].width/6),173,12);
        
      
   //Score sending goes here, can't send if timer is up
   if(timer !== 0){
        
   collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),200*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75;
    ctx.drawImage(gifload[21],(264-gifload[21].width/6)*(hs/297),200*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),200*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){   }
    textmaker("SEND SCORE",(273-gifload[21].width/6),223,12); 
    }
        
    }
        
    } else {
     
      collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),110*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75;
    ctx.drawImage(gifload[21],(264-gifload[21].width/6)*(hs/297),110*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),110*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ 
     
     if(timer == false){
     timer = 120;
     timerbonus = 1.25;
     } else if(timer == 120) {
     timer = 60;
     timerbonus = 1.5;
     } else {
     timer = false;
     timerbonus = 1;
     }
        
    }
    textmaker((!timer) ? "TIMER: NONE" :"TIMER: "+timer+"S",230,132,10);    
        
     collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),160*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75;
    ctx.drawImage(gifload[21],(264-gifload[21].width/6)*(hs/297),160*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),160*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ 
        itemamount += 1;
        if(itemamount > 5){
        itemamount = 3;
        }
    }
    textmaker("TOOL TYPES: "+itemamount,222,182,10);    
     
   collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),210*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75;
    ctx.drawImage(gifload[21],(264-gifload[21].width/6)*(hs/297),210*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),210*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ startgame() }
    textmaker("PLAY",242,235,15);       
        
    }
   
ctx.globalAlpha = 1; 
 
}

mousemake = function(event, mousedown) {
  mousex = event.clientX - canvas.getBoundingClientRect().left;
  mousey = event.clientY - canvas.getBoundingClientRect().top;
}

mousedowncheck = function(){
 mousedown = true;

 //music does not play unti clicked in some browsers
 if(music.volume == 1&&!(endgame&&!difficultypage)) { music.play() }

}

startgame = function(){

endgame = false;
difficultypage = false;
tileload = 
    [ [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,2],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,2],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    ];     
seconds = 0;
score = 0;
pixpets = [];
items = [];
pixpets.push(new pixpet("Drax",15,1));
pixpets.push(new pixpet("Canisqua",15,3));
pixpets.push(new pixpet("Unicubb",15,5));
pixpets.push(new pixpet("Troffinch",14,4));
pixpets.push(new pixpet("Feliphene",14,2));
music.play();
    
specialitems =  ["Evolution_Fruit_Thermos_Bottle","Ball_Capsule","Great_Oceanic_Clock","Ancient_Tectonic_Clock","Wooden_Chest"];
    
//Essential items that will ensure winning is possible
if(Math.floor(Math.random()*2) == 0){
items.push(new item("Wooden_Raft",15,0));
} else {
items.push(new item("Lily_Pad",15,0));
items.push(new item("Lily_Pad",15,2));
} 
    
if(Math.floor(Math.random()*2) == 0){
items.push(new item("Pixeldust_Boots",14,5));
} else if(Math.floor(Math.random()*2) == 1) {
items.push(new item("Sunobrope",14,5));
items.push(new item("Sunobrope",15,6));
} else {
items.push(new item("Pixpet_Transporter",14,5));
items.push(new item("Pixpet_Transporter",15,6));
}  
    
for(let specialitem = 0;specialitem < itemamount-2;specialitem++){
itempicked = specialitems[Math.floor(Math.random()*specialitems.length)]; 
 
if(specialitem == 0){
items.push(new item((itempicked),15,4)); 
} else if(specialitem == 1){
items.push(new item((itempicked),14,3)); 
} else {
items.push(new item((itempicked),14,1)); 
}
    
specialitems.splice(specialitems.indexOf(itempicked),1);     
}
    
    
}

//basic non-advanced collision
collision = function(x1, y1, w1, h1, x2, y2, w2, h2) {

  if (x1 <= x2 + w2 && x1 + w1 >= x2 && y1 <= y2 + h2 && y1 + h1 >= y2) {
    return true;
  } else {
    return false;
  }

}

//global sound effects to deal with multiple sound effects efficently
soundeffect = function(file){

  sounds[soundsloop] = new Audio(file);
  sounds[soundsloop].volume = soundeffectvolume;
  sounds[soundsloop].play();
  soundsloop += 1; 
  if(soundsloop > 5){
  soundsloop = 0;
  }
    
}

keydowncode = function(){

//can only use hotkeys during gameplay
if(!endgame){  
    
//switch hotkey
if(event.keyCode == 81){  
    
    currentpixpet += 1;  
    if(currentpixpet >= pixpets.length){
    currentpixpet = 0;
    } 
    
} else {

pixpets[currentpixpet].keyDown(event.keyCode);  
    
}
    
}
    
}

textmaker = function(text,x,y,size){
ctx.font = "900 "+size*(hs/297)+"px SG12";
ctx.fillStyle = "white";
ctx.fillText(text,x*(hs/297),y*(hs/297));  
ctx.strokeStyle = "black";
ctx.lineWidth = (size/12.5)*(hs/297);
ctx.strokeText(text,x*(hs/297),y*(hs/297));  
}

fullscreencode = function(){
    
 if(ws == 528){
    
   if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) { /* Firefox */
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) { /* IE/Edge */
    canvas.msRequestFullscreen();
  } 
    
ws = document.body.clientWidth;
hs = Math.floor(ws/(528/297));
canvas.width = ws
canvas.height = hs;
fullscreen.src = "Gif Files/SmallScreenButton.gif";
mousedown = false;   
 } else {
        
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  } 
     

ws = canvas.width;
hs = canvas.height;
canvas.width = 528;
canvas.height = 297;
fullscreen.src = "Gif Files/FullScreenButton.gif";
mousedown = false;
 }    
    
}

maingame = function(){
    
//if made small screen through tab hiding it will be become small screen automatically
if((!document.fullscreenElement&&!document.mozFullScreen&&!document.webkitisFullscreen&&!document.msFullScreenElement)){  
 canvas.width = 528;
 canvas.height = 297;
 ws = canvas.width;
 hs = canvas.height;
 fullscreen.src = "Gif Files/FullScreenButton.gif";
}
    
    
ctx.clearRect(0,0,canvas.width,canvas.height);
    
    
//header
ctx.globalAlpha = 1;
ctx.drawImage(gifload[0],0,0,(hs/297)*528,(hs/297)*50);
    
(collision(mousex,mousey,0,0,(hs/297)*485,(hs/297)*8,(hs/297)*30,(hs/297)*30)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75;    
ctx.drawImage(fullscreen,(hs/297)*485, (hs/297)*8, (hs/297)*30, (hs/297)*30);
    
if(collision(mousex,mousey,0,0,(hs/297)*485,(hs/297)*8,(hs/297)*30,(hs/297)*30)&&mousedown){
 fullscreencode();
}

ctx.globalAlpha = 1;     
    
//tile loader
for(let tileloady = 0;tileloady < 7;tileloady++){      
 for(let tileload = 0;tileload < 16;tileload++){
  ctx.drawImage(((tileload == 0||tileload == 15)||((tileloady >= 1&&tileloady <= 5)&&(tileload == 1||tileload == 14))) ? gifload[4] : gifload[3],(tileload*32+8)*(hs/297),((tileloady*32)+50)*(hs/297),32*(hs/297),32*(hs/297));
 }
}
   
if(clockanimation > 0){
textmaker("-25%",110,44.5,10); 
clockanimation -= 1/30;
}
    
textmaker("EVO ISLAND",300,33.5,25);  
    
if(endgame&&difficultypage){   
textmaker("TIME: 000",25,(timer!== false) ? 23.5 : 33.5,(timer!== false) ? 20 : 25); 
} else {
textmaker("TIME: "+Math.floor(seconds),25,(timer!== false) ? 23.5 : 33.5,(timer!== false) ? 20 : 25); 
    
if(!endgame){
seconds += (1/30);
} 
   
}
    
if(timer !== false){   
  
if(endgame&&difficultypage){   
textmaker("TIMER: 000",25,43.5,20); 
} else {
textmaker("TIMER: "+Math.floor(timer),25,43.5,20);
} 
    
if(!endgame){
timer -= (1/30);
    
if(timer <= 0){
timer = 0;
endgame = true;
difficultypage = false;
}

}
    
}    
    
 
//completion will update every tick in case of items being added/deleted during gameplay
completion = pixpets.length+items.length; 
    
//load items then pixpets
for(let itemload = 0;itemload < items.length;itemload++){
items[itemload].draw();
    
if(items[itemload].X < 2||items[itemload].Held !== -1){
completion -= 1;
}    
    
}    
    
for(let pixpetload = 0;pixpetload < pixpets.length;pixpetload++){
pixpets[pixpetload].draw(pixpetload);
  
if(pixpets[pixpetload].X < 2){
completion -= 1;
}
    
}
    
if(completion <= 0&&!endgame){
scoreanimation = score;
endgame = true;
difficultypage = false;
music.pause();
soundeffect("Audio Files/EndJingle.mp3");
}
    
ctx.globalAlpha = 1; 
    
if(!endgame){
    
ctx.drawImage(gifload[16],100*(hs/297),260*(hs/297),100/3*(hs/297),100/3*(hs/297));
if(pixpets[currentpixpet].Inventory !== -1){ pixpets[currentpixpet].Inventory.information() }
if(pixpets[currentpixpet].CapsuleItem !== -1){ pixpets[currentpixpet].CapsuleItem.information() }
    
}
    
if(!endgame){   
    
    //up button drawer
    collision(mousex,mousey,0,0,50*(hs/297),260*(hs/297),64/3*(hs/297),36/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75; 
    ctx.drawImage(gifload[11],50*(hs/297),260*(hs/297),64/3*(hs/297),36/3*(hs/297));
    if(collision(mousex,mousey,0,0,50*(hs/297),260*(hs/297),64/3*(hs/297),36/3*(hs/297))&&mousedown){ pixpets[currentpixpet].keyDown(38) 
}                                                                                              
    //down button drawer
    collision(mousex,mousey,0,0,50*(hs/297),286*(hs/297),64/3*(hs/297),36/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75; 
    ctx.drawImage(gifload[13],50*(hs/297),286*(hs/297),64/3*(hs/297),36/3*(hs/297));
    if(collision(mousex,mousey,0,0,50*(hs/297),286*(hs/297),64/3*(hs/297),36/3*(hs/297))&&mousedown){ pixpets[currentpixpet].keyDown(40) }
    //left button drawer
    collision(mousex,mousey,0,0,35*(hs/297),268*(hs/297),36/3*(hs/297),64/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75; 
    ctx.drawImage(gifload[14],35*(hs/297),268*(hs/297),36/3*(hs/297),64/3*(hs/297));
    if(collision(mousex,mousey,0,0,35*(hs/297),268*(hs/297),36/3*(hs/297),64/3*(hs/297))&&mousedown){ pixpets[currentpixpet].keyDown(37) }
    //right button drawer
    collision(mousex,mousey,0,0,74*(hs/297),268*(hs/297),36/3*(hs/297),64/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75; 
    ctx.drawImage(gifload[12],74*(hs/297),268*(hs/297),36/3*(hs/297),64/3*(hs/297));
    if(collision(mousex,mousey,0,0,74*(hs/297),268*(hs/297),36/3*(hs/297),64/3*(hs/297))&&mousedown){ pixpets[currentpixpet].keyDown(39) }
    //inventory button drawer (E hotkey)
    collision(mousex,mousey,0,0,50*(hs/297),273*(hs/297),64/3*(hs/297),36/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75; 
    ctx.drawImage(gifload[15],50*(hs/297),273*(hs/297),64/3*(hs/297),36/3*(hs/297));
    if(collision(mousex,mousey,0,0,50*(hs/297),273*(hs/297),64/3*(hs/297),36/3*(hs/297))&&mousedown){ pixpets[currentpixpet].keyDown(69); mousedown = false; } 
    
}
    
    //sound effects
    collision(mousex,mousey,0,0,5*(hs/297),238*(hs/297),64/3*(hs/297),64/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75; 
    ctx.drawImage((soundeffectvolume == 0) ? gifload[20] : gifload[19],5*(hs/297),238*(hs/297),64/3*(hs/297),64/3*(hs/297));
    if(collision(mousex,mousey,0,0,5*(hs/297),238*(hs/297),64/3*(hs/297),64/3*(hs/297))&&mousedown){ (soundeffectvolume == 0) ? soundeffectvolume = 1 : soundeffectvolume = 0; mousedown = false;} 
    
    //music
    collision(mousex,mousey,0,0,5*(hs/297),268*(hs/297),64/3*(hs/297),64/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75; 
    ctx.drawImage((music.volume == 0) ? gifload[18] : gifload[17],5*(hs/297),268*(hs/297),64/3*(hs/297),64/3*(hs/297));
    if(collision(mousex,mousey,0,0,5*(hs/297),268*(hs/297),64/3*(hs/297),64/3*(hs/297))&&mousedown){ (music.volume == 0) ? music.volume = 1 : music.volume = 0; mousedown = false;} 
 
if(endgame){
tooltips();
}   
    
mousedown = false;
    
//second overflow
if(seconds > 9999){
seconds = 9999;
}
       
}

//buttons, mouse moving, clicking
canvas.addEventListener("keydown", keydowncode);
canvas.addEventListener("mousemove", mousemake);
canvas.addEventListener("mousedown", mousedowncheck);

//game animation
setInterval(maingame, 1000 / 30);

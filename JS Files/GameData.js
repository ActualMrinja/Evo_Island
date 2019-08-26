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
22 is Player Selected
23 is Light Symbol
24 is Heavy Symbol
25 is Veemooth
26 is Velibolt
27 is Velox
28 is Igupunk
29 is Iguzzle
30 is Owluck
31 is Indigoat
32 is Western Dragon Evobar
33 is Wolfdog Evobar
34 is Bear Evobar
35 is Tropical Bird Evobar
36 is Feline Evobar
37 is Bovine Evobar
38 is JP Evobar
39 is JP Second Evobar
40 is Iguana Evobar
41 is Iguana Second Evobar
42 is Owl Evobar
43 is Goat Evobar
**/

gifname = ["Gif Files/Header.gif","Gif Files/FullScreenButton.gif","Gif Files/SmallScreenButton.gif","Gif Files/OceanTile.gif","Gif Files/SandTile.gif","Gif Files/Drax.gif","Gif Files/Canisqua.gif","Gif Files/Unicubb.gif","Gif Files/Troffinch.gif","Gif Files/Feliphene.gif","Gif Files/SwitchButton.gif","Gif Files/UpButton.gif","Gif Files/RightButton.gif","Gif Files/DownButton.gif","Gif Files/LeftButton.gif","Gif Files/InventoryButton.gif","Gif Files/InventoryBox.gif","Gif Files/MusicOnButton.gif","Gif Files/MusicOffButton.gif","Gif Files/SoundEffectOnButton.gif","Gif Files/SoundEffectOffButton.gif","Gif Files/FullButton.gif","Gif Files/PlayerSelected.gif","Gif Files/Light.gif","Gif Files/Heavy.gif","Gif Files/Veemooth.gif","Gif Files/Velibolt.gif","Gif Files/Velox.gif","Gif Files/Igupunk.gif","Gif Files/Iguzzle.gif","Gif Files/Owluck.gif","Gif Files/Indigoat.gif","Gif Files/WesternDragonEvobar.gif","Gif Files/WolfdogEvobar.gif","Gif Files/BearEvobar.gif","Gif Files/TropicalBirdEvobar.gif","Gif Files/FelineEvobar.gif","Gif Files/BovineEvobar.gif","Gif Files/JPEvobar.gif","Gif Files/JPSecondEvobar.gif","Gif Files/IguanaEvobar.gif","Gif Files/IguanaSecondEvobar.gif","Gif Files/OwlEvobar.gif","Gif Files/GoatEvobar.gif"];
gifload = [];

preloadname = ["Png Files/Wooden_Raft.png","Png Files/Pixpet_Transporter.png","Png Files/PixeldustTrails.png","Png Files/Pixeldust_Boots.png","Png Files/Devolution_Fruit_Thermos_Bottle.png","Png Files/UnicubbSmallRight.png","Png Files/UnicubbSmallLeft.png","Png Files/UnicubbSmallFront.png","Png Files/UnicubbSmallBack.png","Png Files/TroffinchSmallRight.png","Png Files/TroffinchSmallLeft.png","Png Files/TroffinchSmallFront.png","Png Files/TroffinchSmallBack.png","Png Files/DraxSmallRight.png","Png Files/DraxSmallLeft.png","Png Files/DraxSmallFront.png","Png Files/DraxSmallBack.png","Png Files/FelipheneSmallRight.png","Png Files/FelipheneSmallLeft.png","Png Files/FelipheneSmallFront.png","Png Files/FelipheneSmallBack.png","Png Files/CanisquaSmallRight.png","Png Files/CanisquaSmallLeft.png","Png Files/CanisquaSmallFront.png","Png Files/CanisquaSmallBack.png","Png Files/AltudraxSmallLeft.png","Png Files/LuputrixSmallLeft.png","Png Files/UrsufuzzSmallLeft.png","Png Files/ParrogrineSmallLeft.png","Png Files/KyagrowlSmallLeft.png","Png Files/PentadileSmallBack.png","Png Files/PentadileSmallFront.png","Png Files/SawrotagSmallBack.png","Png Files/SawrotagSmallFront.png","Png Files/VeemoothSmallRight.png","Png Files/VeemootSmallLeft.png","Png Files/VeemoothSmallFront.png","Png Files/VeemoothSmallBack.png","Png Files/Potion_of_Gigantism.png","Png Files/VeliboltSmallRight.png","Png Files/VeliboltSmallLeft.png","Png Files/VeliboltSmallFront.png","Png Files/VeliboltSmallBack.png","Png Files/VeloxSmallRight.png","Png Files/VeloxSmallLeft.png","Png Files/VeloxSmallFront.png","Png Files/VeloxSmallBack.png","Png Files/IgupunkSmallRight.png","Png Files/IgupunkSmallLeft.png","Png Files/IgupunkSmallFront.png","Png Files/IgupunkSmallBack.png","Png Files/IguzzleSmallRight.png","Png Files/IguzzleSmallLeft.png","Png Files/IguzzleSmallFront.png","Png Files/IguzzleSmallBack.png","Png Files/OwluckSmallRight.png","Png Files/OwluckSmallLeft.png","Png Files/OwluckSmallFront.png","Png Files/OwluckSmallBack.png","Png Files/IndigoatSmallRight.png","Png Files/IndigoatSmallLeft.png","Png Files/IndigoatSmallFront.png","Png Files/IndigoatSmallBack.png","Png Files/BovitaurSmallLeft.png","Png Files/VelirexSmallLeft.png","Png Files/IguroarSmallLeft.png","Png Files/RoyowlSmallLeft.png","Png Files/ImprexSmallLeft.png"];
preload = [];

for(let loader = 0;loader < gifname.length;loader++){
gifload.push(new Image());
gifload[loader].src = gifname[loader];
}

for(let loader = 0;loader < preloadname.length;loader++){
preload.push(new Image());
preload[loader].src = preloadname[loader];
}

//Preload files are deleted once files are loaded
preload = [];

fullscreen = new Image();
fullscreen.src = "Gif Files/FullScreenButton.gif";


currentpixpet = 0;
selectanimation = 0;
selectloop = 0;
pixpets = [];
pixpets.push(new pixpet("Drax",2,4));

/**Lily Pads should always be the first/second item coding wise and visually because they are also tiles**/
items = [];

completion = 0;

ws = canvas.width;
hs = canvas.height;
mousex = 0;
mousey = 0;
mousedown = false;

seconds = 0;
starttimer = false;

itemamount = true;
pixpetamount = 8;
//amountkept = 8;
timer = false;
timerbonus = 1;

//score is mainly used for animation
scoreanimation = seconds;
score = 0;
endgame = true;
difficultypage = true;

music = new Audio("Audio Files/MainTheme.mp3");
music.volume = 0.7;
music.loop = true;
music.play()

sounds = [0,0,0,0,0,0];
soundeffectvolume = 1;
soundsloop = 0;

tileload = 
    [ [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    ];  

tooltips = function(){    
    
//score keeper
if(timerbonus == 1||(timerbonus > 1&&timer > 0)){  

if(Math.floor(seconds) > 0&&!(score > Math.ceil((3000-scoreanimation*30)+(!itemamount ? 50 : 0)*(timerbonus)*(1+((pixpetamount-8)*0.1))))){

score += Math.ceil((3000-scoreanimation*30)+(!itemamount ? 50 : 0)*(timerbonus)*(1+((pixpetamount-8)*0.1)))/30;
seconds -= scoreanimation/30;
  
if(seconds <= 0){ seconds = 0; score = Math.ceil(score)}
if(score >= (3000-scoreanimation*30)){ score = Math.ceil((3000-scoreanimation*30)+(!itemamount ? 50 : 0)*(timerbonus)*(1+((pixpetamount-8)*0.1))); seconds = 0;}
if(score < 30+(!itemamount ? 50 : 0)*(1+((pixpetamount-8)*0.1))*(timerbonus)){ score == 30+(!itemamount ? 50 : 0)*(timerbonus)*(1+((pixpetamount-8)*0.1)) }  
} else {
   
score = Math.ceil((3000-scoreanimation*30)+(!itemamount ? 50 : 0)*(timerbonus)*(1+((pixpetamount-8)*0.1)));
if(score < 30+Math.ceil((3000-scoreanimation*30)+(!itemamount ? 50 : 0)*(timerbonus)*(1+((pixpetamount-8)*0.1)))) {
seconds = 0;     
}

}
}
  
ctx.globalAlpha = 1;   
    
if(difficultypage){
textmaker("BRING ALL PIXPETS TO EVO ISLAND",108,70,15); 
textmaker("CHOOSE YOUR DIFFICULTY",80,100,25); 
} else if(timerbonus == 1||(timerbonus > 1&&timer > 0)) {  
textmaker("FINAL SCORE: "+Math.floor(score),264-ctx.measureText("FINAL SCORE: "+Math.floor(score)).width/(0.78*(hs/297)),125,25);
} else {
textmaker("YOUR TIME IS UP",140,125,25); 
}

    if(!difficultypage){
        
    if(seconds <= 0||(timerbonus > 1&&timer == 0)){
    collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),150*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(gifload[21],(264-gifload[21].width/6)*(hs/297),150*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),150*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ 
      difficultypage = true; 
      music.play();
      currentpixpet = 0;
      pixpets = [];
      pixpets.push(new pixpet("Drax",2,4));
      items = [];
      
      if(timerbonus == 1){
     timer = false;
     } else if(timerbonus == 1.25) {
     timer = 120;
     } else {
     timer = 60;
     }
        
    }
    textmaker("TRY AGAIN",(277-gifload[21].width/6),173,12);
        
      
   //Score sending goes here, can't send if timer is up
   if(timer !== 0){
        
   collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),200*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(gifload[21],(264-gifload[21].width/6)*(hs/297),200*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),200*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){   }
    textmaker("SEND SCORE",(273-gifload[21].width/6),223,12); 
    }
        
    }
        
    } else {
     
      collision(mousex,mousey,0,0,(144-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(gifload[21],(144-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(144-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ 
     
     if(timerbonus == 1){
     timerbonus = 1.25;
     timer = 120;
     } else if(timerbonus == 1.25) {
     timerbonus = 1.5;
     timer = 60;
     } else {
     timerbonus = 1;
     timer = false;
     }
        
    }
    textmaker((!timer) ? "TIMER: NONE" :"TIMER: "+((timerbonus == 1.5) ? "60" : "120")+"S",109,162,10);    
        
     collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(gifload[21],(264-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ 
        (itemamount) ? itemamount = false : itemamount = true;
    }
    textmaker("TOOLS: "+((itemamount) ? "ON" : "OFF"),235,162,10);    
    
       collision(mousex,mousey,0,0,(384-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(gifload[21],(384-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(384-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ 
        pixpetamount += 2;
        if(pixpetamount > 12) { pixpetamount = 8 }
    }
    textmaker((pixpetamount == 8) ? "NORMAL" : (pixpetamount == 10) ? "HARD" : "EXTREME",(pixpetamount == 8) ? 364 : (pixpetamount == 10) ? 372 : 360,162,10);         
        
   collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),210*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(gifload[21],(264-gifload[21].width/6)*(hs/297),210*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),210*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ 
    startgame();
    }
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
 if(music.volume == 0.7&&!(endgame&&!difficultypage)) { music.play() }

}

startgame = function(){

if(timerbonus == 1){
timer = false;
} else if(timerbonus == 1.25){
timer = 120;
} else {
timer = 60;
}
    
    
endgame = false;
difficultypage = false;
tileload = 
    [ [2,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [2,(pixpetamount > 10) ? 2 : 1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [2,(pixpetamount > 8) ? 2 : 1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [2,2,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [2,(pixpetamount > 8) ? 2 : 1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [2,(pixpetamount > 10) ? 2 : 1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [2,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    ];    
seconds = 0;
score = 0;
starttimer = false;
pixpets = [];
items = [];
pixpets.push(new pixpet("Drax",0,0));
pixpets.push(new pixpet("Canisqua",0,1));
pixpets.push(new pixpet("Unicubb",0,2));
pixpets.push(new pixpet("Troffinch",0,3));
pixpets.push(new pixpet("Feliphene",0,4));
pixpets.push(new pixpet("Veemooth",0,5));
pixpets.push(new pixpet("Velibolt",0,6));
pixpets.push(new pixpet("Velox",1,3));
    
if(pixpetamount >= 10) { 
    pixpets.push(new pixpet("Igupunk",1,2)); 
    pixpets.push(new pixpet("Iguzzle",1,4));
}
    
if(pixpetamount == 12) {
    pixpets.push(new pixpet("Owluck",1,1)); 
    pixpets.push(new pixpet("Indigoat",1,5));
}
   
pixpets.push(new pixpet("Pentadile",6,6));
pixpets.push(new pixpet("Pentadile",11,2));
    
if(pixpetamount >= 10){
pixpets.push(new pixpet("Pentadile",9,4));
}
    
if(pixpetamount == 12){
pixpets.push(new pixpet("Pentadile",4,0)); 
}    
    
selectloop = 0;
selectanimation = 0;
      
items.push(new item("Wooden_Raft",2,3));
raftlocator = items[items.length-1];

if(itemamount){   
  
itemnames = ["Pixeldust_Boots","Devolution_Fruit_Thermos_Bottle","Pixpet_Transporter", "Potion_of_Gigantism"];
itemstaken = 0; 
    
while(itemstaken < 2){
itemrandomizer = Math.floor(Math.random()*itemnames.length);
 
if(itemrandomizer == 0&&itemnames[itemrandomizer] !== "Taken"){
items.push(new item("Pixeldust_Boots",2,1));
itemnames[itemrandomizer] = "Taken"; 
itemstaken += 1;
} else if(itemrandomizer == 1&&itemnames[itemrandomizer] !== "Taken"){
items.push(new item("Pixpet_Transporter",2,4));
items.push(new item("Pixpet_Transporter",13,4));
itemnames[itemrandomizer] = "Taken";  
itemstaken += 1;
} else if(itemrandomizer == 2&&itemnames[itemrandomizer] !== "Taken") {
items.push(new item("Devolution_Fruit_Thermos_Bottle",2,5));
itemnames[itemrandomizer] = "Taken"; 
itemstaken += 1;
} else if(itemrandomizer == 3&&itemnames[itemrandomizer] !== "Taken") {
items.push(new item("Potion_of_Gigantism",2,2));
itemnames[itemrandomizer] = "Taken"; 
itemstaken += 1;
} 
    
} //while loop
    
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
    while(pixpets[currentpixpet].Held !== -1){
      currentpixpet += 1;  
      if(currentpixpet >= pixpetamount){
      currentpixpet = 0;
      }    
    }
      
   if(currentpixpet >= pixpetamount){
   currentpixpet = 0;
   }  
    
    selectanimation = 0;
    selectloop = 0;
    
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
ctx.lineWidth = (size/25)*(hs/297);
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
    
//If both are supported choose the lesser, if not choose the one that is supported. This helps with mobile support
ws = (window.innerWidth && document.documentElement.clientWidth) ? 
Math.min(window.innerWidth, document.documentElement.clientWidth) : 
window.innerWidth || 
document.documentElement.clientWidth || 
document.body.clientWidth;
     
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
if((!document.fullscreenEnabled&&!document.mozFullScreenEnabled&&!document.webkitFullScreenEnabled&&!document.msFullscreenEnabled)){  
 canvas.width = 528;
 canvas.height = 297;
 ws = canvas.width;
 hs = canvas.height;
 fullscreen.src = "Gif Files/FullScreenButton.gif";
}
 
if(canvas.width !== 528){
ws =  (window.innerWidth && document.documentElement.clientWidth) ? 
Math.min(window.innerWidth, document.documentElement.clientWidth) : 
window.innerWidth || 
document.documentElement.clientWidth || 
document.body.clientWidth;
hs = Math.floor(ws/(528/297));
canvas.width = ws
canvas.height = hs;
}
    
    
ctx.clearRect(0,0,canvas.width,canvas.height);
    
    
//header
ctx.globalAlpha = 1;
ctx.drawImage(gifload[0],0,0,(hs/297)*528,(hs/297)*50);
    
(collision(mousex,mousey,0,0,(hs/297)*485,(hs/297)*8,(hs/297)*30,(hs/297)*30)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;    
ctx.drawImage(fullscreen,(hs/297)*485, (hs/297)*8, (hs/297)*30, (hs/297)*30);
    
if(collision(mousex,mousey,0,0,(hs/297)*485,(hs/297)*8,(hs/297)*30,(hs/297)*30)&&mousedown){
 fullscreencode();
}

ctx.globalAlpha = 1;     
    
//tile loader
for(let tileloady = 0;tileloady < 7;tileloady++){      
 for(let tileload = 0;tileload < 16;tileload++){
  ctx.drawImage(((tileload <= 1||tileload >= 14)||((tileloady >= 1&&tileloady <= 5)&&(tileload == 2||tileload == 13))) ? gifload[4] : gifload[3],(tileload*32+8)*(hs/297),((tileloady*32)+50)*(hs/297),32*(hs/297),32*(hs/297));
 
  if(!endgame){  
     
   //You can also control pixpets by clicking tiles
   if(collision(mousex,mousey,0,0,(tileload*32+8)*(hs/297),(tileloady*32+50)*(hs/297),32*(hs/297),32*(hs/297))&&mousedown&&tileloady == pixpets[currentpixpet].Y&&tileload-1 == pixpets[currentpixpet].X&&pixpets[currentpixpet].X < 15){
   pixpets[currentpixpet].keyDown(39);
   } else if(collision(mousex,mousey,0,0,(tileload*32+8)*(hs/297),(tileloady*32+50)*(hs/297),32*(hs/297),32*(hs/297))&&mousedown&&tileloady == pixpets[currentpixpet].Y&&tileload+1 == pixpets[currentpixpet].X&&pixpets[currentpixpet].X > 0){
   pixpets[currentpixpet].keyDown(37);
   } else if(collision(mousex,mousey,0,0,(tileload*32+8)*(hs/297),(tileloady*32+50)*(hs/297),32*(hs/297),32*(hs/297))&&mousedown&&tileloady+1 == pixpets[currentpixpet].Y&&tileload == pixpets[currentpixpet].X&&pixpets[currentpixpet].Y > 0){
   pixpets[currentpixpet].keyDown(38);
   } else if(collision(mousex,mousey,0,0,(tileload*32+8)*(hs/297),(tileloady*32+50)*(hs/297),32*(hs/297),32*(hs/297))&&mousedown&&tileloady-1 == pixpets[currentpixpet].Y&&tileload == pixpets[currentpixpet].X&&pixpets[currentpixpet].Y < 6){
   pixpets[currentpixpet].keyDown(40);
   }
     
  }   
     
 }
}
      
textmaker("EVO ISLAND",300,33.5,25);  
    
if(endgame&&difficultypage){   
textmaker('TIME: 0"00"00',15,(timer!== false) ? 23 : 33,18); 
} else {
textmaker("TIME: "+Math.floor(seconds/60)+'"'+("0"+Math.floor(seconds%60)).slice(-2)+'"'+("0"+Math.floor(seconds%1*100)).slice(-2), 15, (timer!== false) ? 23 : 33,18); 
    
if(!endgame&&starttimer){
seconds += (1/30);
} 
   
}
    
if(timer !== false){   
  
if(endgame&&difficultypage){   
textmaker("TIMER: "+Math.floor(timer/60)+'"'+Math.floor(timer%60)+'"'+Math.floor((timer%1*100)),15,43,18); 
} else {
textmaker("TIMER: "+Math.floor(timer/60)+'"'+("0"+Math.floor(timer%60)).slice(-2)+'"'+("0"+Math.floor((timer%1*100))).slice(-2),15,43,18);
} 
    
if(!endgame&&starttimer){
timer -= (1/30);
    
if(timer <= 0){
timer = 0;
endgame = true;
difficultypage = false;
}

}
    
}    
    
    
//load items then pixpets
for(let itemload = 0;itemload < items.length;itemload++){
items[itemload].draw();    
}    
    
//completion will update every tick in case of items being added/deleted during gameplay
completion = pixpetamount; 
    
for(let pixpetload = 0;pixpetload < pixpets.length;pixpetload++){
    
if(pixpets[pixpetload].Held == -1){
pixpets[pixpetload].draw(pixpetload);
}
  
if(pixpets[pixpetload].X > 12&&pixpets[pixpetload].sandtile()){
completion -= 1;
}
    
}
    
if(completion <= 0&&!endgame){
scoreanimation = seconds;
endgame = true;
difficultypage = false;
    
//All 5 pixpets get an evolution animation when a game is won
for(let quickani = 0;quickani < pixpetamount;quickani++){ pixpets[quickani].EvolutionAni = 20-quickani; }
    
music.pause();
soundeffect("Audio Files/EndJingle.mp3");
}
    
ctx.globalAlpha = 1; 
    
if(!endgame){
    
ctx.drawImage(gifload[16],100*(hs/297),260*(hs/297),100/3*(hs/297),100/3*(hs/297));
if(pixpets[currentpixpet].Inventory !== -1)
{ pixpets[currentpixpet].Inventory.information(pixpets.indexOf(pixpets[currentpixpet].Inventory)) }
    
}
    
if(!endgame){   
    
    //up button drawer
    collision(mousex,mousey,0,0,50*(hs/297),260*(hs/297),64/3*(hs/297),36/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage(gifload[11],50*(hs/297),260*(hs/297),64/3*(hs/297),36/3*(hs/297));
    if(collision(mousex,mousey,0,0,50*(hs/297),260*(hs/297),64/3*(hs/297),36/3*(hs/297))&&mousedown){ pixpets[currentpixpet].keyDown(38) 
}                                                                                              
    //down button drawer
    collision(mousex,mousey,0,0,50*(hs/297),286*(hs/297),64/3*(hs/297),36/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage(gifload[13],50*(hs/297),286*(hs/297),64/3*(hs/297),36/3*(hs/297));
    if(collision(mousex,mousey,0,0,50*(hs/297),286*(hs/297),64/3*(hs/297),36/3*(hs/297))&&mousedown){ pixpets[currentpixpet].keyDown(40) }
    //left button drawer
    collision(mousex,mousey,0,0,35*(hs/297),268*(hs/297),36/3*(hs/297),64/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage(gifload[14],35*(hs/297),268*(hs/297),36/3*(hs/297),64/3*(hs/297));
    if(collision(mousex,mousey,0,0,35*(hs/297),268*(hs/297),36/3*(hs/297),64/3*(hs/297))&&mousedown){ pixpets[currentpixpet].keyDown(37) }
    //right button drawer
    collision(mousex,mousey,0,0,74*(hs/297),268*(hs/297),36/3*(hs/297),64/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage(gifload[12],74*(hs/297),268*(hs/297),36/3*(hs/297),64/3*(hs/297));
    if(collision(mousex,mousey,0,0,74*(hs/297),268*(hs/297),36/3*(hs/297),64/3*(hs/297))&&mousedown){ pixpets[currentpixpet].keyDown(39) }
    //inventory button drawer (E hotkey)
    collision(mousex,mousey,0,0,50*(hs/297),273*(hs/297),64/3*(hs/297),36/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage(gifload[15],50*(hs/297),273*(hs/297),64/3*(hs/297),36/3*(hs/297));
    if(collision(mousex,mousey,0,0,50*(hs/297),273*(hs/297),64/3*(hs/297),36/3*(hs/297))&&mousedown){ pixpets[currentpixpet].keyDown(32); mousedown = false; } 
    
}
    
    //sound effects
    collision(mousex,mousey,0,0,5*(hs/297),238*(hs/297),64/3*(hs/297),64/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage((soundeffectvolume == 0) ? gifload[20] : gifload[19],5*(hs/297),238*(hs/297),64/3*(hs/297),64/3*(hs/297));
    if(collision(mousex,mousey,0,0,5*(hs/297),238*(hs/297),64/3*(hs/297),64/3*(hs/297))&&mousedown){ (soundeffectvolume == 0) ? soundeffectvolume = 1 : soundeffectvolume = 0; mousedown = false;} 
    
    //music
    collision(mousex,mousey,0,0,5*(hs/297),268*(hs/297),64/3*(hs/297),64/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage((music.volume == 0) ? gifload[18] : gifload[17],5*(hs/297),268*(hs/297),64/3*(hs/297),64/3*(hs/297));
    if(collision(mousex,mousey,0,0,5*(hs/297),268*(hs/297),64/3*(hs/297),64/3*(hs/297))&&mousedown){ (music.volume == 0) ? music.volume = 0.7 : music.volume = 0; mousedown = false;} 
 
    //selected pixpet animation
    if(selectloop < 3&&!endgame){ 
    ctx.globalAlpha = 1;
    ctx.drawImage(gifload[22],(pixpets[currentpixpet].X*32+18)*(hs/297),(pixpets[currentpixpet].Y*32+30-selectanimation)*    (hs/297),gifload[22].width/3*(hs/297),gifload[22].height/3*(hs/297)); 
    
    if(selectloop < 3){       
    selectanimation += 0.25;
    if(selectanimation > 3){
    selectanimation = 0;
    selectloop += 1;
      }    
     }
    }    
    
if(endgame){
tooltips();
} 
    
mousedown = false;
    
//second overflow
if(seconds > 2500){
seconds = 2500;
}
       
}

//buttons, mouse moving, clicking
canvas.addEventListener("keydown", keydowncode);
canvas.addEventListener("mousemove", mousemake);
canvas.addEventListener("mousedown", mousedowncheck);

//game animation
setInterval(maingame, 1000 / 30);

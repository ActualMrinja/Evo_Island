pixpet = function(species,x,y){
 
this.Image = new Image();
this.Image.src = (species == "Pentadile") ? "Png Files/"+species+"SmallBack.png" : "Png Files/"+species+"SmallRight.png"
this.Direction = (species == "Pentadile") ? 1 : 3;
this.Frame = 0;
this.X = x;
this.Y = y;
this.Species = species;
this.Speciescrop = [0,0,15,0,110,20,110,0,150,25,125,10,15,20,178,-10,5,5,175,5,15,0,0,0];
this.Evolutions = ["Altudrax","Luputrix","Ursufuzz","Parrogrine","Kyagrowl","Bovitaur","Velox","Velirex","Iguzzle","Iguroar","Royowl","Imprex"];
this.Weight = [3,2,2,1,2,3,2,3,1,2,1,3];
    
this.Inventory = -1;
this.BootWalk = false;

this.EvolutionAni = 0;
this.RestartAni = 0;
    
//Checkpoint is used in restarting
this.Checkpoint = 0;

this.Velocity = Math.random()/10+0.1;
this.Gigantisize = false;
    
this.Held = -1;
}

pixpet.prototype.information = function(index=false){
   
ctx.globalAlpha = (pixpets[this.Held].RestartAni <= 0) ? 1 : ((5-pixpets[this.Held].RestartAni%5)/7)+0.375; 
   this.Image.src = "Png Files/"+this.Species+"Small"+pixpets[this.Held].Image.src.split("Small")[1];
   this.Direction = pixpets[this.Held].Direction;
   this.X = pixpets[this.Held].X;
   this.Y = pixpets[this.Held].Y;
   ctx.drawImage(this.Image,(this.Image.width/2)*Math.floor(pixpets[this.Held].Frame)+0.25,0,this.Image.width/2-0.5,this.Image.height,(this.X*32+10)*(hs/297),(this.Y*32+45-this.Image.height/6-(this.Gigantisize ? 3 : 0))*(hs/297),(this.Image.width/6+(this.Gigantisize ? 3 : 0))*(hs/297),(this.Image.height/3+(this.Gigantisize ? 3 : 0))*(hs/297));      
  
ctx.globalAlpha = 1;
    
   if(index !== false){
   ctx.drawImage(gifload[(index > 4) ? index+18 : index+5],this.Speciescrop[index*2],this.Speciescrop[index*2+1],50*2,50*2,101*(hs/297),262*(hs/297),30*(hs/297),30*(hs/297));
   textmaker(this.Species,150,278,10);
   textmaker(("USE AGAIN TO UNCARRY "+this.Species+". "+this.Species+" is in weight class "+this.Weight[index]).toUpperCase(),150,288,6);
    
   
   //Pixpets can also be selected through clicking them, their mugshot will immediately load when clicked because of this
    if(collision(mousex,mousey,0,0,(this.X*32+10)*(hs/297),(this.Y*32+45-this.Image.height/6-(this.Gigantisize ? 3 : 0))*(hs/297),(this.Image.width/6+(this.Gigantisize ? 3 : 0))*(hs/297),(this.Image.height/3+(this.Gigantisize ? 3 : 0))*(hs/297))&&mousedown&&index !== currentpixpet){       
    currentpixpet = index;    
    selectloop = 0;
    selectanimation = 0;  
    mousedown = false;
    }     
    
   }   
    
}

//inventory drop code to reduce redundant coding
pixpet.prototype.inventorydrop = function(){
   
  //sense check resets the tiles
  this.Inventory.sensecheck();
  this.Inventory = -1;
  
  soundeffect("Audio Files/ItemDrop.mp3");       
}

//restarting if hurt by a pixpet
pixpet.prototype.restart = function(raftused){
 
 this.RestartAni = 15;   
    
 tileload[this.Y][this.X] = 0; 
 tileload[raftlocator.Y][raftlocator.X] = 0;
  
 if(raftused){
  raftlocator.X = tileload[this.Y].indexOf(0,(this.Checkpoint > 0) ? (this.Y == 0||this.Y == 6 ? this.Checkpoint : this.Checkpoint-1) : this.Checkpoint);
  raftlocator.Y = this.Y;
  }   
    
 //quick load goes right to left in the beginning and left to right at the end
 for(let quickload = (this.Checkpoint == 0 ? this.Checkpoint+2 : this.Checkpoint);(this.Checkpoint == 0 ? quickload > this.Checkpoint : quickload < this.Checkpoint+2);(this.Checkpoint == 0 ? quickload-- : quickload++)){
  this.X = quickload;
     
  if(tileload[this.Y][this.X] == 1&&this.sandtile()&&!raftlocator.spottaken([this.Y,this.X],false)){
  tileload[this.Y][this.X] = 2; 
  return;
  }   
     
 }

 //This is only used if the row the pixpet was in is already filled
 for(let tileloady = 0;tileloady < 7;tileloady++){      
 for(let tileloadx = this.Checkpoint;tileloadx < this.Checkpoint+2;tileloadx++){
  this.X = tileloadx;
  this.Y = tileloady;

  if(tileload[this.Y][this.X] !== 2&&this.sandtile()&&!raftlocator.spottaken([this.Y,this.X],false)){
  tileload[this.Y][this.X] = 2; 
  return;
  }
     
 }
}
    
}

//For pixpets that need to reset their tile
pixpet.prototype.sandtile = function(){
  
    if((this.X < 3||this.X > 13)||((this.X == 3||this.X == 13)&&this.Y > 0&&this.Y < 6)){
    return true;
    } else {
    return false;
    }
    
}

pixpet.prototype.draw = function(index){
  
 if(this.X <= 3){
 this.Checkpoint = 0;
 } else if(this.X >= 12){
 this.Checkpoint = 13;
 }
    
 //Boot Walking is a constant animation
 if(this.BootWalk !== false){
 this.specialcheck("Pixeldust_Boots",this.BootWalk);
 }
        
   if(this.RestartAni > 0) { this.RestartAni -= 0.4; } 
   if(this.RestartAni < 0&&this.Species == "Pentadile") { pixpets.splice(pixpets.indexOf(this),1) }
    
    //Stacking makes the pixpet go a little bit over
    if(this.Held == -1){
    ctx.globalAlpha = (this.RestartAni <= 0) ? 1 : ((5-this.RestartAni%5)/7)+0.375;
    ctx.drawImage(this.Image,(this.Image.width/2)*Math.floor(this.Frame)+0.25,0,this.Image.width/2-0.5,this.Image.height,(this.X*32+(this.Species == "Pentadile" ? 4 : 10))*(hs/297),(this.Y*32+58-this.Image.height/6-(this.Gigantisize ? 3 : 0))*(hs/297),(this.Image.width/6+(this.Gigantisize ? 3 : 0))*(hs/297),(this.Image.height/3+(this.Gigantisize ? 3 : 0))*(hs/297));
    } 
    
   ctx.globalAlpha = 1;
    
    this.Frame += (this.Species == "Pentadile") ? 1/5 : 1/30;
    if(this.Frame >= 2){ this.Frame = 0 }
    
    //Pixpets can also be selected through clicking them, their mugshot will immediately load when clicked because of this
    if(collision(mousex,mousey,0,0,(this.X*32+10)*(hs/297),(this.Y*32+50)*(hs/297),this.Image.width/6*(hs/297),this.Image.height/3*(hs/297))&&mousedown&&index !== currentpixpet&&!endgame&&this.Species !== "Pentadile"){       
    currentpixpet = index;    
    selectloop = 0;
    selectanimation = 0;  
    mousedown = false;
    }
   
    if(currentpixpet == index){
  
    ctx.drawImage(gifload[(currentpixpet > 4) ? currentpixpet+18 : currentpixpet+5],this.Speciescrop[currentpixpet*2],this.Speciescrop[currentpixpet*2+1],50*2,50*2,250*(hs/297),6*(hs/297),40*(hs/297),40*(hs/297));
   
    collision(mousex,mousey,0,0,190*(hs/297),15*(hs/297),gifload[10].width/2*(hs/297),gifload[10].height/2*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(gifload[10],190*(hs/297),15*(hs/297),gifload[10].width/2*(hs/297),gifload[10].height/2*(hs/297));
    textmaker("SWITCH",216,28,10,true);
       
    ctx.globalAlpha = 1;
    if(!endgame){ textmaker(this.Weight[index], 288,45,12,true) }
    
    if(collision(mousex,mousey,0,0,190*(hs/297),15*(hs/297),gifload[10].width/2*(hs/297),gifload[10].height/2*(hs/297))&&mousedown&&!endgame){
        
    currentpixpet += 1;  
      
    if(currentpixpet >= pixpetamount){
    currentpixpet = 0;
    }  
    
    selectanimation = 0;
    selectloop = 0;  
    mousedown = false;
        
    } 
   
    }
    
  
    //Evolution Animation
    if(this.EvolutionAni > 0) {
    
    if(this.EvolutionAni % 4 == 0){
    this.Image.src = "Png Files/"+this.Species+"SmallBack.png";
    this.Direction = 1;
    } else if(this.EvolutionAni % 3 == 0){
    this.Image.src = "Png Files/"+this.Species+"SmallRight.png";
    this.Direction = 3;
    } else if(this.EvolutionAni % 2 == 0){
    this.Image.src = "Png Files/"+this.Species+"SmallFront.png";
    this.Direction = 4;
    } else if(this.EvolutionAni % 1 == 0){
    this.Image.src = "Png Files/"+((this.EvolutionAni == 1) ? this.Evolutions[index] : this.Species)+"SmallLeft.png";
    this.Direction = 2;
    }
    
    //Spinning evobar
    ctx.save();
    ctx.translate((this.X*32+30-gifload[index+31].width/6)*(hs/297),(this.Y*32+(50-this.EvolutionAni))*(hs/297));
    ctx.rotate(this.EvolutionAni*18 * Math.PI / 180);
    ctx.drawImage(gifload[index+31],-gifload[index+31].width/6*(hs/297),-gifload[index+31].height/6*(hs/297),gifload[index+31].width/3*(hs/297),gifload[index+31].height/3*(hs/297));
    ctx.restore();
        
    this.EvolutionAni -= 0.5;
    }
     
    //Pentadiles have their own special abilities
   if(this.Species == "Pentadile"){
        
    if(this.Y > 0&&this.Direction == 1&&tileload[Math.round(this.Y)][this.X] == 0){
    this.Y -= (this.RestartAni > 0) ? 0.05 : this.Velocity;
    } else if(this.Y <= 0&&this.Direction == 1){
    this.Y = 0;
    this.Image.src = "Png Files/"+((this.RestartAni > 0) ? "Sawrotag" : this.Species)+"SmallFront.png";
    this.Direction = 4;
    this.Velocity = Math.random()/10+0.1;
    } else if(this.Y < 6&&this.Direction == 4&&tileload[Math.round(this.Y)][this.X] == 0){
    this.Y += (this.RestartAni > 0) ? 0.05 : this.Velocity;
    } else if(this.Y >= 6&&this.Direction == 4){
    this.Y = 6;
    this.Image.src = "Png Files/"+((this.RestartAni > 0) ? "Sawrotag" : this.Species)+"SmallBack.png";
    this.Direction = 1;
    this.Velocity = Math.random()/10+0.1;
    }
        
     //Pentadile chomping code
     if(Math.floor(this.Y) >= 0&&Math.ceil(this.Y) <= 6&&tileload[Math.round(this.Y)][this.X] == 2){
        
      for(let pixpetsearch = 0;pixpetsearch < pixpetamount;pixpetsearch++){
      
      if(this.X == pixpets[pixpetsearch].X&&this !== pixpets[pixpetsearch]&&Math.round(this.Y) == pixpets[pixpetsearch].Y) 
          
        { 
        pixpets[pixpetsearch].restart((raftlocator.X == pixpets[pixpetsearch].X&&raftlocator.Y == pixpets[pixpetsearch].Y) ? true : false);
        soundeffect("Audio Files/PentadileChomp.mp3");
        }
          
      }
        
     } //end of pentadile chomping
     
   }
    
}

//used in character movement
pixpet.prototype.keyDown = function(keyCode){
   
 //Direction must be used here as direct names will not do 
  
 if(keyCode == 32){
 this.specialcheck("Pixpet_Transporter",[0,0])  
 }
    
 if((keyCode == 38||keyCode == 87)&&!this.BootWalk){
  
 //Player can't touch other players
 if(tileload[this.Y-1]  !== undefined&&this.Direction == 1&&(tileload[this.Y-1][this.X] == 1||this.specialcheck("Wooden_Raft",[-1,0])||this.pixpetcheck([-1,0]))  )
 { 
   
     (!this.sandtile()) ? tileload[this.Y][this.X] = 0 : tileload[this.Y][this.X] = 1;
     tileload[this.Y-1][this.X] = 2;
     this.Y -= 1;
 }  
     
 this.Image.src = "Png Files/"+this.Species+"SmallBack.png";
 this.Direction = 1;
     
 } else if((keyCode == 37||keyCode == 65)&&!this.BootWalk){
 
 //Player can't touch other players
 if(tileload[this.Y][this.X-1] !== undefined&&this.Direction == 2&&(tileload[this.Y][this.X-1] == 1||this.specialcheck("Wooden_Raft",[0,-1])||this.pixpetcheck([0,-1]))){ 
     
     (!this.sandtile()) ? tileload[this.Y][this.X] = 0 : tileload[this.Y][this.X] = 1;
     tileload[this.Y][this.X-1] = 2;
     this.X -= 1 
 }
     
 this.Image.src = "Png Files/"+this.Species+"SmallLeft.png";
 this.Direction = 2;
     
 } else if((keyCode == 39||keyCode == 68)&&!this.BootWalk){
  
 //Player can't touch other players
 if(tileload[this.Y][this.X+1] !== undefined&&this.Direction == 3&&(tileload[this.Y][this.X+1] == 1||this.specialcheck("Wooden_Raft",[0,1])||this.pixpetcheck([0,1]))){ 
     
     (!this.sandtile()) ? tileload[this.Y][this.X] = 0 : tileload[this.Y][this.X] = 1;
     tileload[this.Y][this.X+1] = 2;
     this.X += 1 
 }
 this.Image.src = "Png Files/"+this.Species+"SmallRight.png";
 this.Direction = 3;
     
 } else if((keyCode == 40||keyCode == 83)&&!this.BootWalk){

 //Player can't touch other players
 if(tileload[this.Y+1] !== undefined&&this.Direction == 4&&(tileload[this.Y+1][this.X] == 1||this.specialcheck("Wooden_Raft",[1,0])||this.pixpetcheck([1,0]))){ 
     
     (!this.sandtile()) ? tileload[this.Y][this.X] = 0 : tileload[this.Y][this.X] = 1;
     tileload[this.Y+1][this.X] = 2;
     this.Y += 1;   
 } 
     
 this.Image.src = "Png Files/"+this.Species+"SmallFront.png";
 this.Direction = 4;
     
 //Inventory code
 } else if(keyCode == 32){
 
     
 if(this.Inventory == -1){    
     
  for(let invenitem = 0;invenitem < items.length;invenitem++){
     
   //item sensing, you can only pick up items directly that are in sand
   if(
       ((this.X == items[invenitem].X&&this.Y == items[invenitem].Y&&((this.X < 3||this.X > 13)||((this.X == 3||this.X == 13)&&this.Y > 0&&this.Y < 6)))||
       (this.X == items[invenitem].X-1&&this.Direction == 3&&!items[invenitem].sensecheck(true))||
       (this.X == items[invenitem].X+1&&this.Direction == 2&&!items[invenitem].sensecheck(true))||
       (this.Y == items[invenitem].Y-1&&this.Direction == 4&&!items[invenitem].sensecheck(true))||
       (this.Y == items[invenitem].Y+1&&this.Direction == 1&&!items[invenitem].sensecheck(true)))&&
       (this.X == items[invenitem].X||this.Y == items[invenitem].Y)&&items[invenitem].Held == -1&&items[invenitem].Type !== "Pixpet_Transporter"&&items[invenitem].Type !== "Wooden_Raft"){    
       
   this.Inventory = items[invenitem];
   items[invenitem].Held = currentpixpet;
   items[invenitem].sensecheck();
   soundeffect("Audio Files/ItemPickup.mp3");
       
   return;
   }
     
  }
  
  //Stacking pixpets
  for(let invenpixpet = 0;invenpixpet < pixpetamount;invenpixpet++){

   if(
       ((this.X == pixpets[invenpixpet].X-1&&this.Direction == 3)||
       (this.X == pixpets[invenpixpet].X+1&&this.Direction == 2)||
       (this.Y == pixpets[invenpixpet].Y-1&&this.Direction == 4)||
       (this.Y == pixpets[invenpixpet].Y+1&&this.Direction == 1))&&
       (this.X == pixpets[invenpixpet].X||this.Y == pixpets[invenpixpet].Y)&&pixpets[invenpixpet].Held == -1&&((this.Weight[currentpixpet] > this.Weight[invenpixpet])||this.Gigantisize||soundeffect("Audio Files/ItemDenied.mp3"))){    
       
   this.Inventory = pixpets[invenpixpet];
   this.Inventory.Held = currentpixpet;
   tileload[this.Inventory.Y][this.Inventory.X] = (this.Inventory.sandtile()) ? 1 : 0;
   soundeffect("Audio Files/ItemPickup.mp3");    
   return;
   }
     
  }
     
 } else { 

 //using a devolution fruit thermos bottle
 if(this.Inventory.Type == "Devolution_Fruit_Thermos_Bottle") {
    for(let pentadilefind = pixpetamount;pentadilefind < pixpets.length;pentadilefind++){
        
       if((pixpets[pentadilefind].X == this.X+1&&Math.round(pixpets[pentadilefind].Y) == this.Y&&this.Direction == 3)||(pixpets[pentadilefind].X == this.X-1&&Math.round(pixpets[pentadilefind].Y) == this.Y&&this.Direction == 2)||(Math.round(pixpets[pentadilefind].Y) == this.Y-1&&pixpets[pentadilefind].X == this.X&&this.Direction == 1)||(Math.round(pixpets[pentadilefind].Y) == this.Y+1&&pixpets[pentadilefind].X == this.X&&this.Direction == 4)){
       pixpets[pentadilefind].RestartAni = 15;
       items.splice(items.indexOf(this.Inventory),1);
       pixpets[pentadilefind].Image.src = "Png Files/SawrotagSmall"+pixpets[pentadilefind].Image.src.split("Small")[1];
       soundeffect("Audio Files/PentadileHuff.mp3");
       this.Inventory = -1; 
       }
    }

 }
     
  //pixpet placing
  if(this.Inventory.Species !== undefined){
      
     if(this.Y < 6&&tileload[this.Y+1][this.X] == 1&&this.Direction == 4) {
     this.Inventory.Held = -1;
     this.Inventory.X = this.X;
     this.Inventory.Y = this.Y+1;
     this.Inventory = -1;  
     if(this.Gigantisize) { this.Gigantisize = false }       
     tileload[this.Y+1][this.X] = 2;
     soundeffect("Audio Files/ItemDrop.mp3");  
     } else if(this.Y > 0&&tileload[this.Y-1][this.X] == 1&&this.Direction == 1) {
     this.Inventory.Held = -1;
     this.Inventory.X = this.X;
     this.Inventory.Y = this.Y-1;
     this.Inventory = -1;
     tileload[this.Y-1][this.X] = 2;
     soundeffect("Audio Files/ItemDrop.mp3");  
     if(this.Gigantisize) { this.Gigantisize = false} 
         
     } else if(this.X < 15&&tileload[this.Y][this.X+1] == 1&&this.Direction == 3) {
     this.Inventory.Held = -1;
     this.Inventory.X = this.X+1;
     this.Inventory.Y = this.Y;
     this.Inventory = -1;
     tileload[this.Y][this.X+1] = 2;
     soundeffect("Audio Files/ItemDrop.mp3");   
     if(this.Gigantisize) { this.Gigantisize = false} 
     } else if(this.X > 0&&tileload[this.Y][this.X-1] == 1&&this.Direction == 2) {
     this.Inventory.Held = -1;
     this.Inventory.X = this.X-1;
     this.Inventory.Y = this.Y;
     this.Inventory = -1;
     tileload[this.Y][this.X-1] = 2;
     soundeffect("Audio Files/ItemDrop.mp3");   
     if(this.Gigantisize) { this.Gigantisize = false}   
     } else {
     soundeffect("Audio Files/ItemDenied.mp3")
     }
      
     return;
     
  } else if(this.Direction == 2&&this.X > 0&&(this.Inventory.TypeInfo[this.Inventory.Type][1].indexOf(tileload[this.Y][this.X-1]) !== -1||soundeffect("Audio Files/ItemDenied.mp3"))&&!this.Inventory.spottaken([this.Y,this.X-1])) { 
      
      this.Inventory.X = this.X-1;
      this.Inventory.Y = this.Y;
      this.Inventory.Held = -1;
       
      this.inventorydrop();
      
  } else if(this.Direction == 3&&this.X < 15&&(this.Inventory.TypeInfo[this.Inventory.Type][1].indexOf(tileload[this.Y][this.X+1]) !== -1||soundeffect("Audio Files/ItemDenied.mp3"))&&!this.Inventory.spottaken([this.Y,this.X+1])) {
        
      this.Inventory.X = this.X+1;
      this.Inventory.Y = this.Y;
      this.Inventory.Held = -1;
      
      this.inventorydrop();
      
  } else if(this.Direction == 4&&this.Y < 6&&(this.Inventory.TypeInfo[this.Inventory.Type][1].indexOf(tileload[this.Y+1][this.X]) !== -1||soundeffect("Audio Files/ItemDenied.mp3"))&&!this.Inventory.spottaken([this.Y+1,this.X])) {
 
      this.Inventory.X = this.X;
      this.Inventory.Y = this.Y+1;
      this.Inventory.Held = -1;
  
      this.inventorydrop();
                  
  } else if(this.Direction == 1&&this.Y > 0&&(this.Inventory.TypeInfo[this.Inventory.Type][1].indexOf(tileload[this.Y-1][this.X]) !== -1||soundeffect("Audio Files/ItemDenied.mp3"))&&!this.Inventory.spottaken([this.Y-1,this.X])) {
 
      this.Inventory.X = this.X;
      this.Inventory.Y = this.Y-1;
      this.Inventory.Held = -1;
 
      this.inventorydrop();
      
  }
     
 }
    
 //end of inventory 
 }   
    
}

//used in raft checking and other special checks
pixpet.prototype.specialcheck = function(checktype,check){
    
  if(checktype == "Pixeldust_Boots"&&this.Inventory !== -1&&this.BootWalk !== false&&this.Inventory.Type == "Pixeldust_Boots"&&!(this.Y == 6&&this.BootWalk[0] == 1)&&!(this.X == 0&&this.BootWalk[1] == -1)&&!(this.X == 15&&this.BootWalk[1] == 1)&&!(this.Y == 0&&this.BootWalk[0] == -1)&&tileload[this.Y+this.BootWalk[0]][this.X+this.BootWalk[1]] == 0){

  (this.sandtile()) ? tileload[this.Y][this.X] = 1 : tileload[this.Y][this.X] = 0;
  this.Y += this.BootWalk[0];   
  this.X += this.BootWalk[1];
  tileload[this.Y][this.X] = 2; 
      
  if(tileload[this.Y][this.X+1] !== 0&&this.X >= 12&&this.Direction == 3){
  items.splice(items.indexOf(this.Inventory),1);
  this.Inventory = -1;
  this.BootWalk = false;
  soundeffect("Audio Files/ToolBreak.mp3");
  }
   
  } else if(this.BootWalk == false&&this.Inventory !== -1&&this.Inventory.Type == "Pixeldust_Boots"&&tileload[this.Y+check[0]][this.X+check[1]] == 0&&(check[0] !== 0||check[1] !== 0)){
  
  this.BootWalk = check;
      
  } else {
      
  this.BootWalk = false;
     
  }
    
  for(let invenitem = 0;invenitem < items.length;invenitem++){
     
  if(checktype == "Wooden_Raft"&&items[invenitem].Type == checktype&&tileload[this.Y+check[0]][this.X+check[1]] == 0&&this.X == items[invenitem].X&&this.Y == items[invenitem].Y&&items[invenitem].Held == -1&&(this.Inventory == -1||this.Inventory.Type !== "Pixeldust_Boots")){
  items[invenitem].Y += check[0];
  items[invenitem].X += check[1];
  items[invenitem].sensecheck();
      
  //timer only starts when raft is used
  starttimer = true;
  music.play();
      
  return true;
  } 
      
    if(checktype == "Pixpet_Transporter"&&items[invenitem].Type == checktype&&this.X == items[invenitem].X&&this.Y == items[invenitem].Y&&items[invenitem].Held == -1){
  
    for(let transport = 0;transport < items.length;transport++){
    
    //location swapper
    if(items[transport].Type == "Pixpet_Transporter"&&items[transport] !== items[invenitem]&&items[transport].Held ==     -1&&items[transport].Frame == 1){
      
      for(let pixpettransport = 0;pixpettransport < pixpetamount;pixpettransport++){
    
      if(pixpets[pixpettransport].X == items[transport].X&&pixpets[pixpettransport].Y == items[transport].Y&&pixpets[pixpettransport] !== this&&pixpets[pixpettransport].Held == -1){
      pixpets[pixpettransport].X = this.X;
      pixpets[pixpettransport].Y = this.Y;  
      this.X = items[transport].X;
      this.Y = items[transport].Y;  
      soundeffect("Audio Files/Teleport.mp3");
      return;
      }
       
      }     

    }

  //Transport loop
  }
  //Main Transport boolean
  }
      
      
 //Main Special Item loop   
 }
    
  return false;
    
}

pixpet.prototype.pixpetcheck = function(check){
    
    for(let pixpetfind = 0;pixpetfind < pixpetamount;pixpetfind++){
      
       if(this.Held == -1&&(this.Inventory == -1||this.Inventory.Type !== undefined)&&pixpets[pixpetfind].Inventory == -1&&pixpets[pixpetfind].Held == -1&&check[1]+this.X == pixpets[pixpetfind].X&&check[0]+this.Y == pixpets[pixpetfind].Y&&this !== pixpets[pixpetfind]&&((this.Weight[currentpixpet] < pixpets[pixpetfind].Weight[pixpetfind])||pixpets[pixpetfind].Gigantisize)){
       pixpets[pixpetfind].Inventory = this;
       this.Held = pixpetfind;
       soundeffect("Audio Files/ItemPickup.mp3");
       return true;
       }
        
    }
    
    soundeffect("Audio Files/ItemDenied.mp3");
    return false 
}

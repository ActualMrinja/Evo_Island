pixpet = function(species,x,y){
 
this.Image = new Image();
this.Image.src = "Png Files/"+species+"SmallRight.png"
this.Direction = 3;
this.Frame = 0;
this.X = x;
this.Y = y;
this.Species = species;
this.Speciescrop = [0,0,15,0,110,20,110,0,150,25];
this.Evolutions = ["Altudrax","Luputrix","Ursufuzz","Parrogrine","Kyagrowl"];
    
this.Inventory = -1;
this.CapsuleItem = -1;
this.BootWalk = false;

this.EvolutionAni = 0;
}

//inventory drop code to reduce redundant coding
pixpet.prototype.inventorydrop = function(){
   
  //sense check resets the tiles
  this.Inventory.sensecheck();
  this.Inventory = -1;
      
  //Capsule is being held
  if(this.CapsuleItem !== -1){ 
  this.Inventory = this.CapsuleItem;
  this.Inventory.Held = currentpixpet;
  this.Inventory.Checking = -1;
  this.CapsuleItem = -1;
  } 

      
  soundeffect("Audio Files/ItemDrop.mp3");    
    
}

//For pixpets that need to reset their tile
pixpet.prototype.sandtile = function(){
  
    if((this.X < 1||this.X > 14)||((this.X == 1||this.X == 14)&&this.Y > 0&&this.Y < 6)){
    return true;
    } else {
    return false;
    }
    
}

pixpet.prototype.draw = function(index){
  
 //Boot Walking is a constant animation
 if(this.BootWalk !== false){
 this.specialcheck("Pixeldust_Boots",this.BootWalk);
 }
    
   ctx.globalAlpha = 1; 
    
    ctx.drawImage(this.Image,(this.Image.width/2)*Math.floor(this.Frame)+0.25,0,this.Image.width/2-0.5,this.Image.height,(this.X*32+10)*(hs/297),(this.Y*32+63-this.Image.height/6)*(hs/297),this.Image.width/6*(hs/297),this.Image.height/3*(hs/297));
    this.Frame += 1/30;
    if(this.Frame > 2){ this.Frame = 0 }
    
    //Pixpets can also be selected through clicking them, their mugshot will immediately load when clicked because of this
    if(collision(mousex,mousey,0,0,(this.X*32+10)*(hs/297),(this.Y*32+50)*(hs/297),this.Image.width/6*(hs/297),this.Image.height/3*(hs/297))&&mousedown&&index !== currentpixpet&&!endgame){       
    currentpixpet = index;    
    selectloop = 0;
    selectanimation = 0;  
    mousedown = false;
    }
   
    if(currentpixpet == index){
  
    ctx.drawImage(gifload[currentpixpet+5],this.Speciescrop[currentpixpet*2],this.Speciescrop[currentpixpet*2+1],50*2,50*2,250*(hs/297),6*(hs/297),40*(hs/297),40*(hs/297));
   
    collision(mousex,mousey,0,0,190*(hs/297),15*(hs/297),gifload[10].width/2*(hs/297),gifload[10].height/2*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.75;
    ctx.drawImage(gifload[10],190*(hs/297),15*(hs/297),gifload[10].width/2*(hs/297),gifload[10].height/2*(hs/297));
    textmaker("SWITCH",195,28,10);
    
    if(collision(mousex,mousey,0,0,190*(hs/297),15*(hs/297),gifload[10].width/2*(hs/297),gifload[10].height/2*(hs/297))&&mousedown&&!endgame){
        
    currentpixpet += 1;  
    if(currentpixpet >= pixpets.length){
    currentpixpet = 0;
    }
      
    selectloop = 0;
    selectanimation = 0;
        
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
    ctx.translate((this.X*32+30-gifload[index+23].width/6)*(hs/297),(this.Y*32+(50-this.EvolutionAni))*(hs/297));
    ctx.rotate(this.EvolutionAni*18 * Math.PI / 180);
    ctx.drawImage(gifload[index+23],-gifload[index+23].width/6*(hs/297),-gifload[index+23].height/6*(hs/297),gifload[index+23].width/3*(hs/297),gifload[index+23].height/3*(hs/297));
    ctx.restore();
        
    this.EvolutionAni -= 0.5;
    }
        
}

//used in character movement
pixpet.prototype.keyDown = function(keyCode){

 //Direction must be used here as direct names will not do 
    
 if(keyCode == 38||keyCode == 87){
  
 //Player can't touch other players
 if(tileload[this.Y-1]  !== undefined&&this.Direction == 1&&(tileload[this.Y-1][this.X] == 1||this.specialcheck("Wooden_Raft",[-1,0]))  )
 { 
   
     (!this.sandtile()) ? tileload[this.Y][this.X] = 0 : tileload[this.Y][this.X] = 1;
     tileload[this.Y-1][this.X] = 2;
     this.Y -= 1;
     this.specialcheck("Pixpet_Transporter",[0,0])
    
 }  
     
 this.Image.src = "Png Files/"+this.Species+"SmallBack.png";
 this.Direction = 1;
     
 } else if(keyCode == 37||keyCode == 65){
 
 //Player can't touch other players
 if(tileload[this.Y][this.X-1] !== undefined&&this.Direction == 2&&(tileload[this.Y][this.X-1] == 1||this.specialcheck("Wooden_Raft",[0,-1]))){ 
     
     (!this.sandtile()) ? tileload[this.Y][this.X] = 0 : tileload[this.Y][this.X] = 1;
     tileload[this.Y][this.X-1] = 2;
     this.X -= 1 
     this.specialcheck("Pixpet_Transporter",[0,0])  
 }
     
 this.Image.src = "Png Files/"+this.Species+"SmallLeft.png";
 this.Direction = 2;
     
 } else if(keyCode == 39||keyCode == 68){
  
 //Player can't touch other players
 if(tileload[this.Y][this.X+1] !== undefined&&this.Direction == 3&&(tileload[this.Y][this.X+1] == 1||this.specialcheck("Wooden_Raft",[0,1]))){ 
     
     (!this.sandtile()) ? tileload[this.Y][this.X] = 0 : tileload[this.Y][this.X] = 1;
     tileload[this.Y][this.X+1] = 2;
     this.X += 1 
     this.specialcheck("Pixpet_Transporter",[0,0])  
 }
 this.Image.src = "Png Files/"+this.Species+"SmallRight.png";
 this.Direction = 3;
     
 } else if(keyCode == 40||keyCode == 83){

 //Player can't touch other players
 if(tileload[this.Y+1] !== undefined&&this.Direction == 4&&(tileload[this.Y+1][this.X] == 1||this.specialcheck("Wooden_Raft",[1,0]))){ 
     
     (!this.sandtile()) ? tileload[this.Y][this.X] = 0 : tileload[this.Y][this.X] = 1;
     tileload[this.Y+1][this.X] = 2;
     this.Y += 1;
     this.specialcheck("Pixpet_Transporter",[0,0])
     
 }    
 this.Image.src = "Png Files/"+this.Species+"SmallFront.png";
 this.Direction = 4;
     
 //Inventory code
 } else if(keyCode == 69){
 
     
 if(this.Inventory == -1){    
     
  for(let invenitem = 0;invenitem < items.length;invenitem++){
     
      
   //item sensing, you can only pick up items directly that are in sand
   if(
       ((this.X == items[invenitem].X&&this.Y == items[invenitem].Y&&((this.X < 1||this.X > 14)||((this.X == 1||this.X == 14)&&this.Y > 0&&this.Y < 6)))||
       (this.X == items[invenitem].X-1&&this.Direction == 3&&!items[invenitem].sensecheck(true))||
       (this.X == items[invenitem].X+1&&this.Direction == 2&&!items[invenitem].sensecheck(true))||
       (this.Y == items[invenitem].Y-1&&this.Direction == 4&&!items[invenitem].sensecheck(true))||
       (this.Y == items[invenitem].Y+1&&this.Direction == 1&&!items[invenitem].sensecheck(true)))&&
       (this.X == items[invenitem].X||this.Y == items[invenitem].Y)&&items[invenitem].Held == -1&&items[invenitem].LilyPadTile == false&&!(items[invenitem].Type !== "Sunobrope"&&items[invenitem].Connected)){
       
  //You can't carry a sunobrope if someone is on the ropes
  if(items[invenitem].Type == "Sunobrope"&&items[invenitem].Connected){
         
  if(items[invenitem].ropebreak()){  
  items[invenitem].Frame = 0;
  items[invenitem].Connected.Connected = false;
  items[invenitem].Connected = false; 
  } else {
  return;
  }
      
  }       
       
   this.Inventory = items[invenitem];
   items[invenitem].Held = currentpixpet;
   items[invenitem].sensecheck();
   soundeffect("Audio Files/ItemPickup.mp3");
       
   break;
   }
     
  }
     
 } else { 

 //putting down items
  if(this.Direction == 2&&this.X > 0&&(this.Inventory.TypeInfo[this.Inventory.Type][1].indexOf(tileload[this.Y][this.X-1]) !== -1||soundeffect("Audio Files/ItemDenied.mp3"))&&!this.Inventory.spotaken([this.Y,this.X-1])) { 
     
      this.Inventory.X = this.X-1;
      this.Inventory.Y = this.Y;
      this.Inventory.Held = -1;
       
      this.inventorydrop();
      
  } else if(this.Direction == 3&&this.X < 15&&(this.Inventory.TypeInfo[this.Inventory.Type][1].indexOf(tileload[this.Y][this.X+1]) !== -1||soundeffect("Audio Files/ItemDenied.mp3"))&&!this.Inventory.spotaken([this.Y,this.X+1])) {
        
      this.Inventory.X = this.X+1;
      this.Inventory.Y = this.Y;
      this.Inventory.Held = -1;
      
      this.inventorydrop();
      
  } else if(this.Direction == 4&&this.Y < 6&&(this.Inventory.TypeInfo[this.Inventory.Type][1].indexOf(tileload[this.Y+1][this.X]) !== -1||soundeffect("Audio Files/ItemDenied.mp3"))&&!this.Inventory.spotaken([this.Y+1,this.X])) {
 
      this.Inventory.X = this.X;
      this.Inventory.Y = this.Y+1;
      this.Inventory.Held = -1;
  
      this.inventorydrop();
                  
  } else if(this.Direction == 1&&this.Y > 0&&(this.Inventory.TypeInfo[this.Inventory.Type][1].indexOf(tileload[this.Y-1][this.X]) !== -1||soundeffect("Audio Files/ItemDenied.mp3"))&&!this.Inventory.spotaken([this.Y-1,this.X])) {
 
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
   
  } else if(this.BootWalk == false&&this.Inventory !== -1&&this.Inventory.Type == "Pixeldust_Boots"&&tileload[this.Y+check[0]][this.X+check[1]] == 0&&(check[0] !== 0||check[1] !== 0)){
  
  this.BootWalk = check;
      
  } else {
  this.BootWalk = false;
  }
    
  for(let invenitem = 0;invenitem < items.length;invenitem++){
     
  if(checktype == "Wooden_Raft"&&items[invenitem].Type == checktype&&tileload[this.Y+check[0]][this.X+check[1]] == 0&&this.X == items[invenitem].X&&this.Y == items[invenitem].Y&&items[invenitem].Held == -1){
  items[invenitem].Y += check[0];
  items[invenitem].X += check[1];
  items[invenitem].sensecheck();
  return true;
  } 
      
    if(checktype == "Pixpet_Transporter"&&items[invenitem].Type == checktype&&this.X == items[invenitem].X&&this.Y == items[invenitem].Y&&items[invenitem].Held == -1){
  
    for(let transport = 0;transport < items.length;transport++){
    
    //location swapper
    if(items[transport].Type == "Pixpet_Transporter"&&items[transport] !== items[invenitem]&&items[transport].Held ==     -1&&items[transport].Frame == 1){
      
      for(let pixpettransport = 0;pixpettransport < pixpets.length;pixpettransport++){
    
      if(pixpets[pixpettransport].X == items[transport].X&&pixpets[pixpettransport].Y == items[transport].Y&&pixpets[pixpettransport] !== this){
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

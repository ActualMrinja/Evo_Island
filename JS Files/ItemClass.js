item = function(type,x,y){
 
this.Image = new Image();
this.Image.src = "Png Files/"+type+".png";
this.X = x;
this.Y = y;
this.Type = type;
this.Held = -1;
    
this.TypeInfo = {
    Lily_Pad:["USE ON EMPTY WATER TILES TO ACT AS LAND. HAS A PAIR",[0],"Active"],
    Pixpet_Transporter:["A TECHNOLOGICAL DEVICE. SWAPS PIXPET WHEN STEPPED ON BOTH SIDES. HAS A PAIR",[1],"Active"],
    Sunobrope:["USE HORIZONTALLY FROM PAIR TO CREATE STABLE ROPES FROM EMPTY WATER TILES",[1],"Active"],
    Sunobrope_Rope:["None",[1],"None"],
    Wooden_Raft:["USE ON EMPTY WATER TILES TO CREATE LAND. CAN BE STEERED",[0],"Active"],
    Pixeldust_Boots:["ZOOM ACROSS WATER WHEN TOUCHING WATER",[1],"Active"],
    Evolution_Fruit_Thermos_Bottle:["HAS NO EFFECT",[1],"Passive"],
    Ball_Capsule:["A RELIC CAPSULE FROM A DISTANT PAST. USE ON TOOLS TO CONTAIN THEM. USE AGAIN TO RELEASE",[1],"Passive"],
    Great_Oceanic_Clock:["SLOWS DOWN TIME BY 25% WHEN BEING HELD, SPEEDS IT UP BY 25% WHEN NOT",[1],"Passive"],
    Ancient_Tectonic_Clock:["CUTS TIME BY 25% WHEN USED. DISAPPEARS ON USE",[1],"Passive"],
    Wooden_Chest:["USE TO BECOME A WOODEN RAFT, OR PIXELDUST BOOTS",[1],"Passive"],
};
    
this.Checking = -1;
    
this.Frame = 0;

this.LilyPadTile = false;
    
if(this.Type == "Pixeldust_Boots"){
this.BootTrail = new Image();
this.BootTrail.src = "Png Files/PixeldustTrails.png";
}
 
//Used in Sunobrope
this.Connected = false;

//Ropes hide if there is an item

}

//For items that have a y-axis boost when being used
item.prototype.sandtile = function(){
  
    if((this.X < 1||this.X > 14)||((this.X == 1||this.X == 14)&&this.Y > 0&&this.Y < 6)){
    return true;
    } else {
    return false;
    }
    
}


item.prototype.information = function(){
   
if(currentpixpet == this.Held&&!(this.Type == "Ball_Capsule"&&this.Checking !== -1)) {
    
if(this.Type == "Pixpet_Transporter"||this.Type == "Sunobrope"){
ctx.drawImage(this.Image,this.Image.width/2*this.Frame,0,this.Image.width/2,this.Image.height,(116.5-this.Image.width/12)*(hs/297),(276-this.Image.height/6)*(hs/297),this.Image.width/6*(hs/297),this.Image.height/3*(hs/297));  
} else {
ctx.drawImage(this.Image,(116.5-this.Image.width/6)*(hs/297),(276-this.Image.height/6)*(hs/297),this.Image.width/3*(hs/297),this.Image.height/3*(hs/297));  
}
    
textmaker(this.Type.split("_").join(" ")+" - "+this.TypeInfo[this.Type][2],150,278,10);
textmaker(this.TypeInfo[this.Type][0],150,288,6);
    
   
} else if(this.Type == "Ball_Capsule"&&this.Checking !== -1){
ctx.drawImage(this.Image,(101.5-this.Image.width/6)*(hs/297),(260-this.Image.height/6)*(hs/297),this.Image.width/3*(hs/297),this.Image.height/3*(hs/297));    
}   
    
}

item.prototype.draw = function(){
    
if(this.Held == -1&&!(this.Type == "Ball_Capsule"&&this.Checking !== -1)){
    
if(this.Type == "Pixpet_Transporter"||this.Type == "Sunobrope"){
ctx.drawImage(this.Image,this.Image.width/2*this.Frame,0,this.Image.width/2,this.Image.height,(this.X*32+24-(this.Image.width/12))*(hs/297),(this.Y*32+15-(this.Image.height/6)+((this.Type == "Pixpet_Transporter") ? 55 : 50))*(hs/297),this.Image.width/6*(hs/297),this.Image.height/3*(hs/297));
} else {
ctx.drawImage(this.Image,(this.X*32+24-(this.Image.width/6))*(hs/297),(this.Y*32+15-(this.Image.height/6)+((!this.sandtile()) ? 60 : 50))*(hs/297),this.Image.width/3*(hs/297),this.Image.height/3*(hs/297));
}
    
if(tileload[this.Y][this.X] == 0){
tileload[this.Y][this.X] = 1; 
}
    
}
    
if(tileload[this.Y][this.X] == 2&&this.Held == -1&&this.Type !== "Sunobrope"){
this.Frame = 1;
} else if(this.Type == "Sunobrope"&&this.Connected&&this.Connected.Held == -1){
this.Frame = 1;
} else {
    
this.Frame = 0;     
    
}
 
if(this.Held !== -1&&this.Type == "Pixeldust_Boots"&&pixpets[this.Held].BootWalk !== false){
    
((pixpets[this.Held].X+pixpets[this.Held].Y) % 2 ==  0) ? this.Frame = 0 : this.Frame = 1;
    
 //Pixeldust Trail will naturally fall behind Pixpets
if(this.Type == "Pixeldust_Boots"){
ctx.drawImage(this.BootTrail,this.BootTrail.width/2*this.Frame,0,this.BootTrail.width/2,this.BootTrail.height,(pixpets[this.Held].X*32+24-this.BootTrail.width/12)*(hs/297),((pixpets[this.Held].Y+1)*32+32-this.BootTrail.height/6)*(hs/297),this.BootTrail.width/6*(hs/297),this.BootTrail.height/3*(hs/297));  
}    
    
}
 
//Oceanic Clock assists with time
if(this.Type == "Oceanic_Clock"&&this.Held == -1){
seconds += (1/120);
} else if(this.Type == "Oceanic_Clock"){
seconds -= (1/120);
}

//Lily Pad resetting tile when item is picked up
if(this.Type == "Lily_Pad"&&this.LilyPadTile.Held !== -1){
this.LilyPadTile = false
}
 
//Ropes create ropes from empty water tiles to create an illusion that there was always a rope underneath
if(this.Type == "Sunobrope_Rope"&&tileload[this.Y][this.X+1] == 0){
items.push(new item("Sunobrope_Rope",this.X+1,this.Y));
items[items.length-1].Connected = this.Connected;
} else if(this.Type == "Sunobrope_Rope"&&tileload[this.Y][this.X-1] == 0){
items.push(new item("Sunobrope_Rope",this.X-1,this.Y));
items[items.length-1].Connected = this.Connected;
}
     
}

//sense check for pixpets and resetting
item.prototype.sensecheck = function(returnallow=false){

  if(returnallow){  
    
    for(let pixpetc = 0;pixpetc < pixpets.length;pixpetc++){
 
   //item sensing
   if(this.X == pixpets[pixpetc].X&&this.Y == pixpets[pixpetc].Y){
   soundeffect("Audio Files/ItemDenied.mp3");
   return true;
   }
        
    }  
      
  }
   
   //Lily pads/Wooden Rafts create water tiles when taken to inventory and leave sand tiles when in use
   if(this.Type == "Lily_Pad"||this.Type == "Wooden_Raft"){
     
   (this.Held !== -1&&(!this.sandtile())) ? tileload[this.Y][this.X] = 0 :  tileload[this.Y][this.X] = 1;         
   }
    
   if(this.Type == "Wooden_Chest"&&this.Held == -1){
   items[items.indexOf(this)] = new item((Math.floor(Math.random()*2) == 0) ? "Wooden_Raft" : "Pixeldust_Boots",this.X,this.Y);
    soundeffect("Audio Files/OpenChest.mp3");
   }
     

   return false  
}

//spot taken is to check for items
item.prototype.spotaken = function(check){
 
  if(this.Type == "Ancient_Tectonic_Clock"){
  seconds *= 0.25;
  items.splice(items.indexOf(this),1);
  clockanimation = 2;
  return;
  }

    for(let itemc = 0;itemc < items.length;itemc++){
        
   if(this !== items[itemc]&&this.Type == "Sunobrope"&&this.Type == items[itemc].Type&&check[0] == items[itemc].Y&&Math.abs(check[1] - items[itemc].X) > 1&&!this.Connected&&!items[itemc].Connected){    
   this.Connected = items[itemc];
   items[itemc].Connected = this;
       
   for(let ropemake = 0;ropemake < Math.abs(check[1] - items[itemc].X);ropemake++){
       
   //wraps ropes around water
   if(tileload[check[0]][(check[1] > items[itemc].X) ? ropemake+items[itemc].X : ropemake+check[1]+1] == 0){
   items.push(new item("Sunobrope_Rope",(check[1] > items[itemc].X) ? ropemake+items[itemc].X : ropemake+check[1]+1,check[0]));
   items[items.length-1].Connected = this;
   }   
    
   }
       
   }
        
   //item sensing
   if((this !== items[itemc]&&check[1] == items[itemc].X&&check[0] == items[itemc].Y)&&items[itemc].Held == -1&&(!(items[itemc].Type == "Lily_Pad"&&items[itemc].LilyPadTile == false)||this.Type == "Ball_Capsule")){
       
   //Capsules use this to their advantage
   if(this.Checking == -1&&this.Type == "Ball_Capsule"&&items[itemc].LilyPadTile == false&&!(items[itemc].Type !== "Sunobrope"&&items[itemc].Connected)){
       
   this.Checking = currentpixpet;
   pixpets[currentpixpet].Inventory = items[itemc];
   pixpets[currentpixpet].CapsuleItem = this;
   items[itemc].Held = currentpixpet;
   this.Held = currentpixpet;
   items[itemc].sensecheck();
   soundeffect("Audio Files/ItemPickup.mp3");
   }
    
   if(items[itemc].LilyPadTile == false){
   soundeffect("Audio Files/ItemDenied.mp3");
   return true;
   }
       
   } else if((this !== items[itemc]&&check[1] == items[itemc].X&&check[0] == items[itemc].Y)&&items[itemc].Held == -1&&items[itemc].Type == "Lily_Pad"&&!items[itemc].sandtile()){
   items[itemc].LilyPadTile = this;    
   } else if((this !== items[itemc]&&check[1] == items[itemc].X&&check[0] == items[itemc].Y)&&items[itemc].Held == -1&&items[itemc].Type == "Lily_Pad"&&items[itemc].sandtile()) {
    soundeffect("Audio Files/ItemDenied.mp3");
    return true;
   }
        
  }
     
    
   return false; 
}

//used in handling sunobropes
item.prototype.ropebreak = function(){
 
//can't take out items if there is a pixpet ontop of it.
for(let itemc = 0;itemc < items.length;itemc++){ 
    
   if(items[itemc].Type !== "Sunobrope"&&items[itemc].Connected&&tileload[items[itemc].Y][items[itemc].X] == 2){
soundeffect("Audio Files/ItemDenied.mp3");
return false;
}
    
}    

for(let itemc = 0;itemc < items.length;itemc++){ 

if(items[itemc].Type == "Sunobrope_Rope"&&items[itemc].Connected){
    
tileload[items[itemc].Y][items[itemc].X] = 0;
items.splice(itemc,1);   
itemc -= 1;
}

}  
    
return true;
    
}

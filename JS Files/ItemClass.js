item = function(type,x,y){
 
this.Image = new Image();
this.Image.src = "Png Files/"+type+".png";
this.X = x;
this.Y = y;
this.Type = type;
this.Held = -1;
    
this.TypeInfo = {
    Pixpet_Transporter:["A TECHNOLOGICAL DEVICE. SWAPS PIXPET WHEN STEPPED ON BOTH SIDES. HAS A PAIR",[1]],
    Wooden_Raft:["USE ON EMPTY WATER TILES TO CREATE LAND. CAN BE STEERED",[0]],
    Pixeldust_Boots:["ZOOM ACROSS WATER WHEN USED. DISAPPEARS WHEN USED NEAR EVO ISLAND",[1]],
    Devolution_Fruit_Thermos_Bottle:["A CONCENTRATED AMOUNT OF DEVO JUICE. USE TO DEVOLVE AN EVOLVED PIXPET. ONE TIME USE",[1]],
    Potion_of_Gigantism:["USE TO GIGANTISIZE A PIXPET ALLOWING THEM TO PICK UP ANY PIXPET TEMPORARILY",[1,2]]
};
    
this.Checking = -1;
    
this.Frame = 0;
    
if(this.Type == "Pixeldust_Boots"){
this.BootTrail = new Image();
this.BootTrail.src = "Png Files/PixeldustTrails.png";
}

}

//For items that have a y-axis boost when being used
item.prototype.sandtile = function(){
  
    if((this.X < 2||this.X > 13)||((this.X == 2||this.X == 13)&&this.Y > 0&&this.Y < 6)){
    return true;
    } else {
    return false;
    }
    
}


item.prototype.information = function(){
   
if(currentpixpet == this.Held) {
    
if(this.Type == "Pixpet_Transporter"){
ctx.drawImage(this.Image,this.Image.width/2*this.Frame,0,this.Image.width/2,this.Image.height,(116.5-this.Image.width/12)*(hs/297),(276-this.Image.height/6)*(hs/297),this.Image.width/6*(hs/297),this.Image.height/3*(hs/297));  
} else {
ctx.drawImage(this.Image,(116.5-this.Image.width/6)*(hs/297),(276-this.Image.height/6)*(hs/297),this.Image.width/3*(hs/297),this.Image.height/3*(hs/297));  
}
    
textmaker(this.Type.split("_").join(" "),150,278,10);
textmaker(this.TypeInfo[this.Type][0],150,288,6);
    
   
}  
    
}

item.prototype.draw = function(){
    
if(this.Held == -1){
    
if(this.Type == "Pixpet_Transporter"){
ctx.drawImage(this.Image,this.Image.width/2*this.Frame,0,this.Image.width/2,this.Image.height,(this.X*32+24-(this.Image.width/12))*(hs/297),(this.Y*32+15-(this.Image.height/6)+((this.Type == "Pixpet_Transporter") ? 55 : 50))*(hs/297),this.Image.width/6*(hs/297),this.Image.height/3*(hs/297));
} else {
ctx.drawImage(this.Image,(this.X*32+24-(this.Image.width/6))*(hs/297),(this.Y*32+15-(this.Image.height/6)+((!this.sandtile()) ? 55 : 50))*(hs/297),this.Image.width/3*(hs/297),this.Image.height/3*(hs/297));
}
  
if(tileload[this.Y][this.X] == 0){
 tileload[this.Y][this.X] = 1;  
}
    
}
    
if(tileload[this.Y][this.X] == 2&&this.Held == -1){
this.Frame = 1;
} else {
this.Frame = 0;      
}
 
if(this.Held !== -1&&this.Type == "Pixeldust_Boots"&&pixpets[this.Held].BootWalk !== false){
    
(pixpets[this.Held].X+pixpets[this.Held].Y % 2 ==  0) ? this.Frame = 0 : this.Frame = 1;
    
 //Pixeldust Trail will naturally fall behind Pixpets
if(this.Type == "Pixeldust_Boots"){
ctx.drawImage(this.BootTrail,this.BootTrail.width/2*this.Frame,0,this.BootTrail.width/2,this.BootTrail.height,(pixpets[this.Held].X*32+24-this.BootTrail.width/12)*(hs/297),((pixpets[this.Held].Y+1)*32+32-this.BootTrail.height/6)*(hs/297),this.BootTrail.width/6*(hs/297),this.BootTrail.height/3*(hs/297));  
}    
    
}
    
}

//sense check for pixpets and resetting
item.prototype.sensecheck = function(returnallow=false){

  if(returnallow){  
    
    for(let pixpetc = 0;pixpetc < pixpetamount;pixpetc++){
 
   //item sensing
   if(this.X == pixpets[pixpetc].X&&this.Y == pixpets[pixpetc].Y){
   soundeffect("Audio Files/ItemDenied.mp3");
   return true;
   }
        
    }  
      
  }
   
   //Wooden Rafts create water tiles when taken to inventory and leave sand tiles when in use
   if(this.Type == "Wooden_Raft"){ 
   (this.Held !== -1&&!this.sandtile()) ? tileload[this.Y][this.X] = 0 :  tileload[this.Y][this.X] = 1;         
   }
    
   return false  
}

//spot taken is to check for items
item.prototype.spottaken = function(check,soundeffectmake=true){

   if(this.Type == "Potion_of_Gigantism"&&this.Held !== -1){ 
   pixpets[this.Held].Inventory = -1;
   pixpets[this.Held].Gigantisize = true;
   items.splice(items.indexOf(this),1);
   } 
    
    for(let itemc = 0;itemc < items.length;itemc++){
  
   //item sensing
   if((this !== items[itemc]&&check[1] == items[itemc].X&&check[0] == items[itemc].Y)&&items[itemc].Held == -1){ 
     if(soundeffectmake) { soundeffect("Audio Files/ItemDenied.mp3"); }
     return true;
   }
        
  }
    
   return false; 
}
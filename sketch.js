var cat,animation_cat,cat_jump;

var rat,animation_rat;

var rat_ok

var frase,imagen_frase;

//obstaculo
var caixa

var grupo_caixa

var texto,imagen_texto

//obstaculo


var solo,imagen_solo;
var solo_invisivel;
var parede_invisivel

var cenario,imagen_cenario

var estadojogo = "inicio";


function preload() {
  animation_cat = loadAnimation ("cat 1.png","cat2.png","cat3.png","cat4.png","cat5.png","cat6.png","cat7.png","cat8.png");
  
  cat_jump = loadAnimation ("cat6.png");
  
  animation_rat = loadAnimation ("rat1.png","rat2.png","rat3.png","rat2.png","rat1.png");
  
  imagen_solo = loadImage ("solo(1).png");
  
  imagen_cenario = loadImage ("cenario.jpg");
  
  imagen_frase = loadImage ("balao.png")
  
  imagen_texto = loadImage ("letra.png");
}

function setup() {
  createCanvas(640,400);
  
  cenario = createSprite (1024,160,1,1)
  cenario.addImage("quetal",imagen_cenario)
  cenario.scale = 0.80;
  
  
  parede_invisivel = createSprite (550,220,640,4);
  parede_invisivel.visible = false;
  
  
  cat = createSprite (100,300,40,40);
  cat.addAnimation("pulando",cat_jump)
  cat.addAnimation ("qualquercoisa",animation_cat)
  cat.scale = 0.06;
  
  rat = createSprite (-200,120,1,1)
  rat.addAnimation ("quetalah",animation_rat);
  rat.scale = 0.15;
  
  //frase = createSprite (900,900,1,1)
  //frase.addImage ("guu",imagen_frase)
  
  //obstaculo
  caixa = createSprite (900,900,1,1);
  //obstaculo
  
  solo = createSprite (640,150,1,1)
  solo.addImage ("shao",imagen_solo);
  solo.scale = 0.50;
  
  solo_invisivel = createSprite (320,330,640,5);
  solo_invisivel.visible = false;
  
  texto = createSprite (320,200,1,1);
  texto.addImage ("vamos começar",imagen_texto);
  texto.scale = 0.10;
  
  grupo_caixa = new Group();

}


function draw() {
  background("white");
  
  rat.collide(parede_invisivel);
  grupo_caixa.collide(solo_invisivel);
  cat.collide(solo_invisivel);
  
   
  
  if (keyDown("space") && estadojogo === "inicio") {
      
    estadojogo = "jogar";
    rat.velocityX = 15;
    texto.destroy();
  
    
  }
  
  
  if (estadojogo === "jogar") {
    
      solo.velocityX = -10;
      cenario.velocityX = -0.80;
      rat.velocityX = 10;
      cat.velocityY = cat.velocityY + 0.8
      movimento_rat();
      geracao_obstaculo()
    
        
    
    
      if (rat.x > 450) {
          
       rat.velocityX = 0;
     
      }
      

      if (solo.x < -3) {

        solo.x = 640;
      }

      if (cenario.x < -390) {

          cenario.x = 1024;
      }
    
    //controle
    if (mouseWentDown("leftButton") || keyWentDown("space")) {
       cat.velocityY = cat.velocityY - 13; 
        
    }
    
    if (cat.y > 250){
        
        cat.changeAnimation("qualquercoisa",animation_cat);
    }
    
    else {
      
      
      cat.changeAnimation("pulando",cat_jump)
    }
    //controle
    
    
  }  
  
  //console.log (cenario.x);
  
  drawSprites();
}

 function movimento_rat() {
   
   rat_ok = Math.round(random(1,2))
   
   switch (rat_ok) {
       
     case 1 : rat.velocityY = 1; break;
     
     case 2 : rat.velocityY = -1;break;
       
   }
   
 }

  function geracao_obstaculo() {
    
    if (frameCount % 100 === 0) {
      
      caixa = createSprite (320,200,40,40);
      caixa.shapeColor = "black";
      caixa.x = rat.x;
      caixa.y = rat.y;
      
      caixa.velocityY = 30;
      caixa.velocityX = -10;
      
      //if (grupo_caixa.collide(solo)) {
        //caixa.velocityX = -10;
      //}
      
      grupo_caixa.add(caixa)
      caixa.lifetime = 80;
      
    }
    
    
    
  }
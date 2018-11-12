var loading,items_tab = {assets: [],posx: [], posy: []}, distance; 
var actualFrame = 0,heartFrame = 0,gameover=false;
var bgx = 0, bgy = 0;                                                     
var points = 0,points_st = 0,points_bn = 0,demo=1,read_demo,tr=1,tries=0,menu=true,training=false,levels=false,level=1,progression=1,bonus=false,bn1,bn2,bn3,bn4,bonus1=bonus2=bonus3=bonus4=0, screen="* Menu *";
var left=false, right=false, up=false, down=false;             
var x_speed=0,y_speed=0;
var y=0,x=0;
var handy=250,handx=300;
var friction=0.9;
var gravity=0.1;
var maxspeed = 4;
var angle = 0;
var interval = 0;
var first_time_fs =true;var first_time_cloud2 =true;
var message_bull="Tu peux t’entraîner avant de faire le niveau!";
var totalResources = 95;
var numResourcesLoaded = 0;
var images = {};
var background,balloon,tr1_btn,tr2_btn,lev1_btn,lev2_btn,lev3_btn,lev4_btn,meter,count_bar,goal,grow=0;
var paper, btn_menu, btn_lev1,btn_lev2,btn_lev3,btn_lev4,btn_golden_seeds,btn_bull,btn_intro_level,btn_end_level,btn_bn1,btn_bn2,btn_bn3,btn_bn4,btn_intro_bonus;
var video,myStream, backCanvas,backContext,canvas,context,request,m,w,h,comp =[{}],chrono=514;  
var course = 0;var vx = 0;var vx2 = 0;var goalx  = 2000;var goaly  = 100;
var gaugex = 0 ;var gaugey = 0 ;var gaugei = 180 ;var mouseIsDown = false;
var speed = 0; var centerX = 810; var centerY = 300;  var outterRadius = 48;  var needleHashes = getNPointsOnCircle( centerX, centerY, outterRadius - 5, 160);
needleHashes.push.apply( needleHashes, needleHashes.splice( 0, 80 ) );
needleHashes.splice(-80);
     
var item1_x=10;var item1_y=0;var item2_x=200;var item2_y=0;var heart_m_x=710;var heart_m_y=15; var screen_x=450;var screen_y=40;var points_x=110;var points_y=40;var points_st_x=300;var points_st_y=40;var menu_bar_y=0;
var radgrad;	 

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
            return window.setTimeout(callback, 1000 / 60);
        };
})();
	
	window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame          ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame     ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
} )();

function raph(){
paper = Raphael(document.getElementById("container"), 960, 640);
//paper = Raphael("container", 960, 640); 
btn_bull = paper.rect(220, 60, 521, 94).attr("fill","#000");btn_bull.attr("opacity", 0.0);btn_bull.attr({cursor: "pointer"});
btn_menu = paper.rect(860, 20, 90, 48).attr("fill","#000");btn_menu.attr("opacity", 0.0);btn_menu.attr({cursor: "pointer"});
btn_tr1 = paper.rect(350, 170, 90, 100).attr("fill","#000");btn_tr1.attr("opacity", 0.0);btn_tr1.attr({cursor: "pointer"});
btn_tr2 = paper.rect(530, 170, 90, 100).attr("fill","#000");btn_tr2.attr("opacity", 0.0);btn_tr2.attr({cursor: "pointer"});
btn_lev1 = paper.rect(100, 350, 119, 123).attr("fill","#000");btn_lev1.attr("opacity", 0.0);btn_lev1.attr({cursor: "pointer"});
btn_lev2 = paper.rect(320, 350, 119, 123).attr("fill","#000");btn_lev2.attr("opacity", 0.0);btn_lev2.attr({cursor: "pointer"});
btn_lev3 = paper.rect(535, 350, 119, 123).attr("fill","#000");btn_lev3.attr("opacity", 0.0);btn_lev3.attr({cursor: "pointer"});
btn_lev4 = paper.rect(750, 350, 119, 123).attr("fill","#000");btn_lev4.attr("opacity", 0.0);btn_lev4.attr({cursor: "pointer"});
btn_golden_seeds = paper.rect(285, 525, 397, 66).attr("fill","#000");btn_golden_seeds.attr("opacity", 0.0);btn_golden_seeds.attr({cursor: "pointer"});
btn_intro_training = paper.circle(740,2000,30).attr("fill","#000");btn_intro_training.attr("opacity", 0.0);btn_intro_training.attr({cursor: "pointer"});
btn_end_training = paper.circle(690,2000,30).attr("fill","#000");btn_end_training.attr("opacity", 0.0);btn_end_training.attr({cursor: "pointer"});
btn_intro_level = paper.circle(740,2000,30).attr("fill","#000");btn_intro_level.attr("opacity", 0.0);btn_intro_level.attr({cursor: "pointer"});
btn_end_level = paper.circle(710,2000,30).attr("fill","#000");btn_end_level.attr("opacity", 0.0);btn_end_level.attr({cursor: "pointer"});
btn_bn1 = paper.rect(50, 2000, 158, 200).attr("fill","#000");btn_bn1.attr("opacity", 0.0);btn_bn1.attr({cursor: "pointer"});
btn_bn2 = paper.rect(300, 2000, 158, 200).attr("fill","#000");btn_bn2.attr("opacity", 0.0);btn_bn2.attr({cursor: "pointer"});
btn_bn3 = paper.rect(550, 2000, 158, 200).attr("fill","#000");btn_bn3.attr("opacity", 0.0);btn_bn3.attr({cursor: "pointer"});
btn_bn4 = paper.rect(800, 2000, 158, 200).attr("fill","#000");btn_bn4.attr("opacity", 0.0);btn_bn4.attr({cursor: "pointer"});
btn_intro_bonus = paper.circle(740,2000,30).attr("fill","#000");btn_intro_bonus.attr("opacity", 0.0);btn_intro_bonus.attr({cursor: "pointer"});
btn_end_bonus = paper.circle(690,2000,30).attr("fill","#000");btn_end_bonus.attr("opacity", 0.0);btn_end_bonus.attr({cursor: "pointer"});
btn_grow = paper.rect(0, 2000, 960, 640).attr("fill","#000");btn_grow.attr("opacity", 0.0);btn_grow.attr({cursor: "pointer"});
btn_gameover = paper.rect(250, 2000, 189, 97).attr("fill","#000");btn_gameover.attr("opacity", 0.0);btn_gameover.attr({cursor: "pointer"});

btn_tr1.click(function() {            
           onClick('btn_tr1');
        });
		
btn_tr2.click(function() {            
           onClick('btn_tr2');
        });
		
btn_lev1.click(function() {            
           onClick('btn_lev1');
        });
		
btn_lev2.click(function() {            
           onClick('btn_lev2');
        });

btn_lev3.click(function() {            
           onClick('btn_lev3');
        });

btn_lev4.click(function() {            
           onClick('btn_lev4');
        });
		
btn_menu.click(function() {            
           onClick('btn_menu');
        });	

btn_golden_seeds.click(function() {            
           onClick('btn_golden_seeds');
        });	
btn_intro_training.click(function() {            
           onClick('btn_intro_training');
        });	
		
btn_end_training.click(function() {            
           onClick('btn_end_training');
        });		
btn_intro_level.click(function() {            
           onClick('btn_intro_level');
        });		

btn_bull.click(function() {            
           onClick('btn_bull');
        });	
btn_end_level.click(function() {            
           onClick('btn_end_level');
        });	
		
btn_bn1.click(function() {            
           onClick('btn_bn1');
        });	

btn_bn2.click(function() {            
           onClick('btn_bn2');
        });	

btn_bn3.click(function() {            
           onClick('btn_bn3');
        });	

btn_bn4.click(function() {            
           onClick('btn_bn4');
        });			
		
btn_intro_bonus.click(function() {            
           onClick('btn_intro_bonus');
        });	
		
btn_end_bonus.click(function() {            
           onClick('btn_end_bonus');
        });	
		
btn_grow.click(function() {            
           onClick('btn_grow');
        });	
		
btn_gameover.click(function() {            
		   btn_gameover.attr("y", 2000);
           menu_fn();
        });	
}
loadImage("tr1_btn");
loadImage("tr2_btn");
loadImage("tr1ok_btn");
loadImage("tr2ok_btn");
loadImage("demo1");
loadImage("demo2");
loadImage("demo3");
loadImage("demo4");
loadImage("lev_closed");
loadImage("lev1_btn");
loadImage("lev2_btn");
loadImage("lev3_btn");
loadImage("lev4_btn");
loadImage("lev1ok_btn");
loadImage("lev2ok_btn");
loadImage("lev3ok_btn");
loadImage("lev4ok_btn");
loadImage("golden_seeds");
loadImage("hand");	
loadImage("tries");	
loadImage("background_m");
loadImage("background_t");
loadImage("background_b");
loadImage("background1");
loadImage("background2");
loadImage("background3");
loadImage("background4");
loadImage("balloon");
loadImage("balloon_t");
loadImage("paf");
loadImage("picker");
loadImage("fs");
loadImage("terre");
loadImage("bois");
loadImage("engrais");
loadImage("luciole");
loadImage("heart_l");
loadImage("cloud1");
loadImage("cloud2");
loadImage("bird");
loadImage("bat");
loadImage("tray");
loadImage("brume");
loadImage("castle");
loadImage("big_bird");
loadImage("moon");
loadImage("master");
loadImage("menu_bar");
loadImage("item1");
loadImage("item2");
loadImage("menu_button");
loadImage("heart_m");
loadImage("meter0");
loadImage("meter1");
loadImage("meter2");
loadImage("meter3");
loadImage("meter4");
loadImage("chrono");
loadImage("meter_bar");
loadImage("time_bar");
loadImage("pause");
loadImage("bull");
loadImage("intro_tr1");
loadImage("intro_tr2");
loadImage("end_tr");
loadImage("intro_lev1");
loadImage("intro_lev2");
loadImage("intro_lev3");
loadImage("intro_lev4");
loadImage("end_lev123");
loadImage("end_lev4");
loadImage("bn1_a");
loadImage("bn1_b");
loadImage("bn2_a");
loadImage("bn2_b");
loadImage("bn3_a");
loadImage("bn3_b");
loadImage("bn4_a");
loadImage("bn4_b");
loadImage("intro_bn1");
loadImage("intro_bn2");
loadImage("intro_bn3");
loadImage("intro_bn4");
loadImage("end_bn123");
loadImage("clouds_bn");
loadImage("treasure_c");
loadImage("treasure_o");
loadImage("grow");
loadImage("ground");
loadImage("back_trees");
loadImage("speedometer");
loadImage("menu_bg");
loadImage("relaxair");
loadImage("spacer");
loadImage("gameover");

    canvas = document.getElementById( 'canvas' );
	//gc_canvas = document.querySelector('#canvas');
    context = canvas.getContext( '2d' );
    canvas.width = 960;
    canvas.height = 640;
    //document.body.appendChild( gc_canvas );

	 //video = $("#video").get(0);
	  video = document.createElement('video');
	  backCanvas = document.createElement('canvas');

//load_fn();
loading=setInterval(load_fn, 1000 / 30);
//LOADING
function load_fn(){
//requestAnimFrame(load_fn);
  context.save();	
  context.clearRect(0, 0, 960, 640);
  context.fillStyle = "#000000";
  context.font = "bold 34px Calibri";  
  context.fillText("LOADING:"+Math.round(numResourcesLoaded*100/totalResources)+"%", 360, 320);
  context.restore();	
}

function onClick(e)
{
// if(myStream!=null){
if(e=='btn_tr1'){
tr1_fn();	
}
if(e=='btn_tr2'){
if(tr>0){tr2_fn();}	
}
if(e=='btn_lev1'){
level1_fn();	
}
if(e=='btn_lev2'){
if(progression>=2){level2_fn();}
}
if(e=='btn_lev3'){
if(progression>=3){level3_fn();}
}
if(e=='btn_lev4'){
if(progression>=4){level4_fn();}
}
if(e=='btn_golden_seeds'){
golden_seeds_fn();
}
if(e=='btn_menu'){
menu_fn();
}
if(e=='btn_bull'){
hide_bull();
}
if(e=='btn_intro_training'){
btn_intro_training.attr("cy", 2000);
hide_bull();
if(images["intro_tr1"].src==location.href+"img/intro_tr1.png"){images["intro_tr1"].src="img/spacer.png";screen="* Training 1 *";demo=1;read_demo=setInterval(demo_fn, 2000);}
if(images["intro_tr2"].src==location.href+"img/intro_tr2.png"){images["intro_tr2"].src="img/spacer.png";screen="* Training 2 *";training=true;levels=true;y=300;heart_m_x=750; heart_m_y=370; screen_x=770; screen_y=450; item1_x=720; item1_y=470; item2_x=720; item2_y=530; points_x=820; points_y=510; points_st_x=820; points_st_y=570;menu_bar_y=2000;}
}
if(e=='btn_end_training'){
btn_end_training.attr("cy", 2000);
menu_fn();
}
if(e=='btn_intro_level'){
btn_intro_level.attr("cy", 2000);y=300;
heart_m_x=750; heart_m_y=370; screen_x=770; screen_y=450; item1_x=720; item1_y=470; item2_x=720; item2_y=530; points_x=820; points_y=510; points_st_x=820; points_st_y=570;menu_bar_y=2000;
show_bull();
levels=true;
if(level==1){
images["intro_lev1"].src="img/spacer.png" ;
if(first_time_fs){message_bull="Regarde en bas à droite, la  barre de progression t’indique\n la distance qu’il te reste à parcourir.";}
}
if(level==2){
images["intro_lev2"].src="img/spacer.png" ;
}
if(level==3){
images["intro_lev3"].src="img/spacer.png" ;
}
if(level==4){
images["intro_lev4"].src="img/spacer.png" ;
}
}
if(e=='btn_end_level'){
images["end_lev123"].src="img/spacer.png" ;
images["end_lev4"].src="img/spacer.png" ;
btn_end_level.attr("cy", 2000);
if(bonus1==1||bonus2==2||bonus3==3||bonus4==4){
screen="* BONUS *";
bonus=true;
hide_bull();
btn_bn1.attr("y", 250);
btn_bn2.attr("y", 400);
btn_bn3.attr("y", 250);
btn_bn4.attr("y", 400);
if(bn1==images["bn1_b"] && bn2==images["bn2_b"] && bn3==images["bn3_b"] && bn4==images["bn4_b"] && grow==0){
grow=1;btn_grow.attr("y", 0);show_bull();message_bull="Félicitations, tu as gagné en expérience,\n c’est indéniable ! Regarde… Ta plante grandit !";}
}else{menu_fn();}
}
if(e=='btn_bn1' && bonus1==1){
bonus1=11;
images["intro_bn1"].src="img/intro_bn1.png";
message_bull="Expire le plus longtemps possible pour ramasser un maximum \nde pièces feng shui!";
bonus_fn();
}
if(e=='btn_bn2' && bonus2==2){
bonus2=22;
images["intro_bn2"].src="img/intro_bn2.png";
message_bull="Expire le plus longtemps possible pour chasser\n les nuages et récupérer les pièces feng shui cachées!";
bonus_fn();
}
if(e=='btn_bn3' && bonus3==3){
bonus3=33;
images["intro_bn3"].src="img/intro_bn3.png";
message_bull="Expire le plus longtemps possible pour emprisonner\n le maximum de pièces feng shui dans ta bulle!";
bonus_fn();
}
if(e=='btn_bn4' && bonus4==4){
bonus4=44;
images["intro_bn4"].src="img/intro_bn4.png";
message_bull="Expire le plus longtemps possible pour emprisonner\n le maximum de pièces feng shui dans ta bulle!";
bonus_fn();
}

if(e=='btn_intro_bonus'){
levels=true;
images["background_b"].src="img/background_b.png";
background=images["background_b"];  
meter=images["chrono"];
count_bar=images["time_bar"];
btn_intro_bonus.attr("cy", 2000);
heart_m_x=750; heart_m_y=370; screen_x=770; screen_y=450; item1_x=720; item1_y=470; item2_x=720; item2_y=530; points_x=820; points_y=510; points_st_x=820; points_st_y=570;menu_bar_y=2000;
init_items();
if(bonus1==11){
images["intro_bn1"].src="img/spacer.png" ;
screen="* BONUS 1 *";
items_tab = {assets: [images["fs"],images["fs"],images["fs"],images["fs"],images["fs"],images["fs"],images["fs"],images["fs"]],posx: [180,210,240,270,300,330,370,400], posy: [450,420,390,360,330,300,270,240]};
}
if(bonus2==22){
images["intro_bn2"].src="img/spacer.png" ;
screen="* BONUS 2 *";
items_tab = {assets: [images["treasure_c"],images["clouds_bn"]],posx: [350,250], posy: [370,270]};
}
if(bonus3==33){
images["intro_bn3"].src="img/spacer.png" ;
screen="* BONUS 3 *";
items_tab = {assets: [images["fs"],images["fs"],images["fs"],images["fs"],images["fs"],images["fs"],images["fs"]],posx: [160,190,210,240,270,300,330], posy: [420,390,360,330,300,270,240]};
balloon=images["picker"];
}
if(bonus4==44){
images["intro_bn4"].src="img/spacer.png" ;
screen="* BONUS 4 *";
items_tab = {assets: [images["fs"],images["fs"],images["fs"],images["fs"],images["fs"],images["tray"],images["tray"],images["tray"]],posx: [210,240,270,300,330,200,450,700], posy: [360,330,300,270,240,70,70,70]};
balloon=images["picker"];
}
}
if(e=='btn_end_bonus'){
btn_end_bonus.attr("cy", 2000);
menu_fn();
}
if(e=='btn_grow'){
btn_grow.attr("y", 2000);
hide_bull();
grow=2;
}
// }else{setTimeout(function() {alert("Votre caméra n'est pas encore prête !");}, 5000);}	
}

function show_bull(){
images["master"].src="img/master.png";
images["bull"].src="img/bull.png";
btn_bull.attr("y", 60);
}
function hide_bull(){
images["master"].src="img/spacer.png";
images["bull"].src="img/spacer.png" ;
message_bull=""; 
btn_bull.attr("y", 2000);
}

function menu_fn(){
clearInterval(read_demo);
images["gameover"].src="img/spacer.png";
images["paf"].src="img/spacer.png";
images["intro_tr1"].src="img/spacer.png";
images["intro_tr2"].src="img/spacer.png";
btn_intro_training.attr("cy", 2000);
btn_end_training.attr("cy", 2000);
images["end_tr"].src="img/spacer.png";
images["intro_lev1"].src="img/spacer.png";
images["intro_lev2"].src="img/spacer.png";
images["intro_lev3"].src="img/spacer.png";
images["intro_lev4"].src="img/spacer.png";
btn_intro_level.attr("cy", 2000);
images["end_lev123"].src="img/spacer.png";
images["end_lev4"].src="img/spacer.png";
btn_end_level.attr("cy", 2000);
images["background_b"].src="img/spacer.png";
images["end_bn123"].src="img/spacer.png";
btn_bn1.attr("y", 2000);btn_bn2.attr("y", 2000);btn_bn3.attr("y", 2000);btn_bn4.attr("y", 2000);btn_intro_bonus.attr("cy", 2000);btn_end_bonus.attr("cy", 2000);
hide_bull();
training=false;levels=false;bonus=false;bonus1=bonus2=bonus3=bonus4=0;menu=true;
btn_tr1.attr("y", 170);btn_tr2.attr("y", 170);btn_lev1.attr("y", 350);btn_lev2.attr("y", 350);btn_lev3.attr("y", 350);btn_lev4.attr("y", 350);btn_golden_seeds.attr("y", 525);
screen="* Menu *";
//myStream.stop(); 
// myStream = null;
// cancelRequestAnimFrame(request);
up=false;down=false;right=false;left=false;	
item1_x=10; item1_y=0; item2_x=200; item2_y=0; heart_m_x=710; heart_m_y=15;  screen_x=450; screen_y=40; points_x=110; points_y=40; points_st_x=300; points_st_y=40;menu_bar_y=0;
heartFrame = 0;
}

function init_items(){
gameover=false;
bgx = 0; bgy = 0; 
x = 100;
chrono=514;points_bn = 0;
items_tab = {assets: [],posx: [], posy: []};
balloon=images["balloon"];
up=false;down=false;right=false;left=false;
course = 0; vx = 0; vx2 = 0; goalx  = 2000;
}

function levels_fn(){
menu=false;btn_tr1.attr("y", 2000);btn_tr2.attr("y", 2000);btn_lev1.attr("y", 2000);btn_lev2.attr("y", 2000);btn_lev3.attr("y", 2000);btn_lev4.attr("y", 2000);btn_golden_seeds.attr("y", 2000);
show_bull();
init_items();
}

function demo_fn(){
if(demo<4){demo ++;}else{
clearInterval(read_demo);
if(tr==1){handx=480;handy=250;}else{handy=450;switch (progression){case 1: handx=50;break;case 2:handx=275;break;case 3:handx=485;break;case 4:handx=700;break;case 5:handx=1000;break;}}
tr ++;images["end_tr"].src="img/end_tr.png";tr1_btn=images["tr1ok_btn"];btn_end_training.attr("cy", 470);show_bull();message_bull="Bravo ! Tu as terminé cet entraînement !";
}
}

function tr1_fn(){
levels_fn();
btn_intro_training.attr("cy", 500);
images["intro_tr1"].src="img/intro_tr1.png" ;
message_bull="Observe les mouvements du ballon et synchronise ta respiration \ndessus : inspire lorsqu’il est en position quasi-statique, et expire\n en maintenant la flèche du haut enfoncée lorsqu’il s’envole.";
}

function tr2_fn(){
levels_fn();
btn_intro_training.attr("cy", 500);
images["intro_tr2"].src="img/intro_tr2.png" ;
background=images["background_t"];  
meter=images["meter0"];
count_bar=images["time_bar"];
goal=images["balloon_t"];
message_bull="Inspire, puis expire en maintenant la flèche du haut enfoncée\n pour faire décoller le ballon.";
}

function level1_fn(){
levels_fn();
btn_intro_level.attr("cy", 500);
level=1;screen="* Level 1 *";
images["intro_lev1"].src="img/intro_lev1.png" ;
background=images["background1"];  
meter=images["meter1"];
count_bar=images["meter_bar"];
goal=images["brume"];
 for (var i=0;i<5;i++){ 
      items_tab.assets[i]=images["fs"];
	  items_tab.posx[i]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[i]=Math.floor(Math.random() * (320-50))+50;
	}
	 for (var i=5;i<8;i++){ 
      items_tab.assets[i]=images["cloud1"];
	  items_tab.posx[i]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[i]=Math.floor(Math.random() * (320-50))+50;
	}
	  items_tab.assets[8]=images["terre"];
	  items_tab.posx[8]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[8]=Math.floor(Math.random() * (600-50))+50;
	  items_tab.assets[9]=images["heart_l"];
	  items_tab.posx[9]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[9]=Math.floor(Math.random() * (600-50))+50;
message_bull="Atteint les cieux en volant jusqu’à la brume !";
}

function level2_fn(){
levels_fn();
btn_intro_level.attr("cy", 500);
level=2;screen="* Level 2 *";
images["intro_lev2"].src="img/intro_lev2.png" ;
background=images["background2"];  
meter=images["meter2"];
count_bar=images["meter_bar"];
goal=images["castle"];
 for (var i=0;i<5;i++){ 
      items_tab.assets[i]=images["fs"];
	  items_tab.posx[i]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[i]=Math.floor(Math.random() * (320-50))+50;
	}
	 for (var i=5;i<8;i++){ 
      items_tab.assets[i]=images["cloud2"];
	  items_tab.posx[i]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[i]=Math.floor(Math.random() * (320-50))+50;
	}
	  items_tab.assets[8]=images["bois"];
	  items_tab.posx[8]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[8]=Math.floor(Math.random() * (600-50))+50;
	   items_tab.assets[9]=images["heart_l"];
	  items_tab.posx[9]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[9]=Math.floor(Math.random() * (600-50))+50;
message_bull="Vole jusqu'au château flottant en évitant les nuages\n et tu préserveras tes points de bien être !";
}

function level3_fn(){
levels_fn();
btn_intro_level.attr("cy", 500);
level=3;screen="* Level 3 *";
images["intro_lev3"].src="img/intro_lev3.png" ;
background=images["background3"];  
meter=images["meter3"];
count_bar=images["meter_bar"];
goal=images["big_bird"];
for (var i=0;i<5;i++){ 
      items_tab.assets[i]=images["fs"];
	  items_tab.posx[i]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[i]=Math.floor(Math.random() * (320-50))+50;
	}
	 for (var i=5;i<8;i++){ 
      items_tab.assets[i]=images["bird"];
	  items_tab.posx[i]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[i]=Math.floor(Math.random() * (320-50))+50;
	}
	  items_tab.assets[8]=images["engrais"];
	  items_tab.posx[8]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[8]=Math.floor(Math.random() * (600-50))+50;
	  items_tab.assets[9]=images["heart_l"];
	  items_tab.posx[9]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[9]=Math.floor(Math.random() * (600-50))+50;
message_bull="Dans ce niveau, tu dois atteindre le grand oiseau tout en évitant \nles mouettes sur ton chemin… si tu souhaites préserver tes points de bien être!";
}

function level4_fn(){
levels_fn();
btn_intro_level.attr("cy", 500);
level=4;screen="* Level 4 *";
images["intro_lev4"].src="img/intro_lev4.png" ;
background=images["background4"];  
meter=images["meter4"];
count_bar=images["meter_bar"];
goal=images["moon"];
for (var i=0;i<5;i++){ 
      items_tab.assets[i]=images["fs"];
	  items_tab.posx[i]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[i]=Math.floor(Math.random() * (320-50))+50;
	}
	 for (var i=5;i<8;i++){ 
      items_tab.assets[i]=images["bat"];
	  items_tab.posx[i]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[i]=Math.floor(Math.random() * (320-50))+50;
	}
	  items_tab.assets[8]=images["luciole"];
	  items_tab.posx[8]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[8]=Math.floor(Math.random() * (600-50))+50;
	  items_tab.assets[9]=images["heart_l"];
	  items_tab.posx[9]=Math.floor(Math.random() * (2000-100))+100;
      items_tab.posy[9]=Math.floor(Math.random() * (600-50))+50;
message_bull="Dans ce dernier niveau, il va te falloir décrocher la lune !\n Attention aux chauves-souris, elles risquent de mordre ton ballon !";
}
function golden_seeds_fn(){
menu=false;
bonus=true;
hide_bull();
btn_tr1.attr("y", 2000);btn_tr2.attr("y", 2000);btn_lev1.attr("y", 2000);btn_lev2.attr("y", 2000);btn_lev3.attr("y", 2000);btn_lev4.attr("y", 2000);
btn_golden_seeds.attr("y", 2000);
btn_bn1.attr("y", 250);
btn_bn2.attr("y", 400);
btn_bn3.attr("y", 250);
btn_bn4.attr("y", 400);
screen="* BONUS *";
}

function bonus_fn(){
btn_bn1.attr("y", 2000);
btn_bn2.attr("y", 2000);
btn_bn3.attr("y", 2000);
btn_bn4.attr("y", 2000);
btn_intro_bonus.attr("cy", 500);
show_bull();
}

function updateLevel() {
levels=false;
btn_end_level.attr("cy", 480);
item1_x=10; item1_y=0; item2_x=200; item2_y=0; heart_m_x=710; heart_m_y=15;  screen_x=450; screen_y=40; points_x=110; points_y=40; points_st_x=300; points_st_y=40;menu_bar_y=0;
show_bull();
switch (level) {
case 1:
if(progression==1){progression ++;handy=450;handx=275;
lev1_btn=images["lev1ok_btn"];
lev2_btn=images["lev2_btn"];}
images["end_lev123"].src="img/end_lev123.png";
message_bull="Whaouh ! Tu as atteint les cieux ! Tu remportes ce premier niveau… \nAinsi que "+points+" pièces feng shui et "+points_st+" items spéciaux pour te récompenser\n et t’aider dans la croissance et l’entretien de ta plante !";
break;
case 2:
if(progression==2){progression ++;handy=450;handx=485;
lev2_btn=images["lev2ok_btn"];
lev3_btn=images["lev3_btn"];}
images["end_lev123"].src="img/end_lev123.png";
message_bull="Bravo! Tu remportes ce deuxième niveau… \nAinsi que "+points+" pièces  feng shui et "+points_st+" items spéciaux pour te récompenser\n et t’aider dans la croissance et l’entretien de ta plante !";
break;
case 3:
if(progression==3){progression ++;handy=450;handx=700;
lev4_btn=images["lev4_btn"];
lev3_btn=images["lev3ok_btn"];}
images["end_lev123"].src="img/end_lev123.png";
message_bull="Bravo ! Tu remportes ce troisième niveau… \nAinsi que "+points+" pièces feng shui et "+points_st+" items spéciaux!";
break;
case 4:
if(progression==4){progression ++;handy=450;handx=1000;
lev4_btn=images["lev4ok_btn"];}
images["end_lev4"].src="img/end_lev4.png";
message_bull="Bravo ! Tu remportes ce quatrième niveau… \nAinsi que "+points+" pièces feng shui et "+points_st+" items spéciaux !";
break;
default:
}
}

function cam() {

	try {
			compatibility.getUserMedia({video: true}, function(stream) {
				try {
					
					video.addEventListener('canplay', function() {
			  
			setTimeout(function() {
			video.play();
			backCanvas.width = 960 / 10;
	        backCanvas.height = 640 / 10;
	        backContext = backCanvas.getContext('2d');

			}, 500);
		}, true);
		
		video.src = compatibility.URL.createObjectURL(stream);
		myStream = stream;
		
				} catch (error) {
					video.src = stream;
				}
				video.play();
				 
			}, function (error) {
				alert("WebRTC not available");
			});
		} catch (error) {
			alert(error);
		}	
	//video.loop = video.muted = true;
	//video.load();
}

 function drawToCanvas() {
		 //requestAnimFrame(drawToCanvas);

			m = 10;
			w = 10;

			comp = ccv.detect_objects({
			canvas: backCanvas,
			cascade: cascade,
			interval: 1,
			min_neighbors: 1
		});
		if(tries==5){
		tries=0;images["end_tr"].src="img/end_tr.png";tr2_btn=images["tr2ok_btn"];btn_end_training.attr("cy", 470);handy=450;
		levels=false;
		item1_x=10; item1_y=0; item2_x=200; item2_y=0; heart_m_x=710; heart_m_y=15;  screen_x=450; screen_y=40; points_x=110; points_y=40; points_st_x=300; points_st_y=40;menu_bar_y=0;
		show_bull();message_bull="Bravo ! Tu as terminé cet entraînement !";
		switch (progression){case 1: handx=50;break;case 2:handx=275;break;case 3:handx=485;break;case 4:handx=700;break;case 5:handx=1000;break;}
		}
		if(background==images["background_b"]  && chrono<714){
		chrono+=0.2;
		 }
		  if(chrono>714){
		  chrono=714;
		  images["end_bn123"].src="img/end_bn123.png";
		  btn_end_bonus.attr("cy", 470);
		  show_bull();
		  levels=false;
		  item1_x=10; item1_y=0; item2_x=200; item2_y=0; heart_m_x=710; heart_m_y=15;  screen_x=450; screen_y=40; points_x=110; points_y=40; points_st_x=300; points_st_y=40;menu_bar_y=0;
		  if(bonus1==11){
		  bonus1=111;
		  message_bull="Whaouh ! Grâce à ton super souffle tu récolte "+points_bn+" pièces supplémentaires!";
		  }
		  if(bonus2==22){
		  bonus2=222;points+=points_bn;
		  message_bull="Whaouh ! Ton souffle est digne de celui de Superman!\n Tu gagnes "+points_bn+" pièces supplémentaires!";
		  }
		  if(bonus3==33){
		  bonus3=333;
		  message_bull="Whaouh! Tu n’as pas perdu ton âme d’enfant ni ton souffle!\n Tu gagnes "+points_bn+" pièces supplémentaires!";
		  }
		  if(bonus4==44){
		  bonus4=444;
		  message_bull="Whaouh! Tu n’as pas perdu ton âme d’enfant ni ton souffle!\n Tu gagnes "+points_bn+" pièces supplémentaires!";
		  }
		  }
		  context.strokeStyle = '#00ff00';
		 //context.fillStyle = "rgba(0, 0, 0, 0.1)";
			context.strokeRect((comp[0].x - w / 2) * m-170, (comp[0].y - w / 2) * m+400, (comp[0].width + w) * m+340, (comp[0].height + w) * m);
			if(comp[0].y<10 && comp[0].y>0){
			if(bonus2==22){
			items_tab.posx[1]+=3;
			if(items_tab.posx[1]>500){items_tab.assets[0]=images["treasure_o"];points_bn=10;}
			}else{
			up=true;
			right=true;
			mouseIsDown=true;
			setTimeout(engine_fn, 1000);
			}}
}
function engine_fn(){
up=false;down=false;right=false;left=false;mouseIsDown=false;
}	
		
function clearGameConsole(){
  context.clearRect(0, 0, 960, 640);
  // context.beginPath();
  // context.rect(0, 0, 960, 640);
  // context.closePath();
  // context.fill(); 
}

function renderGameConsole() {
  try {
    if(menu){
	context.drawImage(images["background_m"], 0, 0);
	context.drawImage(tr1_btn, 350, 170);
	context.drawImage(tr2_btn, 530, 170);
	context.drawImage(lev1_btn, 100, 350);
	context.drawImage(lev2_btn, 320, 350);
	context.drawImage(lev3_btn, 535, 350);
	context.drawImage(lev4_btn, 750, 350);
	context.drawImage(images["hand"], handx, handy);
	context.drawImage(images["golden_seeds"], 285, 525);
	}
	
    if(levels){
    context.drawImage(background, bgx, bgy, 960, 640, 0, 0, canvas.width, canvas.height);
		
context.beginPath();
context.moveTo(0, 400);
context.lineTo(960, 400);
context.lineWidth = 3;
context.strokeStyle = '#ff0000';
context.stroke();
context.closePath();

context.drawImage(images["back_trees"], -960+vx2, -40);
context.drawImage(images["back_trees"], vx2, -40);
context.drawImage(images["back_trees"], 960+vx2, -40);
context.drawImage(images["ground"], -960+vx, 0);
context.drawImage(images["ground"], vx, 0);
context.drawImage(images["ground"], 960+vx, 0);

context.drawImage(goal, goalx, goaly);
		
if(!bonus && !training){

	if(level==1){
	for (var i=5;i<8;i++){ 
context.drawImage(items_tab.assets[i], items_tab.posx[i], items_tab.posy[i]);
if (items_tab.posx[i] + items_tab.assets[i].width <= 0 && right) {
     // items_tab.posx[i]=Math.floor(Math.random() * 960) + 960;
    //  items_tab.posy[i]=Math.floor(Math.random() * 320);
    }else if (items_tab.posx[i] + items_tab.assets[i].width >= 960 && left) {
	//  items_tab.posx[i]=Math.floor(Math.random() * 960) - 960;
    //  items_tab.posy[i]=Math.floor(Math.random() * 320);
	}
}
	 } 
	if(level==2){
 for (var i=5;i<8;i++){ 
context.drawImage(items_tab.assets[i],0,196 * actualFrame, 197, 196, items_tab.posx[i], items_tab.posy[i], 197, 196);
}
}	 
      if(level==3){	  
	 for (var i=5;i<8;i++){ 
context.drawImage(items_tab.assets[i],0,59 * actualFrame, 75, 59, items_tab.posx[i], items_tab.posy[i], 75, 59);
if(items_tab.posx[i]>=0){
items_tab.posx[i]-=3;}else{
 items_tab.posx[i]=960;
 
	  //context.save();
	  //context.translate(canvas.width, 0);
	  //context.scale(-1, 1);
	 
	  //context.drawImage(items_tab.assets[i], -items_tab.assets[i].width/2,-items_tab.assets[i].width/2);
	  //context.restore();
	  } 
}

}	 
	 if(level==4){
	 for (var i=5;i<8;i++){ 
context.drawImage(items_tab.assets[i],0,80 * actualFrame, 153, 80, items_tab.posx[i], items_tab.posy[i], 153, 80);
}
} 

for (var i=0;i<5;i++){ 
context.drawImage(items_tab.assets[i], items_tab.posx[i], items_tab.posy[i]);
if (items_tab.posx[i] + items_tab.assets[i].width <= 0 && right) {
    //  items_tab.posx[i]=Math.floor(Math.random() * 960) + 960;
     // items_tab.posy[i]=Math.floor(Math.random() * 320);
    }else if (items_tab.posx[i] + items_tab.assets[i].width >= 960 && left) {
	//  items_tab.posx[i]=Math.floor(Math.random() * 960) - 960;
    //  items_tab.posy[i]=Math.floor(Math.random() * 320);
	}
}

context.drawImage(items_tab.assets[8], items_tab.posx[8], items_tab.posy[8]);
context.drawImage(items_tab.assets[9], items_tab.posx[9], items_tab.posy[9]);

}

if(screen=="* BONUS 1 *" || screen=="* BONUS 2 *" || screen=="* BONUS 3 *" || screen=="* BONUS 4 *" || screen=="* Training 2 *"){
 for (var i=0;i<items_tab.assets.length;i++){ 
	context.drawImage(items_tab.assets[i], items_tab.posx[i], items_tab.posy[i]);
     }
}

context.drawImage(images["menu_bg"], 660, 0);	
context.drawImage(images["pause"], 675, 10);
context.drawImage(images["relaxair"], 750, 10,100,89);
context.drawImage(meter, 710, 297);
context.strokeRect(730,110,160,120);

	if(myStream!=null){
	backContext.drawImage(video, 0, 0, backCanvas.width, backCanvas.height);
	// context.save();	
	 // context.globalAlpha=0.1;
	// context.translate(canvas.width, 0);
	//context.scale(-1, 1);
		context.drawImage(video, 730, 110, 160, 120);
		// context.restore();
		}
        // gaugex = 40*Math.cos(gaugei*(Math.PI/180)) + 475;
        // gaugey = 40*Math.sin(gaugei*(Math.PI/180)) + 630;
 
        // context.strokeStyle = "#D40000";
        // context.fillStyle = "#D40000";
        // context.lineWidth = 2;
        // context.beginPath();
        // context.moveTo(475, 630); 
        // context.lineTo(gaugex, gaugey); 
        // context.stroke();
		// context.closePath();
		context.drawImage(images["speedometer"], 760, 250);
		context.strokeStyle = "#FF0000";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo( centerX, centerY );
        context.lineTo( needleHashes[speed].x, needleHashes[speed].y );
        context.closePath();
        context.stroke();

	if(!bonus){context.drawImage(images["balloon"], 907+distance, 310, 17, 20);}
	
	
	if(training){
    context.drawImage(images["tries"], 750, 575);
    context.fillStyle = "#000000";
    context.font = "bold 24px Calibri";
    context.fillText(tries+"/5", 775, 610);}
	
    context.save();	
	
	context.beginPath(); //context.fillRect(chrono,343,200,4);
	if(bonus){context.rect(chrono,333,200,4);}
	else{context.rect(714+distance,333,200,4);}
	context.clip(); 
	context.closePath();
	context.drawImage(count_bar, 714, 333, count_bar.width, count_bar.height);
	context.restore();    
}

if(images["intro_tr1"].src!=location.href+"img/spacer.png"){context.drawImage(images["intro_tr1"], 0, 0);
drawString(context, "Entraînement : Observation",380,180,'#92d050',0,"Calibri",20);}

if(images["intro_tr2"].src!=location.href+"img/spacer.png"){context.drawImage(images["intro_tr2"], 0, 0);
drawString(context, "Entraînement : A toi de jouer !",370,180,'#92d050',0,"Calibri",20);}

if(screen=="* Training 1 *"){
	context.drawImage(images["demo"+demo], 0, 0);
}

if(images["end_tr"].src!=location.href+"img/spacer.png"){
context.drawImage(images["end_tr"], 0, 0);
drawString(context, "Félicitations !",440,200,'#000',0,"Calibri",18);
}

	if(images["intro_lev1"].src!=location.href+"img/spacer.png"){context.drawImage(images["intro_lev1"], 0, 0);}
	if(images["intro_lev2"].src!=location.href+"img/spacer.png"){context.drawImage(images["intro_lev2"], 0, 0);}
	if(images["intro_lev3"].src!=location.href+"img/spacer.png"){context.drawImage(images["intro_lev3"], 0, 0);}
	if(images["intro_lev4"].src!=location.href+"img/spacer.png"){context.drawImage(images["intro_lev4"], 0, 0);}

	if(images["end_lev123"].src!=location.href+"img/spacer.png"){
	context.drawImage(images["end_lev123"], 0, 0);
	if(level==1){context.drawImage(images["lev1_btn"], 430, 200);}
	if(level==2){context.drawImage(images["lev2_btn"], 430, 200);}
	if(level==3){context.drawImage(images["lev3_btn"], 430, 200);}
	drawString(context, "Félicitations !",440,180,'#000',0,"Calibri",18);
	context.fillText(points, 500, 400);
	context.fillText(points_st, 500, 467);
	}
	if(images["end_lev4"].src!=location.href+"img/spacer.png"){
	context.drawImage(images["end_lev4"], 0, 0);
	if(level==4){context.drawImage(images["lev4_btn"], 430, 200);}
	drawString(context, "Félicitations !",440,180,'#000',0,"Calibri",18);
	context.fillText(points, 500, 400);
	context.fillText(points_st, 500, 467);
	}
    if(screen=="* BONUS *"){
	context.drawImage(images["background_m"], 0, 0);
	context.drawImage(bn1, 50, 250);
	context.drawImage(bn2, 300, 400);
	context.drawImage(bn3, 550, 250);
	context.drawImage(bn4, 800, 400);
	drawString(context, "BONUS",380,120,'#77933c',0,"Berlin Sans FB Demi",70);
	}
	
	if(grow==1){context.drawImage(images["grow"], 0, 0);}
	
	if(bonus1==11){context.drawImage(images["intro_bn1"], 0, 0);}
	if(bonus2==22){context.drawImage(images["intro_bn2"], 0, 0);}
	if(bonus3==33){context.drawImage(images["intro_bn3"], 0, 0);}
	if(bonus4==44){context.drawImage(images["intro_bn4"], 0, 0);}
	
	if(bonus1==111 || bonus2==222 || bonus3==333 || bonus4==444){
	context.drawImage(images["end_bn123"], 0, 0);
	drawString(context, "Tu as remporté :",440,200,'#000',0,"Calibri",18);
	context.fillStyle = "#84582c";
	context.font = "bold 38px Showcard Gothic";
	context.fillText(points_bn, 530, 340);
	}

	context.drawImage(images["master"], 30, 70);
	context.drawImage(images["bull"], 170, 60);
	drawString(context, message_bull,230,85,'#fff',0,"Calibri",16);
	
	if(levels && bonus2!=22){
	if(level==4 && bonus4!=44 && training==false){
	context.save();
	radgrad = context.createRadialGradient(x, y, 70, x, y, 40);
	context.globalCompositeOperation = "destination-out";
	context.beginPath();
    context.arc(x, y, 70, 0, Math.PI * 2, true);
	context.shadowBlur = 40;
    context.shadowColor = "black";
		
    radgrad.addColorStop(Math.random() * 1, "rgba(0,0,0," + (Math.random() * 1) + ")");

    context.fillStyle = radgrad;
    context.fill();
    context.restore();	
	}		
	context.save();
	context.translate(x , y );
	context.rotate(angle * Math.PI / 180); 
	context.translate(-x , -y );
	context.drawImage(balloon, x - balloon.width / 2, y - balloon.height / 2);
	context.restore();
	
	context.drawImage(images["paf"], x - 123 / 2, y - 115 / 2);
	context.drawImage(images["gameover"], 250, 270);
	}
	
	context.drawImage(images["menu_bar"], 0, menu_bar_y);
	context.drawImage(images["item1"], item1_x, item1_y);
	context.drawImage(images["item2"], item2_x, item2_y);
	context.drawImage(images["menu_button"], 860, 20);
	context.drawImage(images["heart_m"], 0,34 * heartFrame,129,34,heart_m_x,heart_m_y,129,34);
	drawString(context, screen,screen_x,screen_y,'#fff',0,"Berlin Sans FB Demi",20);
	context.fillStyle = "#84582c";
    context.font = "bold 18px Showcard Gothic";
	context.fillText(points, points_x, points_y);
	context.fillText(points_st, points_st_x, points_st_y);
	
    distance=Math.round(-goalx/10);
	angle *= friction;
	x+=x_speed;
	y+=y_speed;
	x_speed*=friction;
	y_speed*=friction;
		 
	if(y>430 && bgy<0){}else{y_speed+=gravity;}
	
	        if (y_speed > maxspeed) 
				{y_speed = maxspeed;}
			else if (y_speed < -maxspeed)
				{y_speed = -maxspeed;}
				
			if (x_speed > maxspeed)
				{x_speed = maxspeed;}
			else if (x_speed < -maxspeed)
				{x_speed = -maxspeed;}
				
if(x>660){
x=660;
x_speed*=-1;
    }
if(x<0){
x=0;
x_speed*=-1;
    }
if(y>580){
y=580;
y_speed*=-1;
    }
if(y<60){
y=60;
y_speed*=-1;
    }
	 
	if (interval == 30 ) {
			if (actualFrame == 1) {
				actualFrame = 0;	
			}
			else {
				actualFrame++;
			}
			interval = 0;
		}
		interval++;	
		
    }catch (e) {
  };
}

function updatePlayer() {
if(gameover==false && bonus2!=22){
    if (right) {
    if(x>330 && Math.abs(course)<=2000){deplace_right();}else{x_speed+=2;}   
	if(angle<10){angle++;}
    }
    if (left) {
    if(x<330 && Math.abs(course)>4){deplace_left();}else{x_speed-=2;}
	if(angle>-10){angle--;}
    }   
    if (up) {
    y_speed-=0.3;//if(y<430 && bgy>0){ }else{}
    } 
    if (down) {
    y_speed+=0.3;//if(y>430 && bgy<640){bgy += 3;deplace_down(3);}else{}
    } 	
	if(mouseIsDown){
            if(speed < needleHashes.length - 1) speed += 1;   
        }
        else {
           if(speed > 1) speed -= 2; 
        }
	// if(bgy<0){bgy=0;}
	// if(bgy>640){bgy=640;}
}
}

  function deplace_right()
 { 
 	if (Math.abs(vx) > 960) {
    vx = 0;
}
if (Math.abs(vx2) > 960) {
    vx2 = 0;
}
 for (i=0;i<items_tab.assets.length;i++){ 
	 items_tab.posx[i] -=4;
	}
vx -= 4;
vx2 -= 2;
goalx -=4;course -=4;
	 }
  function deplace_left()
 { 
 	if (Math.abs(vx) > 960) {
    vx = 0;
}
if (Math.abs(vx2) > 960) {
    vx2 = 0;
}
 for (i=0;i<items_tab.assets.length;i++){ 
	 items_tab.posx[i] +=4;
	}
vx += 4;
vx2 += 2;
goalx +=4;course +=4;
	 }

function collides(a, b, bx, by) {
  return x < bx + b.width/2 &&
         x + a.width/2 > bx &&
         y < by + b.height/2 &&
         y + a.height/2 > by;
}
function handleCollisions() {
       for (var i=0;i<items_tab.assets.length;i++){ 
	if (collides(balloon, items_tab.assets[i], items_tab.posx[i], items_tab.posy[i])) {

        if(items_tab.assets[i]==images["fs"]&& chrono<714){items_tab.posy[i]=2000;if(!bonus){points ++;}else{points ++;points_bn ++;}
		if(first_time_fs){first_time_fs=false;show_bull();
		message_bull="Génial! Tu as attrapé une pièce feng shui !\nRécupère-en le plus possible. Elles te serviront dans la pousse\n et l'entretien de ta plante.";}}
		
		if(items_tab.assets[i]==images["terre"]){items_tab.posy[i]=2000;show_bull();bonus1=1;bn1=images["bn1_b"];
		message_bull="Super! Tu as attrapé l'item spécial sac de terre !\nGarde le précieusement. Il te servira dans la pousse\n et l'entretien de ta plante. ";}
		
		if(items_tab.assets[i]==images["bois"]){items_tab.posy[i]=2000;show_bull();bonus2=2;bn2=images["bn2_b"];
		message_bull="Super! Tu as attrapé l'item spécial bois d'arbre !\nGarde le précieusement. Il te servira dans la pousse\n et l'entretien de ta plante. ";}
		
		if(items_tab.assets[i]==images["engrais"]){items_tab.posy[i]=2000;show_bull();bonus3=3;bn3=images["bn3_b"];
		message_bull="Super! Tu as attrapé l'item spécial engrais organique !\nGarde le précieusement. Il te servira dans la pousse\n et l'entretien de ta plante. ";}
		
		if(items_tab.assets[i]==images["luciole"]){items_tab.posy[i]=2000;show_bull();bonus4=4;bn4=images["bn4_b"];
		message_bull="Super! Tu as attrapé l'item spécial luciole !\nGarde le précieusement. Il te servira dans la pousse\n et l'entretien de ta plante. ";}
		
		if(items_tab.assets[i]==images["heart_l"] && heartFrame>0){items_tab.posy[i]=2000;heartFrame -=1;show_bull();
		message_bull="Super! En maîtrisant ta respiration tu viens de gagner \nun point de bien-être!";}
		
		if(items_tab.assets[i]==images["cloud2"] || items_tab.assets[i]==images["bird"] || items_tab.assets[i]==images["bat"]){items_tab.assets[i]=images["spacer"];if(heartFrame<2){heartFrame +=1;images["paf"].src="img/paf.png";setTimeout(paf_fn, 1000);}else{heartFrame +=1;images["paf"].src="img/paf.png";hitFrame=true;images["gameover"].src="img/gameover.png";btn_gameover.attr("y", 270);gameover=true;}
		if(first_time_cloud2){first_time_cloud2=false;show_bull();
		message_bull="Attention !Au contact du ballon, les nuages lancent des éclairs\n qui te font perdre des points de bien-être… et diminuent tes chances\n d’obtenir un bonus à la fin du niveau !";}
		}
      }
	 }  
	 if (collides(balloon, goal, goalx+100, goaly)) {if(goal==images["balloon_t"]){items_tab.posy[i]=2000;tries ++;init_items();}else{updateLevel();}}
}

function paf_fn(){
images["paf"].src="img/spacer.png";
}
  window.addEventListener('mousedown', function(e) {
  if(levels==true){
	 if(e.pageX>x+160){right=true;}else{left=true;}
	 if(e.pageY>y+30){down=true;}else{up=true;}
	 mouseIsDown = true;
	 }
  }, false);

  window.addEventListener('mouseup', function(e) {
     up=false;down=false;right=false;left=false;mouseIsDown = false;
  }, false);
  
document.onkeydown = function(event) {
     var key_pressed; 
	  mouseIsDown = true;
     if(event == null){
          key_pressed = window.event.keyCode; 
     }
     else if(levels==true){
          key_pressed = event.keyCode; 
     }
     switch(key_pressed){
          case 37:
               left=true;
               break; 
          case 38:
               up=true;
               break; 
          case 39:
               right=true;
               break;
          case 40:
               down=true;
               break; 
     } 
}
 
document.onkeyup = function(event) {
     var key_pressed;
 mouseIsDown = false;	 
     if(event == null){
          key_pressed = window.event.keyCode; 
     }
     else {
          key_pressed = event.keyCode; 
     }
     switch(key_pressed){
          case 37:
               left=false;
               break; 
          case 38:
               up=false;
               break; 
          case 39:
               right=false;
               break;
          case 40:
               down=false;
               break; 
     } 
}

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() { 
      resourceLoaded();
  }
  images[name].src = "img/" + name + ".png";
}

function resourceLoaded() {
  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
  clearInterval(loading);clearGameConsole();
  tr1_btn=images["tr1_btn"];tr2_btn=images["tr2_btn"];
  lev1_btn=images["lev1_btn"];lev2_btn=lev3_btn=lev4_btn=images["lev_closed"];
  bn1=images["bn1_a"];bn2=images["bn2_a"];bn3=images["bn3_a"];bn4=images["bn4_a"];
  images["intro_tr1"].src="img/spacer.png";
  images["intro_tr2"].src="img/spacer.png";
  images["end_tr"].src="img/spacer.png";
  images["intro_lev1"].src="img/spacer.png";
  images["intro_lev2"].src="img/spacer.png";
  images["intro_lev3"].src="img/spacer.png";
  images["intro_lev4"].src="img/spacer.png";
  images["end_lev123"].src="img/spacer.png";
  images["end_lev4"].src="img/spacer.png";
  images["gameover"].src="img/spacer.png";
  images["paf"].src="img/spacer.png";
  balloon=images["balloon"];
  raph();
  animate();
  }
}

function animate() {
request = requestAnimFrame(animate);
 // window.setTimeout( animate, 1000 / 60 );
    updatePlayer(); 
    renderGameConsole();  
	if(levels){
	handleCollisions(); 
	drawToCanvas();
	}
}

function drawString(ctx, text, posX, posY, textColor, rotation, font, fontSize) {
				var lines = text.split("\n");
				if (!rotation) rotation = 0;
				if (!font) font = "'serif'";
				if (!fontSize) fontSize = 16;
				if (!textColor) textColor = '#000000';
		 		ctx.save();
		 		ctx.font = fontSize + "px " + font;
		 		ctx.fillStyle = textColor;
		 		ctx.translate(posX, posY);
		 		ctx.rotate(rotation * Math.PI / 180);
				for (i = 0; i < lines.length; i++) {
			 		ctx.fillText(lines[i],0, i*fontSize);
				}
		 		ctx.restore();
		 	}
 
    
    function getNPointsOnCircle( x, y, radius, n) {
        // Found out the spacing of each point based on n points in 360 degrees
        var hashSpacing = Math.PI * 2 / n;
        var points = [];
        
        // For each point of n, find it's position based on the given radius and starting x, y
        for( var i = 0; i < n; i++ ){
            var a = hashSpacing * i;
            points.push( { x: x + Math.cos( a ) * radius, y: y + Math.sin( a ) * radius } );
        } 
        
        return points;
    }    
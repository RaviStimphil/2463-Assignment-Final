let connectButton;
let port;
let writer, reader;
let joySwitch;
let onLight = 0;
let onLightBlue = 0;
let onLightRed = 0;
let onLightGreen = 0;
let pressing = [0, 0, 0];
let pointLock = [0, 0, 0];
let pressLock = [false, false, false];
let pointBoost = 0;

let spritesheetRed;
let spritedataRed;
let spritesheetBlue;
let spritedataBlue;
let spritesheetGreen;
let spritedataGreen;

let idleRed = [];
let attackRed = [];
let idleBlue = [];
let attackBlue = [];
let idleGreen = [];
let attackGreen = [];
let space = false;
let timer = [0, 0, 0];
let trueStart = false;

let initTone = true;
let pitch = 500;
const synthBack1 = new Tone.MembraneSynth(
  {
    
    volume : -15
  }
).toDestination();
const synthBack2 = new Tone.Synth({
  envelope : {
  attack : 0.005 ,
  decay : 0.3 ,
  sustain : 0.2 ,
  release : 0.4
  },
  volume : -20
}
  ).toDestination();
const synthBack3 = new Tone.Synth({
  envelope : {
  attack : 0.9 ,
  decay : 0.3 ,
  sustain : 0.3 ,
  release : 0.5
  },
  volume : -30
  }
  ).toDestination(
  
);
const synthBack4 = new Tone.Synth({
  envelope : {
  attack : 0.4 ,
  decay : 0.3 ,
  sustain : 0.3 ,
  release : 0.5
  },
  volume : -30
  }
  ).toDestination(
  
);

const synthBack12 = new Tone.MembraneSynth(
  {
    
    volume : 0
  }
).toDestination();
const synthBack22 = new Tone.Synth({
  envelope : {
  attack : 0.005 ,
  decay : 0.3 ,
  sustain : 0.2 ,
  release : 0.4
  },
  volume : 0
}
  ).toDestination();
const synthBack32 = new Tone.Synth({
  envelope : {
  attack : 0.9 ,
  decay : 0.3 ,
  sustain : 0.3 ,
  release : 0.5
  },
  volume : -10
  }
  ).toDestination(
  
);
const synthBack42 = new Tone.Synth({
  envelope : {
  attack : 0.4 ,
  decay : 0.3 ,
  sustain : 0.3 ,
  release : 0.5
  },
  volume : -10
  }
  ).toDestination(
  
);
const synthBack13 = new Tone.MembraneSynth(
  {
    
    volume : 0
  }
).toDestination();
const synthBack23 = new Tone.Synth({
  envelope : {
  attack : 0.005 ,
  decay : 0.3 ,
  sustain : 0.2 ,
  release : 0.4
  },
  volume : -10
}
  ).toDestination();
const synthBack33 = new Tone.Synth({
  envelope : {
  attack : 0.9 ,
  decay : 0.3 ,
  sustain : 0.3 ,
  release : 0.5
  },
  volume : -15
  }
  ).toDestination(
  
);
const synthBack43 = new Tone.Synth({
  envelope : {
  attack : 0.4 ,
  decay : 0.3 ,
  sustain : 0.3 ,
  release : 0.5
  },
  volume : -20
  }
  ).toDestination(
  
);

const encoder = new TextEncoder();
const decoder = new TextDecoder();

let stateGame = "Start"

let sensorData = {};

let x = 0;
let force = 1;
let myPoint = 0;
let health = 10;
let lineX = 150;
let jazz = [150, 200, 250, 150, 200, 250, 0];
let pointCheck = true;
let printedValue = "";
let circleSwarm = [];
let num = 0;
let thing = 0;
let spawnCount = 0;
let spawnTye = 0;
let spawnTimer = 60;
let drawRandom;
let randomStore;
let placement = [];
spriteSheetFileNames = ["SpelunkyGuy-SpriteSheet.png","SpelunkyGreen-SpriteSheet.png", "BlueGuyOne.png"];
let spriteSheet = [spriteSheetFileNames.length];

function preload(){
  spritedataRed = loadJSON('assets/RedDudeOne.json');
  spritesheetRed = loadImage('assets/RedDudeOne.png');
  spritedataGreen = loadJSON('assets/GreenGalOne.json');
  spritesheetGreen = loadImage('assets/GreenGalOne.png');
  spritedataBlue = loadJSON('assets/BlueGuyOne.json');
  spritesheetBlue = loadImage('assets/BlueGuyOne.png');


}
const loopBack1 = new Tone.Loop(time => {
  synthBack1.triggerAttackRelease("A1", "2n", time);
}, "2n").start("2n");///*
const loopBack2 = new Tone.Loop(time => {
  synthBack2.triggerAttackRelease("G2", "2n", time);
}, "2n").start("4n");
const loopBack3 = new Tone.Loop(time => {
  synthBack3.triggerAttackRelease("C6", "8n", time);
}, "4n").start("8n");
const loopBack4 = new Tone.Loop(time => {
  synthBack3.triggerAttackRelease("F5", "16n", time);
}, "2n").start("4n");
function setup() {
  createCanvas(600, 400);

  
  
  placement = [65, 83, 68, 100, 200, 300];
  circleSwarm = [];
  imageMode(CENTER);
  angleMode(DEGREES);

  if ("serial" in navigator) {
    // The Web Serial API is supported
     connectButton = createButton("connect");
     connectButton.position(10, 10);
     connectButton.mousePressed(connect);
 
   }
   imageMode(CENTER);
   let storeRed = spritedataRed.frames;
   let stockRed = spritedataRed.attack;
   let storeGreen = spritedataGreen.frames;
   let stockGreen = spritedataGreen.attack;
   let storeBlue = spritedataBlue.frames;
   let stockBlue = spritedataBlue.attack;
 
 
   for( let i = 0; i < storeRed.length; i++){
     let pos = storeRed[i].position;
     let img = spritesheetRed.get(pos.x, pos.y,pos.w, pos.h);
     idleRed.push(img);
   }
   
   for( let i = 0; i < 3; i++){
     let pos1 = stockRed[i].position;
     let img1 = spritesheetRed.get(pos1.x, pos1.y,pos1.w, pos1.h);
     attackRed.push(img1);
   }
   for( let i = 0; i < 2; i++){
     let pos = storeGreen[i].position;
     let img = spritesheetGreen.get(pos.x, pos.y,pos.w, pos.h);
     idleGreen.push(img);
   }
   for( let i = 0; i < 3; i++){
     let pos1 = stockGreen[i].position;
     let img1 = spritesheetGreen.get(pos1.x, pos1.y,pos1.w, pos1.h);
     attackGreen.push(img1);
   }
   for( let i = 0; i < 2; i++){
     let pos = storeBlue[i].position;
     let img = spritesheetBlue.get(pos.x, pos.y,pos.w, pos.h);
     idleBlue.push(img);
   }
   for( let i = 0; i < 3; i++){
     let pos1 = stockBlue[i].position;
     let img1 = spritesheetBlue.get(pos1.x, pos1.y,pos1.w, pos1.h);
     attackBlue.push(img1);
   }
}

function draw() {

  background(220);
  switch(stateGame) {
  case "Play":
  
  pointLock[0]++;
  pointLock[1]++;
  pointLock[2]++;
  for(let i=0; i < circleSwarm.length; i++) {
    circleSwarm[i].draw();
  }
  x = x + 4 * force;
  if(pointBoost >= 10){
    myPoint = myPoint + 5;
    pointBoost = 0;
  }
  
  if(x <= 0){
    force = 1;
  }
  if(x >= 400){
    force = -1;
  }
  if(x < 160 || x > 240){
    pointCheck = true;
  }
  fill(0);
  textSize(20);
  text("Score: " + myPoint * 10, 400, 65);
  text("HP: " + health * 10, 400, 40);
 
  line(lineX,0,lineX,400);
  if(spawnTye < spawnTimer){
    spawnTye++;
  }
  else{
    if(floor(random(0,5)) == 0){
      drawRandom = floor(random(0,3));
      randomStore = drawRandom;
      circleSwarm[num] = new noteCircle(2000, placement[drawRandom + 3],placement[drawRandom], placement[drawRandom + 6]);
      num++;
      while(drawRandom == randomStore){
        drawRandom = floor(random(0,3));
      }
      circleSwarm[num] = new noteCircle(2000, placement[drawRandom + 3],placement[drawRandom], placement[drawRandom + 6]);
      num++;
      spawnTye = 0;
    }
    else{
      randomStore = drawRandom;
      circleSwarm[num] = new noteCircle(2000, placement[drawRandom + 3],placement[drawRandom], placement[drawRandom + 6]);
      num++;
      spawnTye = 0;
    }
    
  }
  if(frameCount % 200 == 0){
    onLight = 0;
    onLightGreen = 0;
    onLightBlue = 0;
    onLightRed = 0;
    print(pressLock[1]);
    
    print(onLight);
  }

  else if(pressing[0] == 0  && pointLock[0] > 40){
    pressLock[0] = true;
    pointLock[0] = 0;
  }
  if(pressing[1] == 0  && pointLock[1] > 40){
    pressLock[1] = true;
    pointLock[1] = 0;
  }
  if(pressing[2] == 0  && pointLock[2] > 40){
    pressLock[2] = true;
    pointLock[2] = 0;
  }
 if (reader) {
   serialRead();
 }
 
  //Red
  if(pressLock[0] == false){
    image(idleRed[floor(frameCount / 8) % 2],75,100,100,100);
  }else{
    image(attackRed[floor(timer[0] / 4) % 3],75,100,100,100);
    timer[0]++;
  }
  if(timer[0] / 4 >= attackRed.length){
    timer[0] = 0;
    onLightRed = 0;
    pressLock[0] = false;
  }
  //Green
  if(pressLock[1] == false){
    image(idleGreen[floor(frameCount / 8) % 2],75,200,100,100);
  }else{
    image(attackGreen[floor(timer[1] / 4) % 3],75,200,100,100);
    timer[1]++;
  }
  if(timer[1] / 4 >= attackRed.length){
    timer[1] = 0;
    onLightGreen = 0;
    pressLock[1] = false;
  }
  //Blue
  if(pressLock[2] == false){
    image(idleBlue[floor(frameCount / 8) % 2],75,300,100,100);
  }else{
    image(attackBlue[floor(timer[2] / 4) % 3],75,300,100,100);
    timer[2]++;
  }
  if(timer[2] / 4 >= attackRed.length){
    timer[2] = 0;
    onLightBlue = 0;
    pressLock[2] = false;
  }
  if (writer) {
   writer.write(encoder.encode(onLight + "," + onLightBlue + "," + onLightRed + "," + onLightGreen + "\n"))
 }
 pressing[0] = sensorData.redPress;
 pressing[1] = sensorData.greenPress;
 pressing[2] = sensorData.bluePress;

 if(health <= 0){
  stateGame = "Over";
 }
  break;
  case "Start":
  
  background(235);
  fill(20);
  textSize(40);
  text("Whack a Note",175,300);
  textSize(30);
  text("Press space to start",155,200);
  image(idleGreen[floor(frameCount / 16) % 2],275,100,100,100);
  image(idleRed[floor(frameCount / 16) % 2],475,200,100,100);
  image(idleBlue[floor(frameCount / 16) % 2],75,200,100,100);
  break;

  case "Over":
  fill(0);
  text("Game Over man, game over.", 200,200);
  text("Here's your score: " + myPoint * 10, 200,250);
  break;

  }
 

 
}

function keyPressed(){
  switch(stateGame){
    case "Start":
      if (keyCode === 32 && initTone === true) {
        console.log('spacebar pressed');
        Tone.start();
        initTone = false;
        Tone.Transport.start();
        stateGame = "Play"
      }
      break;
    case "Play":
      if(trueStart == false){
        health = 10;
        myPoint = 0;
        trueStart = true;
      }
    break;
    case "Over":
      if (keyCode === 32) {
        initTone = false;
        Tone.Transport.start();
        myPoint = 0;
        health = 10;

        stateGame = "Play"
      }
    break;
  }
  
  
  printedValue = keyCode;
  print(printedValue);
}

class noteCircle{
  constructor(x, y, codeKey){
    this.x = x;
    this.y = y;
    this.radius = 80;
    this.codeOpen = true;
    this.direct = -1;
    this.codeKey = codeKey;
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    this.pass = false;
  }

  draw(){
    this.x = this.x + 5 * this.direct;
    if(this.codeKey == 65){
      this.red = 255;
    }
    else if(this.codeKey == 83){
      this.green = 255;
    }
    else if(this.codeKey == 68){
      this.blue = 255;
    }
    fill(this.red, this.green, this.blue);
    circle(this.x, this.y, this.radius);
    
    if(this.x < lineX - this.radius/2 || this.x > lineX + this.radius/2){
      this.codeOpen = true;

    }
    if(this.codeKey == 65){
      if(pressLock[0] == true){
        print(this.codeOpen);
        if(this.x > lineX - this.radius/2 && this.x < lineX + this.radius/2 && this.codeOpen == true){
          this.codeOpen = false;
          myPoint++;
          pointBoost++;
          synthBack22.triggerAttackRelease("G2", "1n");
          onLightRed = 1;
          this.red = 255;
          this.green = 255;
          this.blue = 255;
        }
        else{
          pointLock[0] = 0;
        }
      }
    }
    if(this.codeKey == 83){
      if(pressLock[1] == true){
        print(this.codeOpen);
        if(this.x > lineX - this.radius/2 && this.x < lineX + this.radius/2 && this.codeOpen == true){
          this.codeOpen = false;
          synthBack32.triggerAttackRelease("F5", "8n");
          synthBack42.triggerAttackRelease("C6", "4n");
          myPoint++;
          pointBoost++;
          onLightGreen = 1;
          this.red = 255;
          this.green = 255;
          this.blue = 255;
        }
        else{
          pointLock[1] = 0;
        }
      }
    }
    if(this.codeKey == 68){
      if(pressLock[2] == true){
        print(this.codeOpen);
        if(this.x > lineX - this.radius/2 && this.x < lineX + this.radius/2 && this.codeOpen == true){
          this.codeOpen = false;
          synthBack12.triggerAttackRelease("A1", "1n");
          myPoint++;
          pointBoost++;
          onLightBlue = 1;
          this.red = 255;
          this.green = 255;
          this.blue = 255;
        }
        else{
          pointLock[2] = 0;
        } 
      }
    }
    if(this.x < 0 && (this.red == 0 || this.green == 0 || this.blue == 0) && this.pass == false){
      pointCheck = 0;
      health--;
      this.pass = true;
      if(this.codeKey == 65){
        synthBack23.triggerAttackRelease("G4", "2n");
      }
      if(this.codeKey == 83){
        synthBack33.triggerAttackRelease("F4", "8n");
        synthBack43.triggerAttackRelease("C7", "4n");
      }
      if(this.codeKey == 68){
        synthBack13.triggerAttackRelease("A2", "2n");
      }
    }
    
  }

}



async function serialRead() {
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    sensorData = JSON.parse(value);
  }
 }
 
 
 async function connect() {
  port = await navigator.serial.requestPort();
 
 
  await port.open({ baudRate: 9600 });
 
 
  writer = port.writable.getWriter();
 
 
  reader = port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .getReader();
 }
 
 
 
 
 class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.chunks = "";
  }
 
  transform(chunk, controller) {
    // Append new chunks to existing chunks.
    this.chunks += chunk;
    // For each line breaks in chunks, send the parsed lines out.
    const lines = this.chunks.split("\n");
    this.chunks = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }
 
  flush(controller) {
    // When the stream is closed, flush any remaining chunks out.
    controller.enqueue(this.chunks);
  }
 }
import 'phaser';
 
export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }
 
  preload () {
   
    this.timedEvent = this.time.delayedCall(1000, this.ready, [], this);

     // load assets needed in our game
     this.load.image('background', '../../src/assets/background.png');
     this.load.atlas('cards', '../../src/assets/cards.png', '../../src/assets/cards.json');
     this.load.atlas('assets', '../../src/assets/assets.png', '../../src/assets/assets.json');
     this.load.atlas('coins', '../../src/assets/coins.png', '../../src/assets/coins.json');
     this.load.bitmapFont("font", "../src/assets/font.png", "../src/assets/font.fnt");

    //  this.load.audio('music', '../src/assets/music.mp3');
    //  this.load.audio('cardmove', '../src/assets/cardmove.mp3');
    //  this.load.audio('buttonPressed', '../src/assets/buttonPressed.mp3');
  }
 
  create () {
  }

  init () {
    this.readyCount = 0;
  }
  
  ready () {    
    this.readyCount++;
    if (this.readyCount === 1) {
      this.scene.start('Game');
    }
  }
};
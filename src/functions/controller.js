import config from '../kernel/config';
import {returnDoneX, returnDoneY} from '../kernel/helpers';


export default class Controller {
  constructor (scene/*, {deck, onTable}*/) {
    this.scene = scene;
    this.wrongSignal = new Phaser.Events.EventEmitter();
    this.cardSignal = new Phaser.Events.EventEmitter();
    this.startNewSignal = new Phaser.Events.EventEmitter();
    this.xx = scene.game.config.width;
    this.yy = scene.game.config.height;
    this.doneCard = [];
    this.reserve = [];
    
  }
  
  setCards({cardOnTable, deck}){
    this.deck = deck;
    this.onTable = cardOnTable;
  }

  startGame(){
    this.scene.tweens.add({
      targets: this.onTable.sprite,
      ease: ' Quadratic.Out',
      scale : 1,
      duration: 300,
      onComplete: ()=>{
        this._showDeck();
      }
    });
  }

  _showDeck(){
    this.deck.forEach((element, index) => {
      let _xx = element.sprite.width * 1.05 + element.sprite.width * 0.025 * index
      this.scene.tweens.add({
        targets: element.sprite,
        ease: ' Quadratic.Out',
        x: _xx,
        y: this.yy * config.cardY,
        duration: 500,
        delay: index * 10,
        onComplete: ()=>{
          if(index===this.deck.length-1) element.sprite.setInteractive();
        }
      });
    });
  }

  moveCard(win){
    this.lastCard = this.deck.pop();
    const _sprite = this.onTable.sprite; 
    const _xx = _sprite.x - _sprite.width * 1.15;

    this.scene.tweens.add({
      targets: this.lastCard.sprite,
      ease: ' Sine.In',
      x: _xx,      
      duration: 700,
      onComplete: ()=>{
        this._flipCard(win);
      },
    });

  }

  _flipCard(win){
    this.scene.tweens.add({
      targets: this.lastCard.sprite,
      ease: ' Sine.In',
      scaleX: 0.05,      
      duration: 500,
      delay: 300,
      onComplete: ()=>{  
        this._showFront(win);        
      }
    });
  }

  _showFront(win){
    this.lastCard.sprite.setTexture("cards", `${this.lastCard.key}.png`);
    this.scene.tweens.add({
      targets: this.lastCard.sprite,
      ease: ' Sine.In',
      scaleX: 1,      
      duration: 500,
      onComplete: ()=>{  
        this._sendCards(win);        
      }
    });
  }

  _sendCards(win){
    if(win){
      const _finalX = this.onTable.sprite.x;
      const _finalY = this.onTable.sprite.y;
      this._sendUp();
      this._newOnTable(_finalX, _finalY);
    } else {
      this._sendOut(this.doneCard);
      this._sendOut(this.deck);
      this.scene.tweens.add({
        targets: this.onTable.sprite,
        ease: ' Quadratic.Out',
        x: this.xx + 100,
        duration: 500
      });
      this.scene.tweens.add({
        targets: this.lastCard.sprite,
        ease: ' Quadratic.Out',
        x: this.xx + 50,
        duration: 1000,
        delay: 500,
        onComplete: ()=>{  
          this.wrongSignal.emit("wrong");        
        }
      });
    }
  }

  _sendUp(){
    let _xx = this.onTable.sprite.width * 0.6;
    let _yy = this.onTable.sprite.height * 0.6;
    let _cX = returnDoneX(this.doneCard, _xx);
    let _cY = returnDoneY(this.doneCard, _yy);
    this.onTable.sprite.setDepth(this.doneCard.length + 1);
    this.scene.tweens.add({
      targets: this.onTable.sprite,
      ease: ' Quadratic.Out',
      x: _cX,
      y: _cY,
      duration: 700,
      delay: 0     
    });
  }

  _newOnTable(x, y){
    this.scene.tweens.add({
      targets: this.lastCard.sprite,
      ease: ' Quadratic.Out',
      x: x,
      y: y,
      duration: 500,
      delay: 400,
      onComplete: ()=>{
        let _card = this.onTable;
        this.doneCard.push(_card);
        this.onTable = this.lastCard;
        this.cardSignal.emit("cardSignal");
      }
    });
  }

  _sendOut(array){
    array.forEach((element, index) => {
      this.scene.tweens.add({
        targets: element.sprite,
        ease: ' Quadratic.Out',
        x: this.xx + 50,
        duration: 500,
        delay: 100 + 10 * index
      });
    });
  }

  startNewGame({currentCardkey, cardKeys}, deckY){
    this.reserve = [];
    this.reserve.push(this.lastCard, this.onTable);
    this.doneCard.forEach(element => this.reserve.push(element));
    this.deck.forEach(element => this.reserve.push(element));
    this.doneCard = [];
    this.deck = [];
    this.reserve.forEach(element =>{
      if(element.key === currentCardkey){
        this.onTable = element;
      }
      cardKeys.forEach((card, index)=>{
        if(card === element.key) this.deck[index] = element; 
      });
    });
    this.reserve = [];

    this._rearangeCards(deckY);
    this.scene.time.addEvent({
      delay: 500,
      callback: ()=>{
        this.startNewSignal.emit("startNew");
      },
      loop: false
    });    
  }

  _rearangeCards(yy){
    this.deck.forEach((element, index)=>{
       element.sprite.setDepth(index+1);
       element.sprite.setTexture("cards", 'cardBack.png');
       element.sprite.y = yy;
    });

    this.onTable.sprite.setTexture("cards", `${this.onTable.key}.png`);
    this.onTable.sprite.setScale(0);
    this.onTable.sprite.x = this.xx * 0.5;
    this.onTable.sprite.y = this.yy * config.cardY;
  }





 

   
}
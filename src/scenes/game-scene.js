import 'phaser';
import Cards from '../classes/cards';
import Interface from '../classes/interface';
import Model from '../functions/model';
import Controller from '../functions/controller';
 
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
 
 
  create () {
    const xx = this.game.config.width;
    const yy = this.game.config.height;

    const background = this.add.image(xx * 0.5, yy * 0.5, "background");
    this.cards = new Cards(this);
    this.interface = new Interface(this);
    
    this.model = new Model(this);
    this.controller = new Controller(this);

    this.cards.createDeck(this.model);
    this.controller.setCards(this.cards);

    this.interface.updateBetText(this.model.bet);
    this.interface.updateCreditText(this.model.amount);

    this.startGame();
    this.logic();
    // let sfx = this.sound.add('music');
    // sfx.play('music');
    // sfx.loop = true;
  }

  startGame(){
    this.time.addEvent({
      delay: 500,
      callback: ()=>{
        this.controller.startGame();
      },
      loop: false
    });
  }

  logic(){
    const guessHigh = this.interface.guessHigh.guessSignal;
    const guessLow = this.interface.guessLow.guessSignal;
    const betPlusSignal = this.interface.betPlus.betSignal;
    const betMinusSignal = this.interface.betMinus.betSignal;

    guessHigh.on("guessSignal", ()=>{
      this.disableButtons();
      this.model.high = true;
      this.guessing();
      this.interface.guessHigh.sprite.setScale(1);
    });
    guessLow.on("guessSignal", ()=>{
      this.disableButtons();
      this.model.high = false;
      this.guessing();
      this.interface.guessLow.sprite.setScale(1);
    });
    

    betPlusSignal.on("betSignal", ()=>{
      let bet = this.model.betplus();
      this.interface.updateBetText(bet);
    });
    betMinusSignal.on("betSignal", ()=>{
      let bet = this.model.betminus();
      this.interface.updateBetText(bet);
    });

    this.controller.wrongSignal.on("wrong", ()=>{
      
      this.model.setUpCards();
      this.controller.startNewGame(this.model, this.cards.deckY );
    });

    this.controller.startNewSignal.on("startNew", ()=>{
      this.startGame();
      this.enableButtons();
    });

    this.controller.cardSignal.on("cardSignal", ()=>{
      this.interface.hideMessage();
      let amount = this.model.newAmount();
      this.interface.updateCreditText(amount);
    });

    this.interface.message.endMessageSignal.on("endMessage", ()=>{
      this.enableButtons();
      // this.scene.restart();
    });
  }

  guessing(){
    let creditText = this.model.creditCalc();
    this.interface.updateCreditText(creditText);
    let win = this.model.guessResult();
    if(win){
      this.interface.showMessage();
    }
    this.controller.moveCard(win);
  }

  disableButtons(){
    this.interface.guessHigh.sprite.disableInteractive();
    this.interface.guessLow.sprite.disableInteractive();
    this.interface.betPlus.sprite.disableInteractive();
    this.interface.betMinus.sprite.disableInteractive();
  }

  enableButtons(){
    this.interface.guessHigh.sprite.setInteractive();
    this.interface.guessLow.sprite.setInteractive();
    this.interface.betPlus.sprite.setInteractive();
    this.interface.betMinus.sprite.setInteractive();
 
  }

};
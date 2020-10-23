import GuessButton from './guess-button';
import BetButton from './bet-button';
import RestartButton from './restart-button';
import Message from './message';
import Conffeti from './conffeti';
export default class Interface {
    constructor (scene) {
        const xx = this.xx = scene.game.config.width;
        const yy = this.yy = scene.game.config.height;
        this.scene = scene;
        this._createButtons(scene);
        this._createText(scene);   
        this.message = new Message(scene);
        this.conffeti = new Conffeti(scene);
        this._createCoinAnimation(scene);
    }

    _createText(scene){
        const txtCreditTitle = this.txtCreditTitle = scene.add.bitmapText(0,0, "font", "CREDIT", 50);    
        txtCreditTitle.setOrigin(0.5);
        txtCreditTitle.x = this.restartButton.sprite.x;
        txtCreditTitle.y = this.restartButton.sprite.y + this.restartButton.sprite.height * 1;
        const txtCredit = this.txtCredit = scene.add.bitmapText(txtCreditTitle.x, txtCreditTitle.y, "font", "", 70);    
        txtCredit.setOrigin(0.5);
        txtCredit.y = txtCreditTitle.y + txtCreditTitle.height * 1.5;
        
        const txtBet = this.txtBet = scene.add.bitmapText(this.betPlus.sprite.x, this.betPlus.sprite.y + this.betPlus.sprite.height * 1, "font", "", 70);    
        txtBet.setOrigin(0.5);
    }


    _createButtons(scene){
        this.guessHigh = new GuessButton(scene, true);
        this.guessLow = new GuessButton(scene, false);
        this.betPlus = new BetButton(scene, true);
        this.betMinus = new BetButton(scene, false);
        this.restartButton = new RestartButton(scene);
        this.betPlus.sprite.x = this.guessHigh.sprite.x + this.guessHigh.sprite.width * 2;
        this.betPlus.sprite.y = this.guessHigh.sprite.y;
        this.betMinus.sprite.x = this.betPlus.sprite.x;
        this.betMinus.sprite.y = this.guessLow.sprite.y;
    }

    _createCoinAnimation(scene){
        scene.anims.create({
            key: 'playCoins',
            frames: scene.anims.generateFrameNames('coins', { prefix: 'Gold_', start:1, end: 30, suffix: '.png' }),            
            repeat: -1
        });
        const _xx = this.txtCredit.x ;
        const coin = this.coin = scene.add.sprite( this.txtCreditTitle.x-this.txtCreditTitle.width, this.txtCredit.y, 'coins', "Gold_1.png");
        coin.anims.play('playCoins');
        coin.setScale(0.15);
 
    }

    

    updateBetText(num){
        this._up(this.txtBet, num);
        
    }

    updateCreditText(num){
        this._up(this.txtCredit, num);
    }    

    showMessage(){
        this.message.show();
        this.conffeti.start();
    }

    hideMessage(){
        this.message.hide();
        this.conffeti.stop();
    }

    _up(target, num){
        let {scene} = this;
        scene.tweens.add({
            targets: target,
            ease: ' Quadratic.Out',
            scale: 1.1,
            duration: 200,
            onComplete: ()=>{
                target.setText(`${num}`);
                this._down(target);
            }
          });
    }

    _down(target){
        let {scene} = this;
        scene.tweens.add({
            targets: target,
            ease: ' Quadratic.Out',
            scale: 1,
            duration: 200,
            
        });
    }
  
  
}
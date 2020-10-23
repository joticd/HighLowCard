export default class BetButton {
    constructor (scene, plus) {
        const xx = scene.game.config.width;
        const yy = scene.game.config.height;
        this.betSignal = new Phaser.Events.EventEmitter();
        this.isPlus = plus;
        let _sprite = plus ? 'plusNormal.png' : 'minusNormal.png';
       
        const sprite = this.sprite = scene.add.image(xx*0.5, yy*0.7, 'assets', _sprite);
        
        sprite.setInteractive();

        sprite.on('pointerdown',()=>{   
            let _sprite = this.isPlus ? 'plusDown.png' : 'minusDown.png';    
            this.sprite.setTexture("assets", _sprite); 
            this.betSignal.emit('betSignal');
        });

        sprite.on('pointerup',()=>{
            let _sprite = this.isPlus ? 'plusNormal.png' : 'minusNormal.png';    
            this.sprite.setTexture("assets", _sprite); 
            this.sprite.setScale(1);
        });
  
  
    }
  
  
}
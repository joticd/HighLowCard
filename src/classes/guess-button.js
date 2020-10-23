export default class GuessButton {
    constructor (scene, high) {
        const xx = scene.game.config.width;
        const yy = scene.game.config.height;
        this.scene = scene;
        this.isHigh = high;
        this.guessSignal = new Phaser.Events.EventEmitter();
        const _sprite = high ? "button_high.png" : "button_low.png";
        const sprite = this.sprite = scene.add.image(xx*0.5, yy*0.7, 'assets', _sprite);
        sprite.x = sprite.x + sprite.width * 2;
        let inc = high ? 1 : -1;
        sprite.y = sprite.y - sprite.height * 1 * inc;
        sprite.setOrigin(0.5);
        // sprite.setScale(0.5);
        // sprite.angle = high ? 0 : 180;
        sprite.setInteractive();
  
        sprite.on('pointerdown',()=>{  
            this.scene.tweens.add({
                targets: this.sprite,
                ease: ' Quadratic.Out',
                scale: 0.9,
                duration: 200,
               
            });                     
        });
        
        sprite.on('pointerup',()=>{
            this.scene.tweens.add({
                targets: this.sprite,
                ease: ' Quadratic.Out',
                scale: 1,
                duration: 200,
                onComplete: ()=>{
                    this.guessSignal.emit('guessSignal');                    
                }
            }); 
            
        });
  
  
    }
  
  
}
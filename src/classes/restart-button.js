export default class RestartButton {
    constructor (scene) {
        const xx = scene.game.config.width;
        const yy = scene.game.config.height;     
        this.scene = scene;
       
        const sprite = this.sprite = scene.add.image(0, 0, 'assets', 'button_restart.png');
        sprite.setOrigin(0.5);
        sprite.x = xx - sprite.width;
        sprite.y = 0 + sprite.height * 0.75;
        sprite.setInteractive();

        sprite.on('pointerdown',()=>{   
            this.scene.tweens.add({
                targets: this.sprite,
                ease: ' Quadratic.Out',
                scale: 0.9,
                duration: 200,
                onComplete: ()=>{
                    this.scene.scene.restart();;                    
                }
               
            }); 
        });

        sprite.on('pointerup',()=>{
            this.scene.tweens.add({
                targets: this.sprite,
                ease: ' Quadratic.Out',
                scale: 1,
                duration: 200,
                
            }); 
        });
  
  
    }
  
  
}

export default class Message {
    constructor (scene) {
        const xx = this.xx = scene.game.config.width;
        const yy = this.yy = scene.game.config.height;

        this.scene = scene;
        this.endMessageSignal = new Phaser.Events.EventEmitter();

        this.messageContainer = scene.add.container(0,0);
        const background = scene.add.image(0, 0, 'assets', "backgroundMsg.png");
        background.setOrigin(0.5);
        background.setScale(1, 0.7);
        background.alpha = 0.7;
        const msgText = scene.add.bitmapText(0, 0, "font", "CONGRATULATIONS", 50);    
        msgText.setOrigin(0.5);

        this.messageContainer.add(background);
        this.messageContainer.add(msgText);       
        
        this.messageContainer.setSize(background.width, background.height);

        this.messageContainer.x = xx * 0.5;
        this.messageContainer.y = yy * 0.5;     
        this.messageContainer.setDepth(100);

        this.messageContainer.setScale(0);
  
    }

    show(){
        this.scene.tweens.add({
            targets: this.messageContainer,
            ease: ' Quadratic.Out',
            scale: 1,
            duration: 500,
            delay: 400,
            onComplete: ()=>{
             
            }
          });
    }

    hide(){
        this.scene.tweens.add({
            targets: this.messageContainer,
            ease: ' Quadratic.Out',
            scale: 0,
            duration: 500,
            delay: 400,
            onComplete: ()=>{
             this.endMessageSignal.emit("endMessage");
            }
        });
    }

    



  
  
}
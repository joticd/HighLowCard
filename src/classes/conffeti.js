
export default class Message {
    constructor (scene) {
        const xx = this.xx = scene.game.config.width;
        const yy = this.yy = scene.game.config.height;

        this.scene = scene;

        const particles = scene.add.particles('assets');

        this.emitter = particles.createEmitter({
            frame: ["particleBlue_1.png", "particleBlue_3.png", "particleBlue_6.png", "particleWhite_3.png", "particleWhite_6.png", "particleWhite_7.png", "particleYellow_1.png", "particleYellow_3.png", "particleYellow_6.png", "particleYellow_7.png"],
            x: xx * 0.5,
            y: -50,
            lifespan: 1500,
            speed: { min: 300, max: 600 },
            gravityY: 300,
            scale: { start: 0.5, end: 0.2 },
            quantity: 10,
            on:false,
            blendMode: 'ADD'
        });

        particles.setDepth(100);
  
    }

    start(){        
        this.emitter.start();
    }

    stop(){
        this.emitter.stop();
    }

    



  
  
}
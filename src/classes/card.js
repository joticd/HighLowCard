import config from '../kernel/config';
export default class Card {
    constructor (scene, key, value, onTable, depth) {
        const xx = scene.game.config.width;
        const yy = scene.game.config.height;
        this.key = key;
        this.onTable = onTable;
        let _sprite = onTable ? `${key}.png` : 'cardBack.png';
        const sprite = this.sprite = scene.add.image(xx*0.5, yy*config.cardY, 'cards', _sprite);
        sprite.setDepth(depth);
        sprite.setOrigin(0.5);
        this.cardValue = value;
        sprite.setInteractive();
  
    
  
  
    }
  
  
}
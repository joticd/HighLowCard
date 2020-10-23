import Card from './card';
import config from '../kernel/config';
import {shuffle, returnKeyValue} from '../kernel/helpers';

export default class Cards {
    constructor (scene) {
        this.scene = scene;
        this.xx = scene.game.config.width;
        this.yy = scene.game.config.height;
        this.deck = [];
  
    }

    createDeck({currentCardkey, cardKeys}){
        let [_cKey, _value] = returnKeyValue(currentCardkey);
        this.cardOnTable = new Card(this.scene, _cKey, _value, true, 0);
        this.cardOnTable.sprite.setScale(0);
        this._fillDeck(cardKeys);
    }

    _fillDeck(cardKeys){        
        cardKeys.forEach((element, index) => {
            let [_cKey, _value] = returnKeyValue(element);
            let _card = new Card(this.scene, _cKey, _value, false, index+1);
            _card.sprite.y = this.yy + _card.sprite.height * 2;
            this.deck.push(_card);
        });
        this.deckY = this.deck[0].sprite.y;
    } 
  
  
}
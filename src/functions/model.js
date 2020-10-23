import config from '../kernel/config';
import {shuffle, isHeightValue, returnValue} from '../kernel/helpers';

export default class Model {
    constructor (scene) {
        this.scene = scene;
        this.amount = config.amount;
        this.bet = config.defaultBet;
        this.high = true;
        this.win = false;
        this.setUpCards();
        
        
    }

    _createCardKeys (){
        config.cardnamePrefix.forEach(prefix =>{
            for(let i = 1; i < 14; i++){
                let _key = `${prefix}${i}`;
                if(this.currentCardkey !== _key) this.cardKeys.push(_key);                
            }
        });
    }

    creditCalc(){
        this.amount = this.amount - this.bet;
        return this.amount;
    }

    guessResult(){
        let _lastCard = this.cardKeys.pop();;
        let _num = returnValue(_lastCard);
        let _lastCardVal = isHeightValue(_num);
        if(_lastCardVal > this.currentCardValue && this.high || _lastCardVal < this.currentCardValue && !this.high){
            this.win = true;
            this.currentCardkey = _lastCard;
            this.currentCardValue = _lastCardVal;
            
        } else {
            this.win = false;
        }
        return this.win;        
    }

    setUpCards(){
        const _val = Math.floor(Math.random() * 13) + 1;
        const _inx = Math.floor(Math.random() * 4);
        
        this.currentCardkey = `${config.cardnamePrefix[_inx]}${_val}`;
        this.currentCardValue = isHeightValue(_val);
        
        this.cardKeys = [];
        this._createCardKeys();
        this.cardKeys = shuffle(this.cardKeys);

        this.cardDone = [];
    }

    newAmount(){
        this.amount = this.amount+this.bet*2;
        return this.amount;
    }

    betplus(){
        this.bet = this.bet===this.amount ? this.amount : this.bet + 1; 
        return this.bet;
    }

    betminus(){
        this.bet = this.bet===0 ? 0 : this.bet - 1; 
        return this.bet;
    }

    







  
    


}
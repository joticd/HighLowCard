import config from './config';

export function shuffle(arr){
    for(let j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;       
}

export function isHeightValue(num){
  let _value = num;
  if(num === 1 || num > 10) 
    _value = num === 1 ? config.asValue : num+1;
  
  return _value;
}

export function returnValue(str){
  let _value = str.substring(1);
  return parseInt(_value);
}

export function returnKeyValue(str){
  // let _cKey = `${str}.png`
  let _value = str.substring(1);  
  return [str, _value];
}

export function returnDoneX(doneCard, xx){
  let _xx = xx
  if(doneCard.length === 0 || doneCard.length === 17 || doneCard.length === 34){
    _xx = xx;
  } else {
    _xx = doneCard[doneCard.length-1].sprite.x + doneCard[doneCard.length-1].sprite.width * 0.5;
  }
  return _xx;
}

export function returnDoneY(doneCard, yy){
  let _yy = yy
  if(doneCard.length > 16 && doneCard.length < 34){
    _yy = yy + doneCard[0].sprite.height;
  } else if(doneCard.length > 33){
    _yy = yy + doneCard[0].sprite.height * 2;
  }
  return _yy;
}







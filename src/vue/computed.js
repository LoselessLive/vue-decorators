import Vue from 'vue';
import specialKeys from '../special.keys';

function makeWatchDecorator(options){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.COMPUTED]){
      target[specialKeys.COMPUTED] = {};
    }

    if(!target[specialKeys.COMPUTED][options || key]){
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.COMPUTED][options || key] = target[key];
    }
  };
}

export function Computed(options, key, descriptor){
  if(options instanceof Vue){
    return makeWatchDecorator()(options, key);
  }

  return makeWatchDecorator(options);
}
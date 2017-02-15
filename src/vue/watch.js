import Vue from 'vue';
import specialKeys from '../special.keys';

function makeWatchDecorator(options){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.WATCHERS]){
      target[specialKeys.WATCHERS] = {};
    }

    if(!target[specialKeys.WATCHERS][options || key]){
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.WATCHERS][options || key] = target[key];
    }
  };
}

export function Watch(options, key, descriptor){
  if(options instanceof Vue){
    return makeWatchDecorator()(options, key);
  }

  return makeWatchDecorator(options);
}

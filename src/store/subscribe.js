import Vuex from 'vuex';
import specialKeys from '../special.keys';

function makeSubscribeDecorator(options){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.SUBSCRIBERS]){
      target[specialKeys.SUBSCRIBERS] = {};
    }

    if(!target[specialKeys.SUBSCRIBERS][key]){
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.SUBSCRIBERS][key] = target[key];
    }
  }
}

export function Subscribe(options, key, descriptor){
  if(options instanceof Vuex.Store){
    return makeSubscribeDecorator()(options, key);
  }

  return makeSubscribeDecorator(options);
}

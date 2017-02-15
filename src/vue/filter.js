import Vue from 'vue';
import specialKeys from '../special.keys';

function makeFilterDecorator(options){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.FILTERS]){
      target[specialKeys.FILTERS] = {};
    }

    if(!target[specialKeys.FILTERS][options || key]){
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.FILTERS][options || key] = target[key];
    }
  };
}

export function Filter(options, key, descriptor){
  if(options instanceof Vue){
    return makeFilterDecorator()(options, key);
  }

  return makeFilterDecorator(options);
}

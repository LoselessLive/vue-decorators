import Vue from 'vue';
import specialKeys from '../special.keys';

function makePropDecorator(options) {
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.PROPS]){
      target[specialKeys.PROPS] = {};
    }

    if(!target[specialKeys.PROPS][key]){
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.PROPS][key] = options || true;
    }
  }
}

export function Prop(options, key, descriptor) {
  if(options instanceof Vue){
    return makePropDecorator()(options, key);
  }

  return makePropDecorator(options);
}

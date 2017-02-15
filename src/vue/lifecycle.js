import Vue from 'vue';
import specialKeys from '../special.keys';

function makeLifecycleDecorator(options){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.LIFECYCLE]){
      target[specialKeys.LIFECYCLE] = {};
    }

    if(!target[specialKeys.LIFECYCLE][options || key]){
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.LIFECYCLE][options || key] = target[key];
    }
  }
}

export function Lifecycle(options, key, descriptor){
  if(options instanceof Vue){
    return makeLifecycleDecorator()(options, key);
  }

  return makeLifecycleDecorator(options);
}

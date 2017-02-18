import Vue from 'vue';
import Vuex from 'vuex';
import {mapGetters} from 'vuex'
import specialKeys from '../special.keys';

function makeGetterDecorator(options, store = false){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.GETTERS]){
      target[specialKeys.GETTERS] = {};
    }

    if(!target[specialKeys.GETTERS][key]){
      target[specialKeys.USED_PROPS][key] = true;

      if(store){
        target[specialKeys.GETTERS][key] = target[key];
      } else {
        target[specialKeys.GETTERS][key] = mapGetters([options || key])[options || key];
      }
    }
  }
}

export function Getter(options, key, descriptor){
  if(options instanceof Vuex.Store || (typeof options === 'object' && !(options instanceof Vue))){
    return makeGetterDecorator(undefined, true)(options, key);
  }

  if(options instanceof Vue){
    return makeGetterDecorator()(options, key);
  }

  return makeGetterDecorator(options);
}

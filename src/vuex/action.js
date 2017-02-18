import Vue from 'vue';
import Vuex from 'vuex';
import {mapActions} from 'vuex'
import specialKeys from '../special.keys';

function makeActionDecorator(options, store = false){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.ACTIONS]){
      target[specialKeys.ACTIONS] = {};
    }

    if(!target[specialKeys.ACTIONS][key]){
      target[specialKeys.USED_PROPS][key] = true;

      if(store){
        target[specialKeys.ACTIONS][key] = target[key];
      } else {
        target[specialKeys.ACTIONS][key] = mapActions([options || key])[options || key];
      }
    }
  }
}

export function Action(options, key, descriptor){
  if(options instanceof Vuex.Store || (typeof options === 'object' && !(options instanceof Vue))){
    return makeActionDecorator(undefined, true)(options, key);
  }

  if(options instanceof Vue){
    return makeActionDecorator()(options, key);
  }

  return makeActionDecorator(options);
}

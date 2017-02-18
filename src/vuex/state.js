import Vue from 'vue';
import Vuex from 'vuex';
import {mapState} from 'vuex'
import specialKeys from '../special.keys';

function makeStateDecorator(options, store = false){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.STATES]){
      if(store){
        target[specialKeys.STATES] = [];
      } else {
        target[specialKeys.STATES] = {};
      }
    }

    if(!target[specialKeys.STATES][key]){
      target[specialKeys.USED_PROPS][key] = true;

      if(store){
        target[specialKeys.STATES].push(key);
      } else {
        let fc;

        if(typeof options === 'function'){
          fc = mapState({[key]: options})[key];
        } else {
          fc = mapState([options || key])[options || key];
        }

        target[specialKeys.STATES][key] = fc;
      }
    }
  }
}

export function State(options, key, descriptor){
  if(options instanceof Vuex.Store || (typeof options === 'object' && !(options instanceof Vue))){
    return makeStateDecorator(undefined, true)(options, key);
  }

  if(options instanceof Vue){
    return makeStateDecorator()(options, key);
  }

  return makeStateDecorator(options);
}

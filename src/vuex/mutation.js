import Vue from 'vue';
import Vuex from 'vuex';
import {mapMutations} from 'vuex'
import specialKeys from '../special.keys';

function makeMutationDecorator(options, store = false){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.MUTATIONS]){
      target[specialKeys.MUTATIONS] = {};
    }

    if(!target[specialKeys.MUTATIONS][key]){
      target[specialKeys.USED_PROPS][key] = true;

      if(store){
        target[specialKeys.MUTATIONS][key] = target[key];
      } else {
        target[specialKeys.MUTATIONS][key] = mapMutations([options || key])[options || key];
      }
    }
  }
}

export function Mutation(options, key, descriptor){
  if(options instanceof Vuex.Store || (typeof options === 'object' && !(options instanceof Vue))){
    return makeMutationDecorator(undefined, true)(options, key);
  }

  if(options instanceof Vue){
    return makeMutationDecorator()(options, key);
  }

  return makeMutationDecorator(options);
}

import Vue from 'vue';
import {mapState} from 'vuex'
import specialKeys from '../special.keys';

function makeStateDecorator(options){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.STATES]){
      target[specialKeys.STATES] = {};
    }

    if(!target[specialKeys.STATES][key]){
      let fc;

      if(typeof options === 'function'){
        fc = mapState({[key]: options})[key];
      } else {
        fc = mapState([options || key])[options || key];
      }

      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.STATES][key] = fc;
    }
  }
}

export function State(options, key, descriptor){
  if(options instanceof Vue){
    return makeStateDecorator()(options, key);
  }

  return makeStateDecorator(options);
};

import Vue from 'vue';
import {mapActions} from 'vuex'
import specialKeys from '../special.keys';

function makeActionDecorator(options){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.ACTIONS]){
      target[specialKeys.ACTIONS] = {};
    }

    if(!target[specialKeys.ACTIONS][key]){
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.ACTIONS][key] = mapActions([options || key])[options || key];
    }
  }
}

export default function(options, key, descriptor){
  if(options instanceof Vue){
    return makeActionDecorator()(options, key);
  }

  return makeActionDecorator(options);
};

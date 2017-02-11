import Vue from 'vue';
import {mapGetters} from 'vuex'
import specialKeys from '../special.keys';

function makeGetterDecorator(options){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.GETTERS]){
      target[specialKeys.GETTERS] = {};
    }

    if(!target[specialKeys.GETTERS][key]){
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.GETTERS][key] = mapGetters([options || key])[options || key];
    }
  }
}

export default function(options, key, descriptor){
  if(options instanceof Vue){
    return makeGetterDecorator()(options, key);
  }

  return makeGetterDecorator(options);
};

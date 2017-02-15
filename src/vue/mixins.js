import specialKeys from '../special.keys';

export function Mixins(mixins) {
  if(!(mixins instanceof Array)){
    console.error('[Vue decorator error] mixins must be a array');

    return mixins;
  }

  return function(target){
    if(target[specialKeys.MIXINS]){
      target[specialKeys.MIXINS].push(...mixins);
    } else {
      target[specialKeys.MIXINS] = mixins;
    }

    return target;
  }
}

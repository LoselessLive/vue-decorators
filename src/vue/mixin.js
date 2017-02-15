import specialKeys from '../special.keys';

export function Mixin(mixin) {
  if(typeof mixin !== 'object'){
    console.error('[Vue decorator error] mixin must be a object');

    return mixin;
  }

  return function(target){
    if(target[specialKeys.MIXINS]){
      target[specialKeys.MIXINS].push(mixin);
    } else {
      target[specialKeys.MIXINS] = [mixin];
    }

    return target;
  }
}

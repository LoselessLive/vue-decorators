import specialKeys from '../special.keys';

export function InjectComponents(components) {
  if(typeof components !== 'object'){
    console.error('[Vue decorator error] components must be a object');

    return components;
  }

  return function(target){
    if (!target[specialKeys.COMPONENTS]) {
      target[specialKeys.COMPONENTS] = {};
    }

    target[specialKeys.COMPONENTS] = {
      ...target[specialKeys.COMPONENTS],
      ...components
    };

    return target;
  }
}

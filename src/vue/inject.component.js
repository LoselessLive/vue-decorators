import specialKeys from '../special.keys';

export function InjectComponent(componentName, component) {
  if(typeof component !== 'object'){
    console.error('[Vue decorator error] component must be a vue component object');

    return component;
  }

  return function(target){
    if (!target[specialKeys.COMPONENTS]) {
      target[specialKeys.COMPONENTS] = {};
    }

    target[specialKeys.COMPONENTS] = {
      ...target[specialKeys.COMPONENTS],
      [componentName]: component
    };

    return target;
  }
}

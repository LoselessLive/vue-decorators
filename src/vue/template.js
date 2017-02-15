import specialKeys from '../special.keys';

export function Template(template) {
  if(typeof template !== 'string'){
    console.error('[Vue decorator error] template must be a string');

    return template;
  }

  return function(target){
    target[specialKeys.TEMPLATE] = template;

    return target;
  }
}

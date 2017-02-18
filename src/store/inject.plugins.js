import specialKeys from '../special.keys';

export function InjectPlugins(plugins) {
  if(!(plugins instanceof Array)){
    console.error('[Vue decorator error] plugins must be a array');

    return plugins;
  }

  return function(target){
    if(target[specialKeys.PLUGINS]){
      target[specialKeys.PLUGINS].push(...plugins);
    } else {
      target[specialKeys.PLUGINS] = plugins;
    }

    return target;
  }
}

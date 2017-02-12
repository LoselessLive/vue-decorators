import Vue from 'vue';
import specialKeys from '../special.keys';

function makeComponentsDecorator(options) {
  return function (target) {
    if (!target[specialKeys.COMPONENTS]) {
      target[specialKeys.COMPONENTS] = {};
    }

    target[specialKeys.COMPONENTS] = {
      ...target[specialKeys.COMPONENTS],
      ...options
    };

    return target;
  }
}

export default function Components(options) {
  if (options instanceof Vue) {
    return makeComponentsDecorator()(options);
  }

  return makeComponentsDecorator(options);
};

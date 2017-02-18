# Vue Decorators
> This is Vue Decorators v1.1.7 (beta)

Vue & Vuex Decorators for ECMAscript

## Dependencies

- [Vue](https://github.com/vuejs/vue)
- [Vuex](https://github.com/vuejs/vuex)

## Installation

```bash
npm install --save vue-decorators
```

## Decorators

Vue-decorators has many decorators, for example:

* `@Component` or `@Component({ ... })`
* `@InjectComponents({ ... })`
* `@Prop` or `@Prop({ ... })`
* `@Watch` or `@Watch('...')`
* `@Lifecycle` or `@Lifecycle('...')`
* `@Filter` or `@Filter('...')`
* `@Computed`

* `@State` or `@State('...')`
* `@Action` or `@Action('...')`
* `@Getter` or `@Getter('...')`
* `@Mutation` or `@Mutation('...')`

Other decorators you can see in the [documentation](https://github.com/partyka95/vue-decorators/wiki).


## Example for Vue components

```js
import Vue from 'vue'
import {
  Component,
  InjectComponents,
  Prop,
  Watch,
  Lifecycle,
  Computed,
  Filter,

  State,
  Action,
  Getter,
  Mutation
} from 'vue-decorators';
import Component1 from '...';
import Component2 from '...';

@Component
@InjectComponents({
    Component1,
    Component2
})
export class MyComponent extends Vue {
  credentials = {
    username: '',
    password: ''
  };
  otherData = 123;

  @Prop property1;
  @Prop({
    type: Number,
    default: 100
  }) property2;
  @Prop({ required: true }) property3;

  @Action login;
  @Getter currentUser;

  @Watch('otherData')
  otherDataListener(){ /* ... */ }

  @Lifecycle
  created(){ /* ... */ }

  @Computed
  computedMethod(){ /* ... */ }

  @Filter
  filterName(){ /* ... */ }

  normalVueMethod(){
    /* ... */
    this.login().then(function(){ /* ... */ });
  }
}
```

## Example for Stores

```js
// store/modules/auth.js
import {Module, State, Action, Getter, Mutation} from 'vue-decorators';

@Module
export default class AuthModule {
    @State currentUser = null;

    @Action
    fetchCurrentUser({commit}){
        // ...
    }

    @Getter
    getCurrentUser(state){
      return state.currentUser;
    }

    @Mutation
    attachCurrentUser(state, currentUser){
      state.currentUser = currentUser;
    }
}

```

```js
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import {Store, InjectModules} from 'vue-decorators';

import auth from './modules/auth';

Vue.use(Vuex);

@Store({
  strict: true
})
@InjectModules({
  auth
})
@InjectPlugin(createLogger())
export default class AppStore extends Vuex.Store {
    @State rootExampleState = 'foo';

    @Action
    rootExampleAction(){ /* ... */ }
}

```

## License

MIT
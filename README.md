# Vue Decorators
> This is Vue Decorators v1.1.2 (beta)

Vue & Vuex Decorators for ECMAscript

## Dependencies

- [Vue](https://github.com/vuejs/vue)
- [Vuex](https://github.com/vuejs/vuex)

## Installation

```bash
npm install --save vue-decorators
```

## Decorators

Vue-decorators has 16 decorators, for example:

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


## Example

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

## License

MIT
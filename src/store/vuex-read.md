# vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。  
适用于中大型单页面应用，小型的使用store模式即可,利用Vue.observable (util/store.js)。

* 单例模式
* 细粒度

## 结构

* state，驱动应用的数据源；
* view，以声明方式将 state 映射到视图；
* actions，响应在 view 上的用户输入导致的状态变化。

### state

Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。  
Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态

#### 辅助函数

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性  

##### mapState

// 在单独构建的版本中辅助函数为 Vuex.mapState

```javascript
import { mapState } from 'vuex'

 computed: mapState({
    count: state => state.count,
    message: state => state.message
  })
```

或者

```javascript
 computed: mapState([
    'count',
    'message'
  ]),
```

##### 对象展开运算符

mapState 函数返回的是一个对象.要将它与局部计算属性混合使用。通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。es6中的对象展开运算符，极大地简化了写法：

```javascript
 computed: {
    contentMessage () {
      if (this.clientHeight > 700) {
        return 'big screen'
      } else {
        return 'normal'
      }
    },
    ...mapState({
      count: state => state.count,
      message: state => state.message
    })
  }
```

### getter

有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数。如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。  
Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。  

```javascript
state: {
    count: 0,
    message: 'te1',
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    // getter 可以接受其他getter作为第二个参数
    dotoLength: (state, getters) => {
      return getters.doneTodos.length
    }
  },
```

组件中调用：
`store.getters.dotoLength`

也可以通过让 getter 返回一个函数，来实现给 getter 传参  

```javascript
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}

store.getters.getTodoById(2)
```

#### mapGetters辅助函数

mapGetters辅助函数仅仅是将 store 中的 getter 映射到局部计算属性  

```javascript
...mapGetters([
      'doneTodos',
      'dotoLength'
    ]),
```

### Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。  
每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。  

```javescript
 mutations: {
    increment (state) {
      state.count++
    },
    getMessage (state, value) {
      state.message = value
    }
  }

  store.commit('increment')
  store.commit({
    type: 'increment',
    amount: 10
    })
```

**规则**：
最好提前在你的 store 中初始化好所有所需属性。

当需要在对象上添加新属性时，你应该 使用 Vue.set(obj, 'newProp', 123), 或者以新对象替换老对象。 例：  
`state.obj = { ...state.obj, newProp: 123 }`

#### 使用常量替代 Mutation 事件类型

```javascript
 // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
```

#### Mutation 必须是同步函数

若是异步函数，当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。  

#### 提交

1. `this.$store.commit('xxx')`
2. mapMutations  

```javascript
 ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      changeStore: 'getMessage'// 将 `this.changeStore(val)` 映射为 `this.$store.commit('increment',val)`
    })

     @click="changeStore(nval)"
```

### action

Action 提交的是 mutation，而不是直接变更状态。
Action 可以包含任意异步操作。  

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象。可以调用mutation，state，getter 。  

```javascript
actions: {
  increment ({ commit }) { // 参数解构
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
store.dispatch('increment')
```

#### 分发

1. this.$store.dispatch('xxx')
2. mapActions  

```javascript
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
```

#### 组合action

action 通常是异步的

store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise

```javascript
 this.$store.dispatch('increment', {count: this.count}).then(() => {
        console.log('dispatch-----------')
      })
```

组合多个action

```javascript
// 假设 getData() 和 getOtherData() 返回的是 Promise
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。

### module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

```javascript
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

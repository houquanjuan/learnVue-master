import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = {
  state: {
    count: 0,
    message: 'te1',
    todos: [
      { id: 1, text: '...', done: true },
      { id: 3, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    dotoLength: (state, getters) => {
      return getters.doneTodos.length
    },
    todoByID: (state) => (id, done) => {
      return state.todos.find(todo => todo.id === id && done === todo.done)
    }
  },
  mutations: {
    increment (state, data) {
      state.count += data.count
    },
    getMessage (state, value) {
      state.message = value
    }
  },
  actions: {
    increment (context, data) {
      context.commit('increment', data)
    },
    actionA ({ commit }, data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('increment', data)
          resolve()
        }, 1000)
      })
    }
  }
}

// const moduleMenu = {
//   state: () => ({
//     count: 0
//   }),
//   mutations: {
//     increment (state, data) {
//       state.count++
//     }
//   },
//   getters: {
//     doubleCount (state) {
//       return state.count * 2
//     }
//   },
//   actions: {
//     incrementIfOddOnRootSum ({ state, commit, rootState }, data) {
//       if ((state.count + rootState.count) % 2 === 1) {
//         commit('increment')
//       }
//     }
//   }
// }
// const moduleMessage = {
//   state: () => ({
//     message: 'a'
//   }),
//   mutations: {
//     getMessage (state, data) {
//       state.message += data
//     }
//   },
//   getters: {
//     doubleMessage (state) {
//       return state.message + 2
//     }
//   },
//   actions: {
//     incrementMessage ({ state, commit, rootState }, data) {
//       if (state.message) {
//         commit('getMessage', data)
//       }
//     }
//   }
// }
// export default new Vuex.Store({
//   modules: {
//     a: moduleMenu,
//     b: moduleMessage
//   }
// })
export default new Vuex.Store(store)

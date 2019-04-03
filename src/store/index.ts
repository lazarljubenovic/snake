import * as Redux from 'redux'
import reducer from './reducer'
import State from './state'
import * as game from './game'

const store = Redux.createStore(reducer)

export default store
export type State = State
export { game }

import * as Redux from 'redux'
import game from './game'
import * as core from '../core'

const reducer = Redux.combineReducers({
  game,
})

export default reducer

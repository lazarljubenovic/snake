import * as Redux from 'redux'
import State from './state'

import * as game from './game'
import * as ui from './ui'
import * as options from './options'

import firebase from 'firebase'
import firebaseConfig from '../firebase.config'
import 'firebase/auth'
import 'firebase/database'
import { firebaseReducer } from 'react-redux-firebase'

const rrfConfig = {
  userProfile: 'users', // where users' profiles are stored in database
}

firebase.initializeApp(firebaseConfig)

const rootReducer = Redux.combineReducers({
  firebase: firebaseReducer,
  game: game.default,
  ui: ui.default,
  options: options.default,
})

const store = Redux.createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
}

export default store
export type State = State
export { game, ui, options, rrfProps }



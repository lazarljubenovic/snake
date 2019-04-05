import { Reducer } from 'redux'
import ActionType from './action-type'
import * as actions from './actions'
import { State, Screen } from './state'
type Action = GetActions<typeof import('./actions')>

const initialState: State = {
  currentScreen: Screen.MainMenu,
}

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.changeScreen:
      return {
        ...state,
        currentScreen: action.payload.screen,
      }
    default:
      return state
  }
}

export default reducer
export type State = State
export { actions }

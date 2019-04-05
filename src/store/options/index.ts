import { Reducer } from 'redux'
import ActionType from './action-type'
import * as actions from './actions'
import { State } from './state'
type Action = GetActions<typeof import('./actions')>

const initialState: State = {
  size: 15,
  speed: 5,
}

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.setSize:
      return {
        ...state,
        size: action.payload.size,
      }
    case ActionType.setSpeed:
      return {
        ...state,
        speed: action.payload.speed,
      }
    default:
      return state
  }
}

export default reducer
export type State = State
export { actions }

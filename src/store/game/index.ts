import { Reducer } from 'redux'
import * as core from '../../core'
import ActionType from './action-type'
import * as actions from './actions'
import { State } from './state'
type Action = GetActions<typeof import('./actions')>

const initialState: State = core.create(15, 15)

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.changeDirection:
      return core.changeDirection(state, action.payload.direction)
    case ActionType.advance:
      return core.advance(state)
    case ActionType.start:
      return core.create(action.payload.width, action.payload.height)
    default:
      return state
  }
}

export default reducer
export type State = State
export { actions }

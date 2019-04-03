import { Reducer } from 'redux'
import * as core from '../../core'
import ActionType from './action-type'
import * as actions from './actions'
type Action = GetActions<typeof import('./actions')>

export type State = core.Game

const BOARD_SIZE = 21
const initialState: State = core.create(BOARD_SIZE, BOARD_SIZE)

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.changeDirection:
      return core.changeDirection(state, action.payload)
    case ActionType.advance:
      return core.advance(state)
    case ActionType.restart:
      return initialState
    default:
      return state
  }
}

export default reducer
export { actions }

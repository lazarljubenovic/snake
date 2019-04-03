import createAction from '../../utils/create-action'
import * as core from '../../core'
import ActionType from './action-type'

export const changeDirection = (direction: core.Coord) =>
  createAction(ActionType.changeDirection, direction)

export const advance = () =>
  createAction(ActionType.advance)

export const restart = () => 
  createAction(ActionType.restart)

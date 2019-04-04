import createAction from '../../utils/create-action'
import ActionType from './action-type'

import * as core from '../../core'

export const changeDirection = (direction: core.Coord) =>
  createAction(ActionType.changeDirection, { direction })

export const advance = () =>
  createAction(ActionType.advance)

export const start = (size: number) =>
  createAction(ActionType.start, { width: size, height: size })

import createAction from '../../utils/create-action'
import ActionType from './action-type'

export const tryToSet = (locale: string) =>
  createAction(ActionType.tryToSet, { locale })

export const w = () => createAction(ActionType.w)

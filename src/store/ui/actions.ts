import createAction from '../../utils/create-action'
import ActionType from './action-type';
import { Screen } from './state'

export const changeScreen = (screen: Screen) =>
  createAction(ActionType.changeScreen, { screen })

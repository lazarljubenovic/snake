import createAction from '../../utils/create-action'
import ActionType from './action-type'

export const setSize = (size: number) => 
  createAction(ActionType.setSize, { size })

export const setSpeed = (speed: number) => 
  createAction(ActionType.setSpeed, { speed })

  export const z = () => createAction(ActionType.z)

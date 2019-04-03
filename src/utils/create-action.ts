import * as Redux from 'redux'

export type Action<T extends string> = Redux.Action<T>

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

function createAction<T extends string> (type: T): Action<T>
function createAction<T extends string, P extends Record<string, any>> (type: T, payload: P): ActionWithPayload<T, P>
function createAction<T extends string, P extends Record<string, any>> (type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload }
}

export default createAction

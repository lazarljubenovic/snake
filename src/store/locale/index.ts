import { Reducer } from 'redux'
import ActionType from './action-type'
import * as actions from './actions'
import { State } from './state'
import { languages, Language } from '../../strings'
type Action = GetActions<typeof import('./actions')>

const initialState: State = {
  locale: 'sr'
}

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.tryToSet:
      // const found = languages.find(lng => lng == action.payload.locale) as Language
      // if (found != null) {
      //   return { locale: found }
      // } else {
      //   return { locale: 'en' }
      // }
      return { locale: 'sr' }
    default:
      return state
  }
}

export default reducer
export type State = State
export { actions }

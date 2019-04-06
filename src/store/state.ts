import * as game from './game'
import * as ui from './ui'
import * as options from './options'
import * as locale from './locale'
import { WithFirebaseProps, FirebaseReducer } from 'react-redux-firebase'

interface FirebaseProfileProviderDataGoogle {
  providerId: 'google.com'
  displayName: string
  email: string
  photoURL: string
  uid: string
}

type FirebaseProfileProviderData = FirebaseProfileProviderDataGoogle

// export type FirebaseProfile = {
//   isLoaded: boolean
//   isEmpty: true
// } | {
//   isLoaded: boolean
//   isEmpty: false
//   avatarUrl: string
//   displayName: string
//   email: string
//   providerData: Array<FirebaseProfileProviderData>
// }

interface _State {
  game: game.State
  ui: ui.State
  options: options.State,
  locale: locale.State,
}

export default interface State extends _State {
  firebase: FirebaseReducer.Reducer
}

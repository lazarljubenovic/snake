// make react-redux-firebase aware of the schema, globally
import 'react-redux-firebase'
declare module 'react-redux-firebase' {
  export interface FirebaseRtdbSchema extends RtdbSchema { }
}

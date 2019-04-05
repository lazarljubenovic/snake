import * as React from 'react'
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux'
import * as store from '../store'
import Counter from './Counter';
import { Screen } from '../store/ui/state'
import bind from 'bind-decorator'
import { firebaseConnect } from 'react-redux-firebase'
import { withFirebase, WithFirebaseProps } from 'react-redux-firebase'
import { compose } from 'redux'
import { timingSafeEqual } from 'crypto';
// import { FirebaseProfile } from '../store/state';

export interface StateProps {
  speed: number
  size: number
  profile: any // FirebaseProfile
}

export interface DispatchProps {
  clickPlay: (size: number) => void
  clickHighScores: () => void
  clickInstructions: () => void

  changeSpeed: (speed: number) => void
  changeSize: (size: number) => void
}

export interface OwnProps {

}

export type Props = StateProps & DispatchProps & OwnProps & WithFirebaseProps<any>

export const formatTwoDigits = (value: number) => value.toString().padStart(2, '0')

export class MainMenu extends React.Component<Props> {

  public constructor(props: Props) {
    super(props)
    console.log(props)
  }

  @bind private play() {
    this.props.clickPlay(this.props.size)
  }

  @bind private async loginLogoutButtonClick() {
    if (!this.props.profile.isLoaded) return
    if (this.props.profile.isEmpty) {
      // log in
      // @todo: what's wrong with types?
      this.props.firebase.login({
        provider: 'google',
        type: 'popup',
      } as any)
    } else {
      this.props.firebase.logout()
    }
  }

  public render() {
    const speedCounterProps: React.ComponentProps<typeof Counter> = {
      value: this.props.speed,
      valueChange: this.props.changeSpeed,
      min: 1,
      max: 9,
      step: 1,
      format: formatTwoDigits,
    }

    const sizeCounterProps: React.ComponentProps<typeof Counter> = {
      value: this.props.size,
      valueChange: this.props.changeSize,
      min: 9,
      max: 21,
      step: 2,
      format: formatTwoDigits,
    }

    const loginButtonText = !this.props.profile.isLoaded
      ? 'Loading...'
      : this.props.profile.isEmpty
        ? 'Log in'
        : 'Log out'

    const loggedInAsClassNames = ['logged-in-as']
    if (!this.props.profile.isLoaded || this.props.profile.isEmpty) loggedInAsClassNames.push('hide')

    const username = this.props.profile.isLoaded && !this.props.profile.isEmpty
      ? this.props.profile.displayName
      : ''

    return (
      <div className="main-menu">

        <div className="area">
          <button onClick={this.play}>Play</button>
          <div className="settings">
            <div className="setting">
              <span>Speed</span>
              <Counter {...speedCounterProps} />
            </div>
            <div className="setting">
              <span>Size</span>
              <Counter {...sizeCounterProps} />
            </div>
          </div>
        </div>

        <div className="area horizontal">
          <button onClick={this.props.clickHighScores}>High scores</button>
          <button onClick={this.props.clickInstructions}>Instructions</button>
        </div>

        <div className="area">
          <button
            disabled={!this.props.profile.isLoaded}
            onClick={this.loginLogoutButtonClick}
          >
            {loginButtonText}
          </button>
          <span className={loggedInAsClassNames.join(' ')}>
            Logged in as {username}
          </span>
        </div>

      </div >
    )
  }

}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, store.State> = (state: any, ownProps) => {
  return {
    speed: state.options.speed,
    size: state.options.size,
    profile: state.firebase.profile,
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch, ownProps) => {
  return {
    clickPlay: (size: number) => {
      dispatch(store.game.actions.start(size))
      dispatch(store.ui.actions.changeScreen(Screen.Game))
    },
    clickHighScores: () => {
      dispatch(store.ui.actions.changeScreen(Screen.HighScores))
    },
    clickInstructions: () => {
      dispatch(store.ui.actions.changeScreen(Screen.Instructions))
    },

    changeSpeed: (speed: number) => {
      dispatch(store.options.actions.setSpeed(speed))
    },
    changeSize: (size: number) => {
      dispatch(store.options.actions.setSize(size))
    },
  }
}

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
)(MainMenu)

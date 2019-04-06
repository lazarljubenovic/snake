import * as React from 'react'
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux'
import * as store from '../store'
import Counter from './Counter';
import { Screen } from '../store/ui/state'
import bind from 'bind-decorator'
import { firebaseConnect } from 'react-redux-firebase'
import { withFirebase, WithFirebaseProps } from 'react-redux-firebase'
import { compose } from 'redux'
import Alert from './Alert';

export const formatTwoDigits = (value: number) => value.toString().padStart(2, '0')

interface StateProps {
  speed: number
  size: number
  profile: RtdbProfile
}

interface DispatchProps {
  startGameFromMainMenu: (size: number) => void
  goToHighScoresScreen: () => void
  goToInstructionsScreen: () => void
  goToLogInScreen: () => void

  changeSpeed: (speed: number) => void
  changeSize: (size: number) => void
}

interface OwnProps {

}

type Props = StateProps & DispatchProps & OwnProps & WithFirebaseProps<any>

interface State {
  isCannotViewHighScoresAlertOpen: boolean
}

export class MainMenu extends React.Component<Props, State> {

  public state = {
    isCannotViewHighScoresAlertOpen: false
  }

  public constructor(props: Props) {
    super(props)
  }

  @bind private play() {
    const isMobile = (window as any).__IS_MOBILE__
    if (isMobile) document.body.requestFullscreen()
    this.props.startGameFromMainMenu(this.props.size)
  }

  @bind private async loginLogoutButtonClick() {
    if (!this.props.profile.isLoaded) return
    if (this.props.profile.isEmpty) {
      this.props.goToLogInScreen()
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
      <div className="screen main-menu">

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
          <button onClick={this.scoresClick}>
            Scores
          </button>
          <button onClick={this.props.goToInstructionsScreen}>
            Rules
          </button>
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

        {
          this.state.isCannotViewHighScoresAlertOpen &&
          <Alert onAction={this.closeCannotViewHighScoresAlert}>
            Guests cannot view scores. You must log in.
          </Alert>
        }

      </div >
    )
  }

  @bind private scoresClick() {
    if (!this.props.profile.isLoaded || this.props.profile.isEmpty) {
      this.openCannotViewHighScoresAlert()
    } else {
      this.props.goToHighScoresScreen()
    }
  }

  @bind private openCannotViewHighScoresAlert() {
    this.setState({ isCannotViewHighScoresAlertOpen: true })
  }

  @bind private closeCannotViewHighScoresAlert() {
    this.setState({ isCannotViewHighScoresAlertOpen: false })
  }

}

// @todo type
const mapStateToProps: MapStateToProps<StateProps, OwnProps, store.State> = (state: any, ownProps) => {
  return {
    speed: state.options.speed,
    size: state.options.size,
    profile: state.firebase.profile,
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch, ownProps) => {
  return {
    startGameFromMainMenu: (size: number) => {
      dispatch(store.game.actions.start(size))
      dispatch(store.ui.actions.changeScreen(Screen.Game))
    },
    goToHighScoresScreen: () => {
      dispatch(store.ui.actions.changeScreen(Screen.HighScores))
    },
    goToInstructionsScreen: () => {
      dispatch(store.ui.actions.changeScreen(Screen.Instructions))
    },
    goToLogInScreen: () => {
      dispatch(store.ui.actions.changeScreen(Screen.LogIn))
    },

    changeSpeed: (speed: number) => {
      dispatch(store.options.actions.setSpeed(speed))
    },
    changeSize: (size: number) => {
      dispatch(store.options.actions.setSize(size))
    },
  }
}

export default (compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
)(MainMenu) as any) 

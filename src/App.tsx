import * as React from 'react'
import Game from './components/Game'
import MainMenu from './components/MainMenu'
import HighScores from './components/HighScores'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import * as store from './store'
import { Screen } from './store/ui/state'
import Instructions from './components/Instructions'
import LogIn from './components/LogIn'
import bind from 'bind-decorator'
import { firebaseConnect, WithFirebaseProps } from 'react-redux-firebase';
import { compose } from 'redux';

function getLastNotGreaterThan(n: number, ns: number[]): number {
  if (n <= ns[0]) return ns[0]
  for (let i = 1; i < ns.length; i++) {
    if (n < ns[i]) return ns[i - 1]
  }
  return ns[ns.length - 1]
}

interface StateProps {
  isMainMenuScreen: boolean
  isGameScreen: boolean
  isHighScoresScreen: boolean
  isInstructionsScreen: boolean
  isLogInScreen: boolean
  speed: number
  size: number
}

interface DispatchProps {
  goToMainMenu: () => void
}

interface OwnProps {

}

type Props = StateProps & DispatchProps & OwnProps & WithFirebaseProps<any>

class App extends React.Component<Props> {

  public componentWillMount() {
    this.updateSizes()
    window.addEventListener('resize', this.onResize)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  public componentWillReceiveProps(props: Props) {
    if (props.size != this.props.size || props.speed != this.props.speed) {
      this.updateSizes()
    }
  }

  public render() {
    return (
      <div>
        {
          this.props.isMainMenuScreen &&
          <MainMenu />
        }
        {
          this.props.isGameScreen &&
          <Game
            facebook={this.facebook}
            google={this.google}
          />
        }
        {
          this.props.isHighScoresScreen &&
          <HighScores />
        }
        {
          this.props.isInstructionsScreen &&
          <Instructions />
        }
        {
          this.props.isLogInScreen &&
          <LogIn
            onFacebook={this.facebook}
            onGoogle={this.google}
          />
        }
      </div>
    )
  }

  @bind private async facebook() {
    await this.props.firebase.login({
      provider: 'facebook',
      type: 'popup',
    })
  }

  @bind private async google() {
    await this.props.firebase.login({
      provider: 'google',
      type: 'popup',
    })
  }

  @bind private onResize() {
    this.updateSizes()
  }

  private updateSizes() {
    const w = window.innerWidth
    const h = window.innerHeight

    const sizes = [6, 12, 18, 24, 30, 36]
    const cellSizeWidth = getLastNotGreaterThan(w / (7 * this.props.size / 6 + 1), sizes)
    const cellSizeHeight = getLastNotGreaterThan(h / (7 * this.props.size / 6 + 3.5), sizes)
    const cellSize = Math.min(cellSizeWidth, cellSizeHeight)
    this.setProp('board-cell-size', cellSize + 'px')
  }

  private setProp(propName: string, value: any) {
    document.documentElement!.style.setProperty(`--${propName}`, value)
  }

}

const firebaseConnected = firebaseConnect<OwnProps>([])

const mapStateToProps: MapStateToProps<StateProps, OwnProps, store.State> = (state, ownProps) => {
  return {
    isMainMenuScreen: state.ui.currentScreen == Screen.MainMenu,
    isGameScreen: state.ui.currentScreen == Screen.Game,
    isHighScoresScreen: state.ui.currentScreen == Screen.HighScores,
    isInstructionsScreen: state.ui.currentScreen == Screen.Instructions,
    isLogInScreen: state.ui.currentScreen == Screen.LogIn,
    speed: state.options.speed,
    size: state.options.size,
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch, ownProps) => {
  return {
    goToMainMenu: () => {
      dispatch(store.ui.actions.changeScreen(Screen.MainMenu))
    }
  }
}

export default compose(
  firebaseConnected,
  connect(mapStateToProps, mapDispatchToProps),
)(App)

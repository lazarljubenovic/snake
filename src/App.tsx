import * as React from 'react'
import Game from './components/Game'
import MainMenu from './components/MainMenu'
import HighScores from './components/HighScores'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import * as store from './store'
import { Screen } from './store/ui/state';
import Instructions from './components/Instructions';

interface StateProps {
  isMainMenuScreen: boolean
  isGameScreen: boolean
  isHighScoresScreen: boolean
  isInstructionsScreen: boolean
}

interface DispatchProps {

}

interface OwnProps {

}

type Props = StateProps & DispatchProps & OwnProps

class App extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.isMainMenuScreen && <MainMenu />}
        {this.props.isGameScreen && <Game />}
        {this.props.isHighScoresScreen && <HighScores />}
        {this.props.isInstructionsScreen && <Instructions />}
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, store.State> = (state, ownProps) => {
  return {
    isMainMenuScreen: state.ui.currentScreen == Screen.MainMenu,
    isGameScreen: state.ui.currentScreen == Screen.Game,
    isHighScoresScreen: state.ui.currentScreen == Screen.HighScores,
    isInstructionsScreen: state.ui.currentScreen == Screen.Instructions,
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

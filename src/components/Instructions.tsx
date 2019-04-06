import * as React from 'react'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import * as store from '../store'
import { Screen } from '../store/ui/state'
import bind from 'bind-decorator'
import { compose } from 'redux'

interface StateProps {
}

interface DispatchProps {
  goToMainMenu: () => void
}

interface OwnProps {

}

interface State {
}

type Props = StateProps & DispatchProps & OwnProps

class Instructions extends React.Component<Props, State> {

  public render() {

    return (
      <div className="screen instructions">
        <div className="panels">

          <div className="panel">
            <h2>Goal</h2>
            <p>
              Collect as many dots.
              Each dot increases your length by 1.
            </p>
          </div>

          <div className="panel">
            <h2>Careful!</h2>
            <p>
              Do not bump into walls.
              Do not bump into yourself.
            </p>
          </div>

          <div className="panel">
            <h2>Controls</h2>
            <p>
              Use arrow keys or WASD.
              Alternatively, swipe across the screen.
            </p>
          </div>

          <div className="panel">
            <h2>Credits</h2>
            <p>
              Made by <a href="https://github.com/lazarljubenovic">@lazarljubenovic</a>.
              Game is open source.
              Find it on <a href="https://github.com/lazarljubenovic/snake">GitHub</a>.
            </p>
          </div>

        </div>
        <div className="actions">
          <button onClick={this.props.goToMainMenu}>Back</button>
        </div>
      </div>
    )
  }

}

// const firebaseConnected = firebaseConnect([])

const mapStateToProps: MapStateToProps<StateProps, OwnProps, store.State> = (state, ownProps) => {
  return {
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
  // firebaseConnected,
  connect(mapStateToProps, mapDispatchToProps),
)(Instructions)

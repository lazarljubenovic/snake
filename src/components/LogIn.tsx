import * as React from 'react'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import * as store from '../store'
import { Screen } from '../store/ui/state'
import bind from 'bind-decorator'
import { compose } from 'redux'
import { firebaseConnect, WithFirebaseProps } from 'react-redux-firebase';

interface StateProps {
}

interface DispatchProps {
  goToMainMenu: () => void
}

interface OwnProps {

}

interface State {
}

type Props = StateProps & DispatchProps & OwnProps & WithFirebaseProps<any>

class LogIn extends React.Component<Props, State> {

  @bind private async facebook() {
    const result = await this.props.firebase.login({
      provider: 'facebook',
      type: 'popup',
    } as any)
    this.props.goToMainMenu()
  }

  @bind private async twitter() {
    const result = await this.props.firebase.login({
      provider: 'twitter',
      type: 'popup',
    } as any)
    this.props.goToMainMenu()
  }

  @bind private async google() {
    const result = await this.props.firebase.login({
      provider: 'google',
      type: 'popup',
    } as any)
    this.props.goToMainMenu()
  }

  @bind private async github() {
    const result = await this.props.firebase.login({
      provider: 'github',
      type: 'popup',
    } as any)
    this.props.goToMainMenu()
  }

  public render() {

    return (
      <div className="log-in">

        <div className="options">
          <button onClick={this.facebook}>Facebook</button>
          {/* <button onClick={this.twitter}>Twitter</button> */}
          <button onClick={this.google}>Google</button>
          {/* <button onClick={this.github}>GitHub</button> */}
        </div>

        <div className="actions">
          <button onClick={this.props.goToMainMenu}>Back</button>
        </div>

      </div>
    )
  }

}

const firebaseConnected = firebaseConnect([])

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
  firebaseConnected,
  connect(mapStateToProps, mapDispatchToProps),
)(LogIn)

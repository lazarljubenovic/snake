import * as React from 'react'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import * as store from '../store'
import { Screen } from '../store/ui/state'
import { compose } from 'redux'
import LogInDumb from './LogIn.dumb'
import ScreenCmp from './Screen'

interface StateProps {
}

interface DispatchProps {
  back: () => void
}

interface OwnProps {
  onFacebook: () => Promise<void>
  onGoogle: () => Promise<void>
}

interface State {
}

type Props = StateProps & DispatchProps & OwnProps // & WithFirebaseProps<any>

class LogIn extends React.Component<Props, State> {

  public render() {
    return (
      <ScreenCmp className="log-in">
        <LogInDumb
          onFacebook={this.props.onFacebook}
          onGoogle={this.props.onGoogle}
          onBack={this.props.back}
        />
      </ScreenCmp>
    )
  }

}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, store.State> = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch, ownProps) => {
  return {
    back: () => {
      dispatch(store.ui.actions.changeScreen(Screen.MainMenu))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(LogIn)

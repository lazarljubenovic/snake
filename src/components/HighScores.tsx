import * as React from 'react'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import * as store from '../store'
import { Screen } from '../store/ui/state'
import bind from 'bind-decorator'
import { compose } from 'redux'
import { firebaseConnect, WithFirebaseProps, KvPairs } from 'react-redux-firebase'
import Counter from './Counter';
import { formatTwoDigits } from './MainMenu';

interface StateProps {
  scores: KvPairs<RtdbGameScore> | undefined
}

interface DispatchProps {
  toMainMenu: () => void
}

interface OwnProps {

}

enum Tab {
  All,
  Mode,
}

interface State {
  currentTab: Tab
  speed: number
  size: number
}

type Props = StateProps & DispatchProps & OwnProps & WithFirebaseProps<any>

class HighScores extends React.Component<Props, State> {

  public state = {
    currentTab: Tab.All,
    speed: 5,
    size: 15,
  }

  private get scores(): (RtdbGameScore & { key: string })[] | null {
    const { scores } = this.props
    if (scores == null) return null

    const filteredScores = this.state.currentTab == Tab.Mode
      ? scores.filter(({ value }) => value.size == this.state.size && value.speed == this.state.speed)
      : scores

    return filteredScores.map(({ key, value }) => ({ key, ...value }))
  }

  @bind private changeTabToAll() {
    this.setState({ currentTab: Tab.All })
  }

  @bind private changeTabToMode() {
    this.setState({ currentTab: Tab.Mode })
  }

  @bind private changeSpeed(speed: number) {
    this.setState({ speed })
  }

  @bind private changeSize(size: number) {
    this.setState({ size })
  }

  public render() {
    const speedCounterProps: React.ComponentProps<typeof Counter> = {
      value: this.state.speed,
      valueChange: this.changeSpeed,
      min: 1,
      max: 9,
      step: 1,
      format: formatTwoDigits,
    }

    const sizeCounterProp: React.ComponentProps<typeof Counter> = {
      value: this.state.size,
      valueChange: this.changeSize,
      min: 9,
      max: 21,
      step: 2,
      format: formatTwoDigits,
    }

    const tabAllClassNames: string[] = []
    const tabModeClassNames: string[] = []
    if (this.state.currentTab == Tab.All) tabAllClassNames.push('active')
    if (this.state.currentTab == Tab.Mode) tabModeClassNames.push('active')

    return (
      <div className="screen high-scores">
        <div className="nav">
          <button onClick={this.changeTabToAll} className={tabAllClassNames.join(' ')}>All</button>
          <button onClick={this.changeTabToMode} className={tabModeClassNames.join(' ')}>Mode</button>
          <button onClick={this.props.toMainMenu}>Back</button>
        </div>

        <div className="main">
          <div className="title">
            <div className="name">
              {this.state.currentTab == Tab.All ? 'All' : 'Mode'}
            </div>
            {
              this.state.currentTab == Tab.Mode &&
              <div className="options">
                <div>
                  <div>Speed</div>
                  <Counter {...speedCounterProps} />
                </div>
                <div>
                  <div>Size</div>
                  <Counter {...sizeCounterProp} />
                </div>
              </div>
            }
          </div>

          <div className="list">
            {
              this.scores == null
                ? <div className="loading">Loading...</div>
                : this.scores.length > 0
                  ? (
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th className="right">Scr</th>
                          <th>Mode</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.scores.map((value, index) => {
                            return (
                              <tr key={value.user + value.size + value.speed + value.score + index}>
                                <td>{value.userDisplayName}</td>
                                <td className="right">{value.score}</td>
                                <td>{value.size}/{value.speed}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  )
                  : (
                    this.state.currentTab == Tab.All
                      ? (
                        <span>Apparently, nobody played the game yet...</span>
                      )
                      : (
                        <span>
                          No scores for{' '}
                          {formatTwoDigits(this.state.speed)}/{formatTwoDigits(this.state.size)}.
                        </span>
                      )
                  )
            }
          </div>
        </div>
      </div>
    )
  }

}

const firebaseConnected = firebaseConnect([
  { path: 'gameScores', queryParams: ['orderByChild=score'] },
])

const mapStateToProps: MapStateToProps<StateProps, OwnProps, store.State> = (state, ownProps) => {
  const gameScores = state.firebase.ordered.gameScores
  if (gameScores != null) gameScores.reverse()
  return {
    scores: gameScores
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch, ownProps) => {
  return {
    toMainMenu: () => {
      dispatch(store.ui.actions.changeScreen(Screen.MainMenu))
    }
  }
}

export default compose(
  firebaseConnected,
  connect(mapStateToProps, mapDispatchToProps),
)(HighScores)

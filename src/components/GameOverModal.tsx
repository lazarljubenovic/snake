import * as React from 'react'
import LogInDumb from './LogIn.dumb'
import bind from 'bind-decorator'
import Modal from './Modal'

interface Props {
  saveScore: () => Promise<void>
  score: number
  again: () => void
  back: () => void
  profile: RtdbProfile // @todo
  facebook: () => Promise<void>
  google: () => Promise<void>
}

interface State {
  isLogInOpen: boolean
}

const SCORE_TRESHOLD = 5

class GameOverModal extends React.Component<Props, State>  {

  public state = {
    isLogInOpen: false,
  }

  private buttonRef = React.createRef<HTMLButtonElement>()

  public constructor(props: Props) {
    super(props)
  }

  public componentDidMount() {
    this.focusButton()
    if (this.props.score >= SCORE_TRESHOLD && this.props.profile.isLoaded && !this.props.profile.isEmpty) {
      this.saveScore()
    }
  }

  public render() {
    const { score, again, back } = this.props

    const profile = !this.props.profile.isLoaded
      ? null
      : this.props.profile.isEmpty
        ? null
        : this.props.profile

    const className = this.state.isLogInOpen
      ? 'log-in'
      : 'game-over'

    const isNotEnoughScoreVariant = score < SCORE_TRESHOLD
    const isPleaseLoginVariant = score >= SCORE_TRESHOLD && profile == null
    const isEnteredHiScoreListVariant = score >= SCORE_TRESHOLD && profile != null

    const textBlock = [
      <h1 key={'game-over'}>Game over!</h1>,
      <p key={'score'} className="score">Score: {score}</p>,
    ]

    const actionsBlock = [
      <button key={'main-menu'} onClick={back}>Main menu</button>,
      <button key={'again'} ref={this.buttonRef} onClick={again}>Again?</button>,
    ]

    if (isNotEnoughScoreVariant) {
      textBlock.push(<p key={'low-score'}>Score 5 or more for hi-score.</p>)
    }

    if (isPleaseLoginVariant) {
      textBlock.push(<p key={'log-in-to-save'}>Log in to save score.</p>)
      actionsBlock.unshift(<button key={'log-in-button'} onClick={this.openLogInScreen}>Log in</button>)
    }

    if (isEnteredHiScoreListVariant) {
      textBlock.push(<p key={'entered-hi-score'}>Entered hi-score list!</p>)
    }

    return (
      <>
        <Modal className={className}>
          {
            this.state.isLogInOpen &&
            <LogInDumb
              onFacebook={this.props.facebook}
              onGoogle={this.props.google}
              onBack={this.closeLogInScreen}
            />
          }
          {
            !this.state.isLogInOpen &&
            <>
              <div className="text">{textBlock}</div>
              <div className="actions">{actionsBlock}</div>
            </>
          }
        </Modal>
      </>
    )
  }

  private focusButton() {
    const el = this.buttonRef.current
    if (el == null) return
    el.focus()
  }

  @bind private openLogInScreen() {
    this.setState({ isLogInOpen: true })
  }

  @bind private closeLogInScreen() {
    this.setState({ isLogInOpen: false })
    if (this.props.profile.isLoaded && !this.props.profile.isEmpty) {
      this.saveScore()
    }
  }

  @bind private saveScore() {
    this.props.saveScore()
  }

}

export default GameOverModal

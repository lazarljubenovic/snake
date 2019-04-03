import * as React from 'react'

interface Props {
  score: number
  onAgain: () => void
}

class GameOverModal extends React.Component<Props>  {

  private buttonRef = React.createRef<HTMLButtonElement>()

  public constructor (props: Props) {
    super(props)
  }

  public componentDidMount() {
    console.log('did mount')
    this.focusButton()
  }

  public render() {
    const { score, onAgain } = this.props
    return (
      <div className="modal-wrapper">
        <div className="modal game-over-modal">
          <p>Game over!</p>
          <p>Score: {score}</p>
          <button ref={this.buttonRef} onClick={onAgain}>Again?</button>
        </div>
      </div>
    )
  }

  private focusButton() {
    const el = this.buttonRef.current
    if (el == null) return
    el.focus()
  }

}

export default GameOverModal

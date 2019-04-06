import React from 'react'
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux'
import { compose } from 'redux'
import bind from 'bind-decorator'
import * as store from '../store'
import * as core from '../core'

import GameOverModal from './GameOverModal'
import ScoreBar from './ScoreBar'
import ShortInstructions from './ShortInstructions'
import { Screen } from '../store/ui/state'
import { withFirebase, WithFirebaseProps } from 'react-redux-firebase'
// import { FirebaseProfile } from '../store/state'

export interface StateProps {
  size: number
  speed: number
  matrix: core.FieldType[][]
  isGameOver: boolean
  profile: RtdbProfile
  auth: { uid: string, displayName: string }
}

export interface DispatchProps {
  advance: () => void
  changeDirection: (coord: core.Coord) => void
  restart: (size: number) => void
  toMainMenu: () => void
}

export interface OwnProps {
  facebook: () => Promise<void>
  google: () => Promise<void>
}

export type Props = StateProps & DispatchProps & OwnProps & WithFirebaseProps<any>

class Game extends React.Component<Props> {

  private interval: any
  private score: number = -1

  public constructor(props: Props) {
    super(props)
    this.setCssBoardHeight()
    this.setCssBoardWidth()
    this.startGameLoop()
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.size != this.props.size) {
      this.setCssBoardHeight()
      this.setCssBoardWidth()
    }
    if (!prevProps.isGameOver && this.props.isGameOver) {
      this.endGameLoop()
    }
  }

  public componentWillUnmount() {
    this.endGameLoop()
  }

  public render() {
    const { size, matrix } = this.props
    const width = size
    const height = size
    let snakeLength: number = 0

    const cells = []
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const index = i * width + j
        const cell = matrix[i][j]
        const classNames = ['cell']
        if (cell == core.FieldType.Snake) {
          snakeLength++
          classNames.push('snake')
        }
        if (cell == core.FieldType.Dot) classNames.push('dot')
        cells.push(<div key={index} className={classNames.join(' ')} />)
      }
    }

    this.score = snakeLength - 3

    return (
      <>
        <div className="game">
          <ScoreBar score={this.score} />
          <div className="board">{cells}</div>
          {/* <ShortInstructions /> */}
        </div>
        {
          this.props.isGameOver &&
          <GameOverModal
            saveScore={this.saveScore}
            again={this.restart}
            back={this.props.toMainMenu}
            score={this.score}
            profile={this.props.profile}
            facebook={this.props.facebook}
            google={this.props.google}
          />
        }
      </>
    )
  }

  private startGameLoop() {
    const ms = ((9 - this.props.speed) * 450 / 8) + 50
    this.interval = setInterval(this.props.advance, ms)
    document.addEventListener('keydown', this.onKeyDown)
    this.setUpSwipeDetection()
  }

  private endGameLoop() {
    clearInterval(this.interval)
    document.removeEventListener('keydown', this.onKeyDown)
    this.stripDownSwipeDetection()
  }

  @bind private async saveScore () {
    if (!this.props.profile.isLoaded) {
      return
    }

    if (this.props.profile.isEmpty) {
      return
    }

    const uid = this.props.auth.uid
    const userDisplayName = this.props.auth.displayName

    if (uid == null) return

    const gameScore: RtdbGameScore = {
      speed: this.props.speed,
      size: this.props.size,
      score: this.score,
      user: uid,
      userDisplayName: userDisplayName,
    }

    await this.props.firebase.push('gameScores', gameScore)
  }

  @bind private restart() {
    this.props.restart(this.props.size)
    this.startGameLoop()
  }

  private setCssBoardWidth() {
    const width = this.props.size
    document.documentElement!.style.setProperty('--board-width', width.toString())
  }

  private setCssBoardHeight() {
    const height = this.props.size
    document.documentElement!.style.setProperty('--board-height', height.toString())
  }

  private onKeyDown = (event: KeyboardEvent) => {
    let isArrowKey: boolean = true
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.pressUp()
        break
      case 'ArrowDown':
      case 'KeyS':
        this.pressDown()
        break
      case 'ArrowLeft':
      case 'KeyA':
        this.pressLeft()
        break
      case 'ArrowRight':
      case 'KeyD':
        this.pressRight()
        break
      default:
        isArrowKey = false
        break
    }

    if (isArrowKey) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  private pressUp = () => this.props.changeDirection(core.DIRECTION.UP)
  private pressDown = () => this.props.changeDirection(core.DIRECTION.DOWN)
  private pressLeft = () => this.props.changeDirection(core.DIRECTION.LEFT)
  private pressRight = () => this.props.changeDirection(core.DIRECTION.RIGHT)

  private setUpSwipeDetection () {
    document.addEventListener('touchstart', this.handleTouchStart, false)
    document.addEventListener('touchmove', this.handleTouchMove, false)
    document.addEventListener('touchend', this.handleTouchEnd, false)
    document.body.style.touchAction = 'none'
  }

  private stripDownSwipeDetection () {
    document.removeEventListener('touchstart', this.handleTouchStart)
    document.removeEventListener('touchmove', this.handleTouchMove)
    document.removeEventListener('touchend', this.handleTouchEnd)
    document.body.style.touchAction = ''
  }

  private swipeXPrev: number = 0
  private swipeYPrev: number = 0

  private swipeXSpeed: number = 0
  private swipeYSpeed: number = 0

  private handleTouchStart = (event: TouchEvent) => {
    event.preventDefault()
    const touch = event.touches.item(0)
    if (touch == null) return
    this.swipeXPrev = touch.pageX
    this.swipeYPrev = touch.pageY
  }

  private handleTouchMove = (event: TouchEvent) => {
    event.preventDefault()
    const touch = event.touches.item(0)
    if (touch == null) return

    this.swipeXSpeed = touch.pageX - this.swipeXPrev
    this.swipeYSpeed = touch.pageY - this.swipeYPrev

    this.swipeXPrev = touch.pageX
    this.swipeYPrev = touch.pageY
  }

  private handleTouchEnd = (event: TouchEvent) => {
    event.preventDefault()
    
    const swipeThreshold = 10
    if (Math.abs(this.swipeXSpeed) >= swipeThreshold || Math.abs(this.swipeYPrev) >= swipeThreshold) {
      if (Math.abs(this.swipeXSpeed) > Math.abs(this.swipeYSpeed)) {
        // x is dominant
        if (this.swipeXSpeed < 0) {
          this.pressLeft()
        } else {
          this.pressRight()
        }
      } else {
        // y is dominant
        if (this.swipeYSpeed < 0) {
          this.pressUp()
        } else {
          this.pressDown()
        }
      }
    }

    this.swipeXPrev = this.swipeYPrev = this.swipeXSpeed = this.swipeYSpeed = 0
  }

}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, store.State> = (state: any, ownProps) => {
  const matrix = core.getMatrix(state.game)
  const { profile } = state.firebase
  const auth = state.firebase.auth as any
  const { speed } = state.options
  const { isGameOver, width, height } = state.game
  if (width != height) throw new Error(`Board must be square!`)
  return { matrix, size: width, isGameOver, speed, profile, auth }
}

const mapDispatchoProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch, ownProps) => {
  return {
    advance: () => {
      dispatch(store.game.actions.advance())
    },
    changeDirection: (direction: core.Coord) => {
      dispatch(store.game.actions.changeDirection(direction))
    },
    restart: (size: number) => {
      dispatch(store.game.actions.start(size))
    },
    toMainMenu: () => {
      dispatch(store.ui.actions.changeScreen(Screen.MainMenu))
    },
  }
}

export default (compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchoProps),
)(Game) as any)

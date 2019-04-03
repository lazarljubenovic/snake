import React from 'react'
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux'
import bind from 'bind-decorator'
import * as store from '../store'
import * as core from '../core'

import GameOverModal from './GameOverModal'
import ScoreBar from './ScoreBar';
import ShortInstructions from './ShortInstructions';

export interface StateProps {
  height: number
  width: number
  matrix: core.FieldType[][]
  isGameOver: boolean
}

export interface DispatchProps {
  advance: () => void
  changeDirection: (coord: core.Coord) => void
  restart: () => void
}

export interface OwnProps {

}

export type Props = StateProps & DispatchProps & OwnProps

class Board extends React.Component<Props> {

  private interval: any

  public constructor(props: Props) {
    super(props)
    this.setCssBoardHeight()
    this.setCssBoardWidth()
    this.startGameLoop()
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.height != this.props.height) this.setCssBoardHeight()
    if (prevProps.width != this.props.width) this.setCssBoardWidth()
    if (!prevProps.isGameOver && this.props.isGameOver) this.endGameLoop()
  }

  public componentWillUnmount() {
    this.endGameLoop()
  }

  public render() {
    const { width, height, matrix } = this.props
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

    const score = snakeLength - 3

    return (
      <>
        <div className="game">
          <ScoreBar score={score} />
          <div className="board">
            {cells}
          </div>
          <ShortInstructions />
        </div>
        {this.props.isGameOver ? <GameOverModal onAgain={this.restart} score={score} /> : null}
      </>
    )
  }

  private startGameLoop() {
    this.interval = setInterval(this.props.advance, 150)
    document.addEventListener('keydown', this.onKeyDown)
  }

  @bind private restart() {
    this.props.restart()
    this.startGameLoop()
  }

  private endGameLoop() {
    clearInterval(this.interval)
    document.removeEventListener('keydown', this.onKeyDown)
  }

  private setCssBoardWidth() {
    document.documentElement!.style.setProperty('--board-width', this.props.width.toString())
  }

  private setCssBoardHeight() {
    document.documentElement!.style.setProperty('--board-height', this.props.height.toString())
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

}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, store.State> = (state, ownProps) => {
  const matrix = core.getMatrix(state.game)
  const { width, height, isGameOver } = state.game
  return { matrix, width, height, isGameOver }
}

const mapDispatchoProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch, ownProps) => {
  return {
    advance: () => {
      // @todo play sound
      dispatch(store.game.actions.advance())
    },
    changeDirection: (direction: core.Coord) => {
      dispatch(store.game.actions.changeDirection(direction))
    },
    restart: () => {
      // @todo play sound
      dispatch(store.game.actions.restart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchoProps)(Board)

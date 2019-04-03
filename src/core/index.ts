export type Coord = [number, number]

export const DIRECTION = {
  UP: [-1, 0] as Coord,
  LEFT: [0, -1] as Coord,
  RIGHT: [0, 1] as Coord,
  DOWN: [1, 0] as Coord,
}

function add(a: Coord, b: Coord): Coord {
  const c0 = a[0] + b[0]
  const c1 = a[1] + b[1]
  return [c0, c1]
}

function eq(a: Coord, b: Coord): boolean {
  return a[0] == b[0] && a[1] == b[1]
}

function isLegal([i, j]: Coord, width: number, height: number) {
  return 0 <= i && i <= height - 1 && 0 <= j && j <= width - 1
}

export type Snake = Array<Coord>

export interface Game {
  width: number
  height: number
  snake: Snake
  dot: Coord
  direction: Coord
  isGameOver: boolean
}

export function create(width: number, height: number): Game {
  // snake begins horizonatlly in the middle of the board, of length 3
  const i = Math.floor(height / 2)
  const j = Math.floor(width / 2)
  const snake: Snake = [
    [i, j - 1],
    [i, j],
    [i, j + 1],
  ]

  // we create a temporary game without a dot (dummy illegal values)
  const game: Game = {
    width,
    height,
    snake,
    dot: [-1, -1],
    direction: DIRECTION.RIGHT, // change to LEFT to make the snake rest
    isGameOver: false,
  }

  // then we generate the dot and thus finish generating the game
  const dot = getRandomFreeCoord(game)
  return {
    ...game,
    dot,
  }
}

export function advance(game: Game): Game {
  const snakeHead = game.snake[game.snake.length - 1]
  const nextHead = add(snakeHead, game.direction)

  const snake = [
    ...game.snake,
    nextHead,
  ]

  if (!isLegal(nextHead, game.width, game.height)) {
    return {
      ...game,
      isGameOver: true,
    }
  }

  if (!eq(game.dot, nextHead)) {
    snake.splice(0, 1)
    return {
      ...game,
      snake,
    }
  }


  const dot = getRandomFreeCoord(game)
  return {
    ...game,
    snake,
    dot,
  }
}

export function changeDirection(game: Game, direction: Coord): Game {
  const currDir = game.direction
  if (currDir == DIRECTION.LEFT && direction == DIRECTION.RIGHT) return game
  if (currDir == DIRECTION.RIGHT && direction == DIRECTION.LEFT) return game
  if (currDir == DIRECTION.UP && direction == DIRECTION.DOWN) return game
  if (currDir == DIRECTION.DOWN && direction == DIRECTION.UP) return game
  return {
    ...game,
    direction,
  }
}

export enum FieldType {
  Empty,
  Snake,
  Dot,
}

export function getMatrix(game: Game): FieldType[][] {
  // build empty matrix, fill with "false" values
  const matrix = new Array(game.height)
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(game.width).fill(FieldType.Empty)
  }

  for (const coord of game.snake) {
    const [i, j] = coord
    matrix[i][j] = FieldType.Snake
  }

  const [i, j] = game.dot
  if (i != -1 && j != -1) {
    matrix[i][j] = FieldType.Dot
  }

  return matrix
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomFreeCoord(game: Game): Coord {
  const matrix = getMatrix(game)

  const freeCoords: Coord[] = []
  matrix.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell == FieldType.Empty) {
        freeCoords.push([i, j])
      }
    })
  })

  const randomIndex = randomInt(0, freeCoords.length - 1)
  return freeCoords[randomIndex]
}

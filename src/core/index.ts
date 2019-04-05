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
  instructionQueue: Coord[]
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
    direction: DIRECTION.RIGHT,
    instructionQueue: [],
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
  const direction: Coord = (game.instructionQueue.length == 0)
    ? game.direction
    : game.instructionQueue.shift()!

  // I often set initial direction as [0, 0] while debugging.
  // The snake technically runs over itself at the same position
  // at the next tick, so I ignore that issue here.
  if (eq(direction, [0, 0])) return game

  const snakeHead = game.snake[game.snake.length - 1]
  const nextHead = add(snakeHead, direction)
  const { width, height } = game

  // If the snake runs into the wall, bye-bye snake.
  // If the snake attempts cannibalism, bye-bye snake.
  const isRunningIntoWall = !isLegal(nextHead, width, height)
  const isEatingItself = game.snake.some(coord => eq(coord, nextHead))
  if (isRunningIntoWall || isEatingItself) {
    return {
      ...game,
      direction,
      isGameOver: true,
    }
  }

  // The snake is good to go, so we extend its head.
  // We'll see if we should remove its tail or not based on if
  // the snake is eating.
  const snake = [
    ...game.snake,
    nextHead,
  ]

  // If the snake isn't eating, so we remove one coord from the tail.
  if (!eq(game.dot, nextHead)) {
    snake.splice(0, 1)
    return {
      ...game,
      snake,
      direction,
    }
  }

  // The snake has eaten the dot, so we create a new one.
  const dot = getRandomFreeCoord(game)
  return {
    ...game,
    snake,
    dot,
    direction,
  }
}

export function addInstruction(game: Game, instruction: Coord): Game {
  const latestInstruction = game.instructionQueue.length == 0
    ? game.direction
    : game.instructionQueue[game.instructionQueue.length - 1]

  // If the instruction overlaps with the latest instruction, ignore it.
  if (eq(latestInstruction, instruction)) return game

  // If the instruction is direct oposite of the latest instruction, ignore it.
  if (latestInstruction == DIRECTION.LEFT && instruction == DIRECTION.RIGHT) return game
  if (latestInstruction == DIRECTION.RIGHT && instruction == DIRECTION.LEFT) return game
  if (latestInstruction == DIRECTION.UP && instruction == DIRECTION.DOWN) return game
  if (latestInstruction == DIRECTION.DOWN && instruction == DIRECTION.UP) return game

  // Otherwise, the instruction is accepted and added to the queue.
  const instructionQueue = [
    ...game.instructionQueue,
    instruction,
  ]

  return {
    ...game,
    instructionQueue,
  }
}

export enum FieldType {
  Empty,
  Snake,
  Dot,
}

export function getMatrix(game: Game): FieldType[][] {
  const { width, height } = game

  // build empty matrix, fill with "false" values
  const matrix = new Array(height)
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(width).fill(FieldType.Empty)
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

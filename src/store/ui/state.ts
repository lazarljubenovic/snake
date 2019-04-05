export enum Screen {
  MainMenu,
  HighScores,
  Game,
  Instructions,
}

export interface State {
  currentScreen: Screen
}

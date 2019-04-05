export enum Screen {
  MainMenu,
  HighScores,
  Game,
}

export interface State {
  currentScreen: Screen
}

export enum Screen {
  MainMenu,
  HighScores,
  Game,
  Instructions,
  LogIn,
}

export interface State {
  currentScreen: Screen
}

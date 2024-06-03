export type GameTimer = {
  start: () => void;
  reset: () => void;
};

export type Result = {
  playerWon: boolean;
};

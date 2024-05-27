import Minefield from "./Minefield";
import GameSettings from "./utils/GameSettings";
import { GameTimer } from "./types/Game";

export default class Game {
  settings: GameSettings;
  minefield: Minefield;
  controlView: HTMLElement;
  headsUpDisplay: HTMLElement;
  minesRemainingView: HTMLElement;
  gameTimerView: HTMLElement;
  gameTimer: GameTimer;

  constructor() {
    const view = document.getElementById("controls");
    if (!view)
      throw new Error(
        "Required element with ID controls not found in the DOM."
      );
    this.controlView = view;

    const minesRemaining = document.getElementById("minesRemaining");
    if (!minesRemaining)
      throw new Error(
        "Required element with ID minesRemaining not found in the DOM."
      );
    this.minesRemainingView = minesRemaining;

    const gameTimerView = document.getElementById("gameTimer");
    if (!gameTimerView)
      throw new Error(
        "Required element with ID gameTimer not found in the DOM."
      );
    this.gameTimerView = gameTimerView;

    const headsUpDisplay = document.getElementById("headsUpDisplay");
    if (!headsUpDisplay)
      throw new Error(
        "Required element with ID headsUpDisplay not found in the DOM."
      );
    this.headsUpDisplay = headsUpDisplay;

    this.minesRemainingView = minesRemaining;
    this.settings = new GameSettings();
    this.minefield = new Minefield(
      this.settings.difficulty,
      this.updateRemainingMinesView.bind(this)
    );

    this.gameTimer = ((updateTimerView): GameTimer => {
      let time: number;
      let interval: ReturnType<typeof setInterval>;

      return {
        start: () => {
          time = 0;
          interval = setInterval(() => {
            time++;
            updateTimerView(time);
          }, 1000);
        },
        reset: () => {
          clearInterval(interval);
          time = 0;
          updateTimerView(time);
        },
      };
    })(this.updateTimerView.bind(this));
  }

  onChangeDifficulty(difficulty) {
    this.settings.difficulty = difficulty;
    this.minefield.onChangeDifficulty(this.settings.difficulty);
  }

  onClickStart() {
    this.gameTimer.start();
    this.removeControlView();
    this.addHudView();
    this.minefield.onStart();
  }

  onClickReset() {
    this.gameTimer.reset();
    this.minefield.onReset();
    this.removeHudView();
    this.addControlView();
  }

  addControlView() {
    this.controlView.style.display = "block";
  }

  removeControlView() {
    this.controlView.style.display = "none";
  }

  addHudView() {
    this.headsUpDisplay.style.display = "flex";
  }

  removeHudView() {
    this.headsUpDisplay.style.display = "none";
  }

  updateRemainingMinesView(minesRemaining: number) {
    const existingMinesRemaining = Number(this.minesRemainingView.innerHTML);
    if (minesRemaining === existingMinesRemaining) return;
    this.minesRemainingView.innerHTML = String(minesRemaining);
  }

  updateTimerView(time) {
    this.gameTimerView.innerHTML = "" + time;
  }
}

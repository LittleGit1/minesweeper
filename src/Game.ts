import Minefield from "./Minefield";
import GameSettings from "./utils/GameSettings";
import { GameTimer, Result } from "./types/Game";

export default class Game {
  settings: GameSettings;
  minefield: Minefield;
  controlView: HTMLElement;
  headsUpDisplay: HTMLElement;
  minesRemainingView: HTMLElement;
  gameTimerView: HTMLElement;
  gameTimer: GameTimer;

  constructor() {
    this.controlView = document.getElementById("controls") as HTMLElement;
    this.minesRemainingView = document.getElementById("minesRemaining") as HTMLElement;
    this.gameTimerView = document.getElementById("gameTimer") as HTMLElement;
    this.headsUpDisplay = document.getElementById("headsUpDisplay") as HTMLElement;


    this.settings = new GameSettings();
    this.minefield = new Minefield(
      this.settings.difficulty,
      this.updateRemainingMinesView.bind(this),
      this.onGameResult.bind(this)
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

  onClickReset(){
    this.onReset();
  }

  onReset() {
    this.gameTimer.reset();
    this.minefield.onReset();
    this.removeHudView();
    this.addControlView();
  }

  onGameResult(result: Result){
    if(result.playerWon) alert("Congratulation, you have won.");
    else alert("You touched a mine. Game over.")
    this.onReset()
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

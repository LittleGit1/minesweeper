import Game from "./src/Game";

document.addEventListener("DOMContentLoaded", function () {
  const game = new Game();

  const onChangeDifficulty = (event) =>
    game.onChangeDifficulty(event.target.value);

  const onClickStart = () => game.onClickStart();

  const onClickReset = () => game.onClickReset();

  const difficultySelect = document.getElementById(
    "difficultySelect"
  ) as HTMLElement;
  difficultySelect.addEventListener("change", onChangeDifficulty);

  const startGameButton = document.getElementById(
    "startGameButton"
  ) as HTMLElement;
  startGameButton.addEventListener("click", onClickStart);

  const resetGameButton = document.getElementById(
    "resetGameButton"
  ) as HTMLElement;
  resetGameButton.addEventListener("click", onClickReset);
});

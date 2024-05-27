import Game from "./src/Game";

document.addEventListener("DOMContentLoaded", function () {
  const game = new Game();

  const onChangeDifficulty = (event) =>
    game.onChangeDifficulty(event.target.value);

  const onClickStart = () => game.onClickStart();

  const onClickReset = () => game.onClickReset();

  const difficultySelect = document.getElementById("difficultySelect");
  if (!difficultySelect)
    throw new Error(
      "Required element with ID difficultySelect not found in the DOM."
    );
  difficultySelect.addEventListener("change", onChangeDifficulty);

  const startGameButton = document.getElementById("startGameButton");
  if (!startGameButton)
    throw new Error(
      "Required element with ID startGameButton not found in the DOM."
    );
  startGameButton.addEventListener("click", onClickStart);

  const resetGameButton = document.getElementById("resetGameButton");
  if (!resetGameButton)
    throw new Error(
      "Required element with ID resetGameButton not found in the DOM."
    );
  resetGameButton.addEventListener("click", onClickReset);
});

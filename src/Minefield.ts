import MineFlag from "./components/MineFlag";
import MinefieldCell from "./components/MinefieldCell";
import MinefieldGrid from "./components/MinefieldGrid";
import MinefieldRow from "./components/MinefieldRow";
import { BoardSettings } from "./types/Board";

export default class Minefield {
  minefieldView: HTMLElement;
  boardSettings: BoardSettings;
  minefieldGrid: HTMLElement;
  updateRemainingMinesView: (minesRemaining: number) => void;
  minesRemaining: number;

  constructor(
    boardSettings: BoardSettings,
    updateRemainingMinesView: (minesRemaining: number) => void
  ) {
    const view = document.getElementById("minefield");
    if (!view)
      throw new Error(
        "Required element with ID minefield not found in the DOM."
      );
    this.minefieldView = view;
    this.boardSettings = boardSettings;
    this.updateRemainingMinesView = updateRemainingMinesView;
    this.minesRemaining = boardSettings.boardMines;
  }

  onChangeDifficulty(boardSettings: BoardSettings) {
    this.boardSettings = boardSettings;
  }

  removeMinefieldView() {
    this.minefieldView.style.display = "none";
  }

  displayMinefieldView() {
    this.minefieldView.style.display = "flex";
  }

  onStart() {
    this.displayMinefieldView();
    this.createBoardMarkup();
    this.minesRemaining = this.boardSettings.boardMines;
    this.updateRemainingMinesView(this.minesRemaining );
  }

  onReset() {
    this.removeMinefieldView();
    this.removeBoardMarkup();
    this.updateRemainingMinesView(0);
  }

  createBoardMarkup() {
    const minefieldGrid = MinefieldGrid();

    for (let y = 0; y < this.boardSettings.rows; y++) {
      const minefieldRow = MinefieldRow();
      for (let x = 0; x < this.boardSettings.columns; x++) {
        const cell = MinefieldCell(
          x,
          y,
          this.onClickMinefieldCell.bind(this),
          this.onRightClickMinefieldCell.bind(this)
        );
        minefieldRow.appendChild(cell);
      }
      minefieldGrid.appendChild(minefieldRow);
    }
    this.minefieldGrid = minefieldGrid;
    this.minefieldView.appendChild(minefieldGrid);
  }

  removeBoardMarkup() {
    this.minefieldView.replaceChildren();
  }

  onClickMinefieldCell(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const x = Number(target.dataset.x);
    const y = Number(target.dataset.y);

    //Check if it's a bomb and fail 
    //If it's not a bomb display the number of mines it's touching
  }

  onRightClickMinefieldCell(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName !== "BUTTON") {
      // Then the user has clicked on the SVG
      const svg = target.parentNode as HTMLElement;
      svg.remove();
      this.updateRemainingMinesView(++this.minesRemaining );
      return;
    }

    const x = Number(target.dataset.x);
    const y = Number(target.dataset.y);
    const cell = this.minefieldGrid.children[y].children[x];

    if (cell.children.length > 0) {
      // Then a SVG exists but the user clicked outside of it
      cell.replaceChildren();
      this.updateRemainingMinesView( ++this.minesRemaining );
      return;
    }

    // No SVG so add one
    if (this.minesRemaining > 0) {
      cell.appendChild(MineFlag(x, y));
      this.updateRemainingMinesView(--this.minesRemaining );
    }
  }
}

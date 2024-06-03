import MineFlag from "./components/MineFlag";
import { BoardSettings } from "./types/Board";
import { Result } from "./types/Game";
import { createBoardMarkup } from "./utils/BoardUtils";
import { MineGenerator } from "./utils/MineGenerator";

export default class Minefield {
  minefieldView: HTMLElement;
  minefieldGridView: HTMLElement;
  boardSettings: BoardSettings;
  minesRemaining: number;
  mineGenerator: MineGenerator;
  minefieldCellValues: Array<Array<number>>;
  cellsOpened: number;
  updateRemainingMinesView: (minesRemaining: number) => void;
  onGameResult: (result: Result) => void;

  constructor(
    boardSettings: BoardSettings,
    updateRemainingMinesView: (minesRemaining: number) => void,
    onGameResult: (result: Result) => void
  ) {
    this.minefieldView = document.getElementById("minefield") as HTMLElement;
    this.boardSettings = boardSettings;
    this.cellsOpened = 0;
    this.updateRemainingMinesView = updateRemainingMinesView;
    this.onGameResult = onGameResult;
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
    this.minesRemaining = this.boardSettings.boardMines;
    this.displayMinefieldView();
    this.createBoardMarkup();
    this.updateRemainingMinesView(this.minesRemaining);
  }

  onReset() {
    this.removeMinefieldView();
    this.removeBoardMarkup();
    this.updateRemainingMinesView(0);
    this.cellsOpened = 0;
  }

  createBoardMarkup() {
    this.minefieldGridView = createBoardMarkup(
      this.boardSettings.columns,
      this.boardSettings.rows,
      this.onLeftClickMinefieldCell.bind(this),
      this.onRightClickMinefieldCell.bind(this)
    );
    this.minefieldView.appendChild(this.minefieldGridView);
  }

  removeBoardMarkup() {
    this.minefieldView.replaceChildren();
  }

  /**
   * Checks a cells eight adjacent cells and increments a counter if they are mines
   *
   * @param x target x coordinate
   * @param y target y coordinate.
   * @returns the number of mines this cell is touching
   */
  countAdjacentMines(x: number, y: number): number {
    const adjacentCells = [
      [-1, -1], // NORTH_WEST
      [0, -1], // NORTH
      [1, -1], // NORTH_EAST
      [-1, 0], // WEST
      [1, 0], // EAST
      [-1, 1], // SOUTH_WEST
      [0, 1], // SOUTH
      [1, 1], // SOUTH_EAST
    ];

    let count = 0;
    for (let [dx, dy] of adjacentCells) {
      if (x + dx < 0 || x + dx > this.boardSettings.columns - 1) continue;
      if (y + dy < 0 || y + dy > this.boardSettings.rows - 1) continue;

      count += this.mineGenerator.getIndexValue(x + dx, y + dy);
    }
    return count;
  }

  /**
   * Creates a 2d array of numbers. Each number corresponds to the number of mines the cell is touching
   */
  generateCellCountArray(): void {
    let arr: Array<Array<number>> = [];

    for (let y = 0; y < this.boardSettings.rows; y++) {
      let row: Array<number> = [];
      for (let x = 0; x < this.boardSettings.columns; x++) {
        if (this.mineGenerator.getIndexValue(x, y) === 1) {
          row.push(-1);
        } else {
          row.push(this.countAdjacentMines(x, y));
        }
      }
      arr.push(row);
    }
    this.minefieldCellValues = arr;
  }

  /**
   * End the game if we have opened up all of the cells that don't contain a mine
   */
  checkForWin(): void {
    if (
      this.cellsOpened + this.boardSettings.boardMines ===
      this.boardSettings.columns * this.boardSettings.rows
    )
      this.onGameResult({ playerWon: true });
  }

  /**
   * Display the number of adjacent mines the clicked <button> is touching.
   * If the cell is not touching any mines, recursively open adjacent cells.
   *
   * @param x minefield grid x plane coordinate
   * @param y minefield grid y plane coordinate
   */
  openCell(x: number, y: number) {
    const cell = this.minefieldGridView.children[y].children[x] as HTMLElement;
    if (!cell.dataset.opened) {
      cell.style.backgroundColor = "rgb(163 163 163)";
      cell.dataset.opened = "true";
      this.cellsOpened++;
      if (this.minefieldCellValues[y][x] === 0) {
        this.openAdjacentCells(x, y);
        return;
      }
      cell.innerHTML = String(this.minefieldCellValues[y][x]);
    }
  }

  /**
   * Checks whether provided coordinate pair is within the bounds of the minefield array
   * 
   * @param x the x plane coordinate to check
   * @param y the y plane coordinate to check
   * @returns true if the provided coordinates are within the bounds of the minefield array else false
   */
  checkBounds(x: number, y: number): boolean {
    const rows = this.boardSettings.rows;
    const columns = this.boardSettings.columns;
    if (x < 0 || x > columns - 1) return false;
    if (y < 0 || y > rows - 1) return false;

    return true;
  }

  /**
   * Open a cells eight adjacent cells
   *
   * @param x minefield grid x plane coordinate
   * @param y minefield grid y plane coordinate
   */
  openAdjacentCells(x: number, y: number): void {
    setTimeout(() => {
      this.checkBounds(x - 1, y - 1) && this.openCell(x - 1, y - 1); // NORTH_WEST
      this.checkBounds(x, y - 1) && this.openCell(x, y - 1); // NORTH
      this.checkBounds(x + 1, y - 1) && this.openCell(x + 1, y - 1); // NORTH_EAST
      this.checkBounds(x + 1, y) && this.openCell(x + 1, y); // EAST
      this.checkBounds(x + 1, y + 1) && this.openCell(x + 1, y + 1); // SOUTH_EAST
      this.checkBounds(x, y + 1) && this.openCell(x, y + 1); // SOUTH
      this.checkBounds(x - 1, y + 1) && this.openCell(x - 1, y + 1); // SOUTH_WEST
      this.checkBounds(x - 1, y) && this.openCell(x - 1, y); // WEST
    }, 50);
  }

  /**
   * Handles <button> events when a cell is clicked.
   * If it's the first cell clicked, init the MineGenerator
   * Terminates game if the cell clicked is a mine
   * Opens the cell if it isn't a mine
   *
   * @param event MouseEvent from <button> click
   */
  onLeftClickMinefieldCell(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    const x = Number(target.dataset.x);
    const y = Number(target.dataset.y);

    //If it's the first cell clicked create the minefield
    if (this.cellsOpened === 0) {
      this.mineGenerator = new MineGenerator(this.boardSettings, x, y);
      this.generateCellCountArray();
      this.openCell(x, y);
      return;
    }

    if (this.minefieldCellValues[y][x] === -1)
      this.onGameResult({ playerWon: false });
    else {
      this.openCell(x, y);
      this.checkForWin();
    }
  }

  /**
   * Adds or removes a flag SVG to/from the <button> element that was right clicked.
   *
   * @param event MouseEvent from <button> click
   */
  onRightClickMinefieldCell(event: MouseEvent): void {
    //No more mines to place
    if (this.minesRemaining === 0) return;

    const target = event.target as HTMLElement;

    // Can't flag cells that are already open as mines.
    if (target.dataset.opened) return;

    // If a mine marker has been placed on this cell, remove it.
    if (target.style.backgroundImage !== "") {
      target.style.backgroundImage = "";
      this.updateRemainingMinesView(++this.minesRemaining);
      return;
    }

    // Add a mine marker
    const encodedSvg = encodeURIComponent(MineFlag())
      .replace(/'/g, "%27")
      .replace(/"/g, "%22");
    const dataUri = `data:image/svg+xml,${encodedSvg}`;

    target.style.backgroundImage = `url("${dataUri}")`;
    target.style.backgroundRepeat = "no-repeat";
    target.style.backgroundPosition = "center";
    target.style.backgroundSize = "16px 16px";
    this.updateRemainingMinesView(--this.minesRemaining);

    this.checkForWin();
  }
}

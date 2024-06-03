import { BoardSettings } from "../types/Board";

export class MineGenerator {
  boardSettings: BoardSettings;
  maxMines: number;
  minesPlaced: number = 0;
  iterationCount: number = 0;
  gridCellCount: number;
  mineMap: Array<Array<number>>;
  startingX: number;
  startingY: number;

  constructor(
    boardSettings: BoardSettings,
    startingX: number,
    startingY: number
  ) {
    this.boardSettings = boardSettings;
    this.maxMines = boardSettings.boardMines; // Total mines allowed for the difficulty level
    this.minesPlaced = 0; // Count of mines already generated
    this.iterationCount = 0; // Number of grid cells already iterated
    this.gridCellCount = boardSettings.rows * boardSettings.columns; // Total number of cells in the grid
    this.startingX = startingX;
    this.startingY = startingY;
    this.fillMineArray();
  }

  fillMineArray() {
    let arr: Array<Array<number>> = [];

    for (let y = 0; y < this.boardSettings.rows; y++) {
      let subarr: Array<number> = [];
      for (let x = 0; x < this.boardSettings.columns; x++) {
        subarr.push(this.generateMine(x, y));
      }
      arr.push(subarr);
    }
    this.mineMap = arr;
  }

  destroyMineArray() {
    this.mineMap = [];
  }

  resetGenerator(): void {
    this.minesPlaced = 0;
    this.iterationCount = 0;
    this.destroyMineArray();
    this.fillMineArray();
  }

  setBoardSettings(boardSettings: BoardSettings) {
    this.boardSettings = boardSettings;
    this.maxMines = this.boardSettings.boardMines;
    this.gridCellCount = this.boardSettings.rows * this.boardSettings.columns;
    this.resetGenerator();
  }

  getIndexValue(x: number, y: number): number {
    return this.mineMap[y][x];
  }

  generateMine(x: number, y: number): number {
    // If we've already reached the max number of mines, return 0 (not a mine)
    if (this.minesPlaced >= this.maxMines) {
      this.iterationCount++;
      return 0;
    }

    if (this.startingX === x && this.startingY === y) {
      this.iterationCount++;
      return 0;
    }

    // Calculate probability of getting a mine
    const isMine =
      Math.random() <
      (this.maxMines - this.minesPlaced) /
        (this.gridCellCount - this.iterationCount);

    this.iterationCount++;

    if (!isMine) return 0;

    this.minesPlaced++;
    return 1;
  }
}

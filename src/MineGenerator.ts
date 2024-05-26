import { BoardSettings } from "./types/Board";

export class MineGenerator {
  boardSettings: BoardSettings;
  maxMines: number;
  minesPlaced: number = 0;
  iterationCount: number = 0;
  gridCellCount: number;
  mineMap: Array<Array<number>>;

  constructor(boardSettings: BoardSettings) {
    this.boardSettings = boardSettings;
    this.maxMines = boardSettings.boardMines; // Total mines allowed for the difficulty level
    this.minesPlaced = 0; // Count of mines already generated
    this.iterationCount = 0; // Number of grid cells already iterated
    this.gridCellCount = boardSettings.rows * boardSettings.columns; // Total number of cells in the grid
    this.fillMineArray();
  }

  fillMineArray() {
    this.mineMap = Array.from({ length: this.boardSettings.rows }, () =>
      Array.from({ length: this.boardSettings.columns }, () =>
        this.generateMine()
      )
    );
  }

  destroyMineArray(){
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

  generateMine(): number {
    // If we've already reached the max number of mines, return 0 (not a mine)
    if (this.minesPlaced >= this.maxMines) {
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

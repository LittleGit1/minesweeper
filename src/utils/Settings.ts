import { BoardSettings } from "../types/Board";

export default class Settings {
  static boardSettings = {
    BEGINNER: { columns: 9, rows: 9, boardMines: 10 },
    INTERMEDIATE: { columns: 16, rows: 16, boardMines: 40 },
    ADVANCED: { columns: 30, rows: 16, boardMines: 99 },
  };

  _difficulty: BoardSettings;

  constructor() {
    this._difficulty = Settings.boardSettings.BEGINNER;
  }

  get difficulty(): BoardSettings {
    return this._difficulty;
  }

  set difficulty(difficulty: string) {
    this._difficulty = Settings.boardSettings[difficulty];
  }
}

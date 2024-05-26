import { describe, expect, test } from "@jest/globals";
import { MineGenerator } from "../src/MineGenerator";
import Settings from "../src/utils/Settings";

describe("Test the MineGenerator utility class", () => {
  test("Creates the correct number of mines as per the difficulty level", () => {
    const mineGenerator = new MineGenerator(Settings.boardSettings.BEGINNER);
    const count = mineGenerator.mineMap.reduce(
      (total, row) =>
        total +
        row.reduce((rowTotal, cell) => rowTotal + (cell === 1 ? 1 : 0), 0),
      0
    );
    expect(count).toBe(Settings.boardSettings.BEGINNER.boardMines);
  });

  test("Ensure the minefield is a 2d array with the rows and columns reflecting the difficulty level", () => {
    const mineGenerator = new MineGenerator(Settings.boardSettings.BEGINNER);
    const mineArray = mineGenerator.mineMap;

    expect(mineArray.length).toEqual(Settings.boardSettings.BEGINNER.rows);

    mineArray.forEach((row) => {
      expect(row.length).toEqual(Settings.boardSettings.BEGINNER.columns);
    });
  });

  test("Ensure that changing the game difficulty generates the correct number of new mines.", () => {
    const mineGenerator = new MineGenerator(Settings.boardSettings.BEGINNER);
    mineGenerator.setBoardSettings(Settings.boardSettings.INTERMEDIATE);
    expect(mineGenerator.minesPlaced).toBe(
      Settings.boardSettings.INTERMEDIATE.boardMines
    );
  });

});

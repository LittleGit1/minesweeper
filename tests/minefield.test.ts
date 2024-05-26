import { describe, expect, test } from "@jest/globals";
import { MineGenerator } from "../src/utils/MineGenerator";
import GameSettings from "../src/utils/GameSettings";

describe("Test the MineGenerator utility class", () => {
  test("Creates the correct number of mines as per the difficulty level", () => {
    const mineGenerator = new MineGenerator(GameSettings.boardSettings.BEGINNER);
    const count = mineGenerator.mineMap.reduce(
      (total, row) =>
        total +
        row.reduce((rowTotal, cell) => rowTotal + (cell === 1 ? 1 : 0), 0),
      0
    );
    expect(count).toBe(GameSettings.boardSettings.BEGINNER.boardMines);
  });

  test("Ensure the minefield is a 2d array with the rows and columns reflecting the difficulty level", () => {
    const mineGenerator = new MineGenerator(GameSettings.boardSettings.BEGINNER);
    const mineArray = mineGenerator.mineMap;

    expect(mineArray.length).toEqual(GameSettings.boardSettings.BEGINNER.rows);

    mineArray.forEach((row) => {
      expect(row.length).toEqual(GameSettings.boardSettings.BEGINNER.columns);
    });
  });

  test("Ensure that changing the game difficulty generates the correct number of new mines.", () => {
    const mineGenerator = new MineGenerator(GameSettings.boardSettings.BEGINNER);
    mineGenerator.setBoardSettings(GameSettings.boardSettings.INTERMEDIATE);
    expect(mineGenerator.minesPlaced).toBe(
      GameSettings.boardSettings.INTERMEDIATE.boardMines
    );
  });

});

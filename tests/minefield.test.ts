import { describe, expect, test } from "@jest/globals";
import { MineGenerator } from "../src/utils/MineGenerator";
import GameSettings from "../src/utils/GameSettings";

describe("Test the MineGenerator utility class", () => {
  test("Creates the correct number of mines as per the difficulty level", () => {
    const mineGenerator = new MineGenerator(
      GameSettings.boardSettings.BEGINNER,
      0,
      0
    );
    const count = mineGenerator.mineMap.reduce(
      (total, row) =>
        total +
        row.reduce((rowTotal, cell) => rowTotal + (cell === 1 ? 1 : 0), 0),
      0
    );
    expect(count).toBe(GameSettings.boardSettings.BEGINNER.boardMines);
  });

  test("Ensure that the mine array index for the startingX and startingY parameters is 0 (not a mine)", () => {
    const STARTING_X = 3; 
    const STARTING_Y = 4;

    const mineGenerator = new MineGenerator(
      GameSettings.boardSettings.BEGINNER,
      STARTING_X,
      STARTING_Y
    );

    const indexValue = mineGenerator.mineMap[STARTING_Y][STARTING_X];

    expect(indexValue).toBe(0);
  });

  test("Ensure the minefield is a 2d array with the rows and columns reflecting the difficulty level", () => {
    const mineGenerator = new MineGenerator(
      GameSettings.boardSettings.BEGINNER,
      0,
      0
    );
    const mineArray = mineGenerator.mineMap;

    expect(mineArray.length).toEqual(GameSettings.boardSettings.BEGINNER.rows);

    mineArray.forEach((row) => {
      expect(row.length).toEqual(GameSettings.boardSettings.BEGINNER.columns);
    });
  });

  test("Ensure that changing the game difficulty generates the correct number of new mines.", () => {
    const mineGenerator = new MineGenerator(
      GameSettings.boardSettings.BEGINNER,
      0,
      0
    );
    mineGenerator.setBoardSettings(GameSettings.boardSettings.INTERMEDIATE);
    expect(mineGenerator.minesPlaced).toBe(
      GameSettings.boardSettings.INTERMEDIATE.boardMines
    );
  });
});

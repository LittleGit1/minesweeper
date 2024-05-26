import { describe, expect, test } from "@jest/globals";
import GameSettings from "../src/utils/GameSettings";

describe("Test the Settings utility class", () => {
  test("Update the game difficulty and ensure the new difficulty is reflected in the object", () => {
    const settings = new GameSettings();
    settings.difficulty = "ADVANCED";
    expect(settings.difficulty).toMatchObject(GameSettings.boardSettings.ADVANCED)
  });
});

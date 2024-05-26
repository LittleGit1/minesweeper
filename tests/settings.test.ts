import { describe, expect, test } from "@jest/globals";
import Settings from "../src/utils/Settings";

describe("Test the Settings utility class", () => {
  test("Update the game difficulty and ensure the new difficulty is reflected in the object", () => {
    const settings = new Settings();
    settings.difficulty = "ADVANCED";
    expect(settings.difficulty).toMatchObject(Settings.boardSettings.ADVANCED)
  });
});

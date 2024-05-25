import {describe, expect, test} from '@jest/globals';
import {MineGenerator} from '../js/MineGenerator';

describe('Test the MineGenerator utility class', () => {
  test('Creates the correct number of mines', () => {
    const mineGenerator = new MineGenerator({columns: 9, rows: 9, boardMines: 10})
    const count = mineGenerator.mineMap.reduce((total, row) => 
      total + row.reduce((rowTotal, cell) => rowTotal + (cell === 1 ? 1 : 0), 0), 0);
    expect(count).toBe(10);
  });
});
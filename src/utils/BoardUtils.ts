import MinefieldCell from "./../components/MinefieldCell";
import MinefieldGrid from "./../components/MinefieldGrid";
import MinefieldRow from "./../components/MinefieldRow";

export function createBoardMarkup(
  columns: number,
  rows: number,
  onClickMinefieldCell: () => void,
  onRightClickMinefieldCell: () => void
): HTMLElement {
  const minefieldGrid = MinefieldGrid();
  for (let y = 0; y < rows; y++) {
    const minefieldRow = MinefieldRow();
    for (let x = 0; x < columns; x++) {
      const cell = MinefieldCell(
        x,
        y,
        onClickMinefieldCell,
        onRightClickMinefieldCell
      );
      minefieldRow.appendChild(cell);
    }
    minefieldGrid.appendChild(minefieldRow);
  }
  return minefieldGrid;
}

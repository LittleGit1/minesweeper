export default function MinefieldCell(
  x: number,
  y: number,
  onClickMinefieldCell: () => void,
  onRightClickMinefieldCell: (event: MouseEvent) => void
) : HTMLElement {
  const button = document.createElement("button");
  button.style.cssText =
    "width: 30px; height: 30px; display:inline-flex; justify-content: center; align-items:center; border: 1px solid black; vertical-align: middle; background-color: rgb(229 231 235);";
  button.dataset.x = String(x);
  button.dataset.y = String(y);
  button.addEventListener("click", onClickMinefieldCell);
  button.addEventListener("contextmenu", (event) => {
    event.preventDefault(); // Prevent the default context menu from appearing
    onRightClickMinefieldCell(event);
  });
  return button;
}

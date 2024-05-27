export default function MineFlag(x,y) {
  // Define the SVG namespace URI
  const SVG_NS = "http://www.w3.org/2000/svg";

  // Create an SVG element
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("xmlns", SVG_NS);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "red");
  svg.setAttribute("class", "w-4");
  svg.dataset.x = String(x);
  svg.dataset.y = String(y);

  // Create a path element
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute(
    "d",
    "M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z"
  );
  path.setAttribute("clip-rule", "evenodd");

  // Append the path to the SVG
  svg.appendChild(path);

  return svg;
}


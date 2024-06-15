
const resizeAreaWidth = 5;

let resizing = false;
let inResizeArea = false;
function getBoundaries(e: MouseEvent) {
  const th: HTMLTableCellElement = e.currentTarget as any;


  // console.log(e.offsetX);
  // th.clientWidth
  const leftBoundary = e.offsetX < resizeAreaWidth;
  const rightBoundary = e.offsetX > th.clientWidth - resizeAreaWidth;
  return {
    leftBoundary,
    rightBoundary,
    th,
  };
}

export function startResize(e: MouseEvent) {
  e.preventDefault();
  const helper = e.currentTarget as HTMLDivElement;
  let table = helper.closest("table")!;
  table.classList.add("resizing");

  // const dt = table.value.dt;

  // $table.find("th").each(function () {
  //   $(this).width(this.clientWidth);
  // });
  // const { leftBoundary, rightBoundary, th } = getBoundaries(e);
  const th = helper.parentElement as HTMLTableCellElement;
  const tr = th.parentElement as HTMLTableRowElement;
  // console.log(th);
  let colIndex = th.cellIndex;
  // if (leftBoundary) colIndex--;
  // $(th).width();

  let cols = table.querySelectorAll("col");
  let leftCol = cols[colIndex];
  let rightCol = cols[colIndex + 1];

  let leftTh = tr.children[colIndex] as HTMLTableCellElement;
  let rightTh = tr.children[colIndex + 1] as HTMLTableCellElement;

  const startX = e.pageX;
  const startLeftWidth = leftTh.offsetWidth;
  const startRightWidth = rightTh.offsetWidth;
  const tableWidth = table.offsetWidth;
  function onMouseMove(e: MouseEvent) {
    e.preventDefault();
    // console.log(e);
    const dx = e.pageX - startX;
    // console.log(dx);

    // console.log(startLeftWidth);

    leftCol.style.width = `${(startLeftWidth + dx) * 100 / tableWidth}%`;
    rightCol.style.width = `${(startRightWidth - dx) * 100 / tableWidth}%`;

    // $left.width(startLeftWidth + dx);
    // $right.width(startRightWidth - dx);
  }
  function onMouseUp(e: MouseEvent) {
    e.stopPropagation();
    table.classList.remove("resizing");
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

export function onMounted(table: HTMLTableElement) {

  for (const th of table.querySelectorAll("th")) {
    th.addEventListener("mousemove", e => {
      const { leftBoundary, rightBoundary, th } = getBoundaries(e);
      if (leftBoundary || rightBoundary) {
        if (!inResizeArea) {
          // dt.colReorder.disable();
          // $table.on("mousedown", "th", startResize);
          th.addEventListener("mousedown", startResize);
        }
        inResizeArea = true;
      } else {
        if (inResizeArea) {
          // dt.colReorder.enable();
          // $table.off("mousedown", "th", startResize);
          th.removeEventListener("mousedown", startResize);
        }
        inResizeArea = false;
      }
    });
  }
};
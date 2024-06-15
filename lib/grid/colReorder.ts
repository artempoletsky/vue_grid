

export type ColReorderEventPayload = {
  from: number;
  to: number;
};


export function startDrag(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.classList.contains("resize-helper")) {
    return;
  }
  const currentTarget = e.currentTarget as HTMLTableCellElement;
  let currentIndex = currentTarget.cellIndex;
  const startIndex = currentIndex;

  const table = currentTarget.closest("table")!;
  e.preventDefault();

  const ths = table.querySelectorAll("th");

  function onDropEnter(e: MouseEvent) {
    const th = e.currentTarget as HTMLTableCellElement;
    // console.log(th.innerText);
    const newIndex = th.cellIndex;

    if (currentIndex == newIndex) return;

    moveColumn(table, currentIndex, newIndex);
    currentIndex = newIndex;
    // console.log(currentIndex, th.cellIndex);
    // th.removeEventListener("mouseenter", onDropEnter);
  }

  for (const th of ths) {
    th.addEventListener("mouseenter", onDropEnter);
  }

  const helper = document.createElement("div");
  helper.classList.add("grid_col_reorder_helper");
  helper.innerHTML = currentTarget.innerHTML;
  helper.style.width = currentTarget.offsetWidth + "px";
  helper.style.height = currentTarget.offsetHeight + "px";

  const rect = currentTarget.getBoundingClientRect();
  const helperStartX = rect.left;
  const helperStartY = rect.top;

  const startX = e.pageX;
  const startY = e.pageY;
  helper.style.left = helperStartX + "px";
  helper.style.top = helperStartY + "px";
  document.body.appendChild(helper);
  function onMouseMove(e: MouseEvent) {
    const dx = e.pageX - startX;
    const dy = e.pageY - startY;
    helper.style.left = (helperStartX + dx) + "px";
    helper.style.top = (helperStartY + dy) + "px";
  }
  function onMouseUp(e: MouseEvent) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    for (const th of ths) {
      th.removeEventListener("mouseenter", onDropEnter);
    }
    const event = new CustomEvent<ColReorderEventPayload>("colReorder", {
      detail: {
        from: startIndex,
        to: currentIndex,
      }
    });

    table.dispatchEvent(event);
    helper.remove();
  }
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

export function moveColumn(table: HTMLTableElement, from: number, to: number) {
  // console.log(from, to);
  if (from > to) {
    [from, to] = [to, from];
  }

  for (const tr of table.querySelectorAll("tr")) {
    appendAtIndex(tr, tr.children[from], to);
  }
  const colgroup = table.querySelector("colgroup")!;
  appendAtIndex(colgroup, colgroup.children[from], to);
  // colgroup.inser
}


export function appendAtIndex(parent: Element, child: Element, index: number) {
  // const target = parent.children[index];
  // target.insertAdjacentElement("afterend", child);

  // console.log(index);
  if (index >= parent.children.length + 1) {
    // parent.removeChild(child);
    parent.appendChild(child);
  } else {
    const target = parent.children[index + 1];
    // parent.removeChild(child);
    parent.insertBefore(child, target);
  }
}
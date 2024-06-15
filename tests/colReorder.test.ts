/**
 * @vitest-environment happy-dom
 */

import { expect, test } from 'vitest'

import { moveColumn, appendAtIndex } from "../lib/grid/colReorder";

function resetTable(): any[] {
  document.body.innerHTML =
    `
<table>
  <colgroup>
    <col style="width: 10%" />
    <col style="width: 20%" />
    <col />
    <col />
    <col />
  </colgroup>
  <thead>
    <tr>
      <th>Head 1</th>
      <th>Head 2</th>
      <th>Head 3</th>
      <th>Head 4</th>
      <th>Head 5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Value 1</td>
      <td>Value 2</td>
      <td>Value 3</td>
      <td>Value 4</td>
      <td>Value 5</td>
    </tr>
  </tbody>
</table>
`;

  const table = document.querySelector("table")!;
  const headRow = table.querySelector("thead>tr")! as HTMLTableRowElement;
  const colGroup = table.querySelector("colgroup")!;

  return [
    table,
    headRow,
    colGroup,
  ]
}


test("appendAtIndex", () => {
  // Set up our document body

  let [table, headRow] = resetTable();

  expect(table).toBeDefined();

  // debugger;
  // console.log(table);

  let ths = table.querySelectorAll("th");
  expect(ths.length).toBe(5);
  expect(ths[0].innerHTML).toBe("Head 1");
  expect(ths[1].innerHTML).toBe("Head 2");

  // console.log(headRow.innerHTML);

  appendAtIndex(headRow, ths[0], 1);

  expect(headRow.children.length).toBe(5);
  ths = table.querySelectorAll("th");

  expect(ths[0].innerHTML).toBe("Head 2");
  expect(ths[1].innerHTML).toBe("Head 1");


  [table, headRow] = resetTable();
  ths = headRow.children as any;

  appendAtIndex(headRow, ths[0], 2);

  expect(ths[0].innerHTML).toBe("Head 2");
  expect(ths[1].innerHTML).toBe("Head 3");
  expect(ths[2].innerHTML).toBe("Head 1");


  [table, headRow] = resetTable();
  ths = headRow.children as any;

  appendAtIndex(headRow, ths[1], 3);


  expect(ths[0].innerHTML).toBe("Head 1");
  expect(ths[1].innerHTML).toBe("Head 3");
  expect(ths[2].innerHTML).toBe("Head 4");
  expect(ths[3].innerHTML).toBe("Head 2");
});


test("moveColumn", () => {
  let [table, headRow, colGroup] = resetTable();

  moveColumn(table, 0, 1);
  let ths = headRow.children;
  expect(ths[0].innerHTML).toBe("Head 2");
  expect(ths[1].innerHTML).toBe("Head 1");

  expect(colGroup.children[0].style.width).toBe("20%");
  expect(colGroup.children[1].style.width).toBe("10%");

  [table, headRow, colGroup] = resetTable();

  moveColumn(table, 1, 0);
  ths = headRow.children;
  expect(ths[0].innerHTML).toBe("Head 2");
  expect(ths[1].innerHTML).toBe("Head 1");

  expect(colGroup.children[0].style.width).toBe("20%");
  expect(colGroup.children[1].style.width).toBe("10%");


  [table, headRow, colGroup] = resetTable();

  moveColumn(table, 0, 2);
  ths = headRow.children;
  expect(ths[0].innerHTML).toBe("Head 2");
  expect(ths[1].innerHTML).toBe("Head 3");
  expect(ths[2].innerHTML).toBe("Head 1");

  expect(colGroup.children[0].style.width).toBe("20%");
  expect(colGroup.children[1].style.width).toBe("");
  expect(colGroup.children[2].style.width).toBe("10%");


  [table, headRow, colGroup] = resetTable();
  moveColumn(table, 1, 3);
  ths = headRow.children;
  expect(ths[0].innerHTML).toBe("Head 1");
  expect(ths[1].innerHTML).toBe("Head 3");
  expect(ths[2].innerHTML).toBe("Head 4");
  expect(ths[3].innerHTML).toBe("Head 2");

  expect(colGroup.children[0].style.width).toBe("10%");
  expect(colGroup.children[1].style.width).toBe("");
  expect(colGroup.children[2].style.width).toBe("");
  expect(colGroup.children[3].style.width).toBe("20%");
});
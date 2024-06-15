<template>
  <table ref="table">
    <colgroup>
      <col v-for="col of columns" :key="col.field" :style="{
        width: getColWidth(col.width)
      }" />
    </colgroup>
    <thead>
      <tr>
        <th v-for="col of columns" :key="col.field" @mousedown="colReorder.startDrag">
          <div class="overflow-hidden">{{ col.text || col.field }}</div>
          <div class="resize-helper" @mousedown="resize.startResize"></div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row of data">
        <td v-for="col of columns" :key="col.field">
          <slot :value="row[col.field]" :field="col.field">
            {{ row[col.field] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import * as resize from "~/lib/grid/resize";
import * as colReorder from "~/lib/grid/colReorder";

export type Column = {
  text?: string;
  width?: string | number;
  field: string;
};

const props = defineProps<{
  data: Record<string, any>[];
  columns: Column[];
}>();

const columns = ref(props.columns);
// const data = ref(props.data);

// console.log(columns);
function getColWidth(width?: string | number) {
  if (width === undefined) return undefined;
  if (typeof width == "number") return width + "px";
  return width;
}
const table = ref<HTMLTableElement>();


function onReorder({ from, to }: colReorder.ColReorderEventPayload) {

  const c = [...columns.value];
  

  const colgroup = table.value!.querySelector("colgroup")!;
  const deleted = c.splice(from, 1)[0];
  c.splice(to, 0, deleted);
  for (let i = 0; i < c.length; i++) {
    const colTag = colgroup.children[i] as HTMLTableColElement;
    c[i].width = colTag.style.width;
  }
  columns.value = c;
}

onMounted(() => {
  // resize.onMounted(table.value!);
  (window as any).moveColumn = colReorder.moveColumn;
  table.value!.addEventListener("colReorder", (e: any) => {
    // console.log(e);
    onReorder(e.detail)
  });
});
</script>

<style scoped>
table {
  table-layout: fixed;
  width: 100%;
}

table.resizing * {
  cursor: ew-resize;
}

td,
th {
  white-space: nowrap;
  border: 1px solid #eeeff1;
  padding: 5px 10px;
}

th {
  position: relative;
  text-align: left;
  border: 1px solid #eeeff1;
  padding: 5px 10px;
}

.resize-helper {
  content: "";
  position: absolute;

  left: 100%;
  top: 0;
  width: 8px;
  height: 100%;
  margin-left: -4px;

  z-index: 1;
  /* background: red; */
  cursor: ew-resize;
}

th:last-child .resize-helper {
  display: none;
}
</style>

<style>
.grid_col_reorder_helper {
  position: absolute;
  white-space: nowrap;
  border: 1px solid #838383;
  padding: 5px 10px;
  z-index: 10;
  font-weight: bold;
  background: white;
  pointer-events: none;
}
</style>
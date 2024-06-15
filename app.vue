<template>
  <div>
    <!-- <NuxtRouteAnnouncer /> -->
    <Grid v-if="data" :data="data" :columns="columns"  v-slot="slotProps">
      <TableInput :value="slotProps.value" :field="slotProps.field" />
    </Grid>
  </div>
</template>

<script setup lang="ts">
import "~/assets/css/globals.css";
import type { Commodity } from "~/server/routes/data.get";
import type { Column } from "./components/Grid.vue";

// const data = ref<Commodity[]>([]);
const { data } = useFetch("/data");
const columns = ref<Column[]>([
  { field: "name", text: "Наименование единицы", },
  { field: "price", text: "Цена", },
  { field: "quantity", text: "Кол-во", },
  { field: "commodityName", text: "Название товара", },
  { field: "total", text: "Итого", },
]);

</script>
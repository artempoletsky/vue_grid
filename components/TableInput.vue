<template>
  <!-- <div>{{ value }}</div> -->
  <div class="">
    <input :value="value" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string | number;
  field: string;
}>();
</script>

<style scoped>
input {
  width: 100%;
  border-radius: 5px;
  border: solid 1px #ccc;
  padding: 10px 15px;
  font-size: 16px;
}

input:focus {
  outline: none;
  @apply border-blue-500;
}
</style>
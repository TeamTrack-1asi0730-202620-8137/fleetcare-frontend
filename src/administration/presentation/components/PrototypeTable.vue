<template>
  <DataTable :value="rows"
    ><Column
      field="name"
      header="Nombre"
    /><Column
      field="detail"
      header="Detalle"
    /><template #empty>Sin persistencia en el modelo relacional v2.</template></DataTable
  >
</template>
<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
defineProps({ rows: Array })
</script>

<template>
  <Card
    ><template #content
      ><div class="summary-card">
        <div class="summary-icon"><i :class="icon"></i></div>
        <div>
          <span>{{ label }}</span
          ><strong>{{ value }}</strong>
        </div>
      </div></template
    ></Card
  >
</template>
<script setup>
import Card from 'primevue/card'
defineProps({ label: String, value: [String, Number], icon: String })
</script>

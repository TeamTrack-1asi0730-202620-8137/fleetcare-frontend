<template>
  <div
    v-if="errors.length"
    ref="box"
    class="full"
  >
    <Message severity="error"
      ><ul class="maintenance-errors">
        <li
          v-for="e in errors"
          :key="e"
        >
          {{ t(`maintenance.errors.${e}`) }}
        </li>
      </ul></Message
    >
  </div>
</template>
<script setup>
import { nextTick, ref, watch } from 'vue'
import Message from 'primevue/message'
import { useI18n } from 'vue-i18n'
const props = defineProps({ errors: { type: Array, default: () => [] } })
const { t } = useI18n({ useScope: 'global' })
const box = ref(null)
watch(
  () => props.errors,
  async (v) => {
    if (!v.length) return
    await nextTick()
    box.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
)
</script>
<style scoped>
.maintenance-errors {
  margin: 0;
  padding-left: 1.1rem;
}
</style>

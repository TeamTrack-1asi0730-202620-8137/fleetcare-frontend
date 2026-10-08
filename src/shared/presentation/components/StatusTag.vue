<template>
  <Tag
    :value="label"
    :severity="severity"
  />
</template>
<script setup>
import { computed } from 'vue'
import Tag from 'primevue/tag'
import { useI18n } from 'vue-i18n'
const props = defineProps({ status: { type: String, required: true } })
const { t } = useI18n({ useScope: 'global' })
const map = {
  available: ['fleet.available', 'success'],
  requires_attention: ['fleet.requiresAttention', 'warn'],
  out_of_service: ['fleet.outOfService', 'danger'],
  compliant: ['inspection.compliant', 'success'],
  non_compliant: ['inspection.nonCompliant', 'danger'],
  pending: ['inspection.pending', 'secondary'],
  reported: ['incident.reported', 'danger'],
  under_review: ['incident.underReview', 'warn'],
  resolved: ['incident.resolved', 'success'],
  upcoming: ['maintenance.upcoming', 'info'],
  overdue: ['maintenance.overdue', 'danger'],
  completed: ['maintenance.completed', 'success']
}
const entry = computed(() => map[props.status] || [props.status, 'secondary'])
const label = computed(() => (entry.value[0].includes('.') ? t(entry.value[0]) : entry.value[0]))
const severity = computed(() => entry.value[1])
</script>

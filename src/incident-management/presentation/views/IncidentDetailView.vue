<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('incident.detail') }} #{{ incident?.id }}</h1>
        <p>{{ incident?.title }}</p>
      </div>
      <Button
        icon="pi pi-arrow-left"
        severity="secondary"
        :label="t('incident.title')"
        @click="router.push('/incidents')"
      />
    </div>
    <Card v-if="incident"
      ><template #content
        ><div class="detail-grid">
          <div>
            <span>{{ t('common.vehicle') }}</span
            ><strong>{{ incident.vehicleId }}</strong>
          </div>
          <div>
            <span>{{ t('common.status') }}</span
            ><StatusTag :status="incident.status" />
          </div>
          <div class="full">
            <span>{{ t('incident.description') }}</span
            ><strong>{{ incident.description }}</strong>
          </div>
          <div class="full">
            <span>{{ t('incident.address') }}</span
            ><strong>{{ incident.address || '—' }}</strong>
          </div>
          <div
            v-if="incident.resolution"
            class="full"
          >
            <span>{{ t('incident.resolution') }}</span
            ><strong>{{ incident.resolution }}</strong>
          </div>
        </div>
        <div
          v-if="incident.status !== 'resolved'"
          class="resolution-box"
        >
          <Textarea
            v-model="resolution"
            rows="3"
            :placeholder="t('incident.resolution')"
          /><Button
            :label="t('incident.resolve')"
            icon="pi pi-check"
            @click="resolve"
          /></div></template
    ></Card>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import StatusTag from '@/shared/presentation/components/StatusTag.vue'
import { useIncidentManagementStore } from '../../application/incident-management.store.js'
const { t } = useI18n({ useScope: 'global' }),
  route = useRoute(),
  router = useRouter(),
  store = useIncidentManagementStore(),
  incident = ref(null),
  resolution = ref('')
onMounted(async () => (incident.value = await store.getIncident(route.params.id)))
async function resolve() {
  if (!resolution.value.trim()) return
  incident.value = await store.resolveIncident(incident.value.id, resolution.value.trim())
}
</script>

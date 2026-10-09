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
            ><strong>{{ vehicleLabel }}</strong>
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
          <div>
            <span>{{ t('incident.reportedBy') }}</span
            ><strong>{{ reporterName }}</strong>
          </div>
          <div>
            <span>{{ t('incident.reportedAt') }}</span
            ><strong>{{ fmt(incident.reportedAt) }}</strong>
          </div>
          <div v-if="incident.latitude && incident.longitude">
            <span>{{ t('incident.coordinates') }}</span
            ><strong>{{ incident.latitude }}, {{ incident.longitude }}</strong>
          </div>
          <div v-if="incident.resolvedAt">
            <span>{{ t('incident.resolvedAt') }}</span
            ><strong>{{ fmt(incident.resolvedAt) }}</strong>
          </div>
          <div>
            <span>{{ t('incident.updatedAt') }}</span
            ><strong>{{ fmt(incident.updatedAt) }}</strong>
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
          />
        </div>
        <div class="evidence-box">
          <h3>{{ t('incident.evidence') }}</h3>
          <ul v-if="store.evidences.length">
            <li
              v-for="e in store.evidences"
              :key="e.id"
            >
              <strong>{{ e.description }}</strong> · {{ e.fileUrl }}
            </li>
          </ul>
          <p v-else>{{ t('incident.noEvidence') }}</p>
          <div class="form-grid">
            <InputText
              v-model="evidenceForm.fileUrl"
              :placeholder="t('incident.evidenceUrl')"
            />
            <InputText
              v-model="evidenceForm.description"
              :placeholder="t('incident.description')"
            />
            <Button
              icon="pi pi-paperclip"
              :label="t('incident.addEvidence')"
              @click="attach"
            />
          </div>
        </div> </template
    ></Card>
  </section>
</template>
<script setup>
import InputText from 'primevue/inputtext'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import StatusTag from '@/shared/presentation/components/StatusTag.vue'
import { useIncidentManagementStore } from '../../application/incident-management.store.js'
import { computed } from 'vue'
import { useFleetManagementStore } from '@/fleet-management/application/fleet-management.store.js'
import { useUserAccessStore } from '@/user-access/application/user-access.store.js'

const { t } = useI18n({ useScope: 'global' }),
  route = useRoute(),
  router = useRouter(),
  store = useIncidentManagementStore(),
  fleet = useFleetManagementStore(),
  users = useUserAccessStore(),
  incident = ref(null),
  resolution = ref(''),
  evidenceForm = ref({ fileUrl: '', description: '' })

onMounted(async () => {
  incident.value = await store.getIncident(route.params.id)
  await store.fetchEvidences(route.params.id)
  await fleet.fetchVehicles(users.user?.fleetId)
  await users.fetchUsers()
})

async function resolve() {
  if (!resolution.value.trim()) return
  incident.value = await store.resolveIncident(incident.value.id, resolution.value.trim())
}

async function attach() {
  if (!evidenceForm.value.fileUrl.trim()) return
  await store.addEvidence({
    incidentId: incident.value.id,
    fileUrl: evidenceForm.value.fileUrl.trim(),
    description: evidenceForm.value.description.trim()
  })
  evidenceForm.value = { fileUrl: '', description: '' }
}

const vehicleLabel = computed(() => {
  const v = fleet.vehicles.find((x) => x.id === incident.value?.vehicleId)
  return v ? `${v.plateNumber} · ${v.brand} ${v.model}` : incident.value?.vehicleId
})
const reporterName = computed(() => {
  const u = users.users.find((x) => x.id === incident.value?.reportedByUserId)
  return u ? `${u.firstName} ${u.lastName}` : '—'
})
const fmt = (d) => (d ? new Date(d).toLocaleString() : '—')
</script>

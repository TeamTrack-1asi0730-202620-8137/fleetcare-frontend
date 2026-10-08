import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const requiredCollections = [
  'fleets',
  'roles',
  'userAccounts',
  'passwordResetTokens',
  'vehicles',
  'checklists',
  'checklistItems',
  'inspections',
  'inspectionResults',
  'inspectionEvidences',
  'incidents',
  'incidentEvidences',
  'maintenancePlans',
  'maintenanceRecords',
  'maintenanceParts',
  'mileageRecords',
  'fuelRecords'
]

const db = JSON.parse(fs.readFileSync(path.join(root, 'server', 'db.json'), 'utf8'))
const collections = Object.keys(db)
if (JSON.stringify(collections) !== JSON.stringify(requiredCollections)) {
  throw new Error(`Unexpected db.json collections: ${collections.join(', ')}`)
}

const mustExist = [
  'src/shared/infrastructure/base-api.js',
  'src/shared/infrastructure/base-endpoint.js',
  'src/router/index.js',
  'src/fleet-management/presentation/routes.js',
  'src/inspection-management/presentation/routes.js',
  'src/incident-management/presentation/routes.js',
  'src/maintenance-management/presentation/routes.js',
  'src/vehicle-operations/presentation/routes.js',
  'src/user-access/presentation/routes.js'
]
for (const file of mustExist) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing ${file}`)
}

console.log('FleetCare static structure check: OK')

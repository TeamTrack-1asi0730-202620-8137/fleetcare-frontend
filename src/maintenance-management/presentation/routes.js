const View = () => import('./views/MaintenanceView.vue')
const RecordDetail = () => import('./views/MaintenanceRecordDetailView.vue')
export default [
  {
    path: 'maintenance',
    name: 'maintenance',
    component: View,
    meta: { titleKey: 'maintenance.title', roles: ['fleet_manager'] }
  },
  {
    path: 'maintenance/records/:id',
    name: 'maintenance-record-detail',
    component: RecordDetail,
    meta: { titleKey: 'maintenance.detail', roles: ['fleet_manager'] }
  }
]

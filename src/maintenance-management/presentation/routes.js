const View = () => import('./views/MaintenanceView.vue')
export default [
  {
    path: 'maintenance',
    name: 'maintenance',
    component: View,
    meta: { titleKey: 'maintenance.title', roles: ['fleet_manager'] }
  }
]

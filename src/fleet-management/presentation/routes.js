const VehicleListView = () => import('./views/VehicleListView.vue')
const VehicleDetailView = () => import('./views/VehicleDetailView.vue')
export default [
  {
    path: 'vehicles',
    name: 'vehicles',
    component: VehicleListView,
    meta: { titleKey: 'fleet.title' }
  },
  {
    path: 'vehicles/:id',
    name: 'vehicle-detail',
    component: VehicleDetailView,
    meta: { titleKey: 'fleet.detail' }
  }
]

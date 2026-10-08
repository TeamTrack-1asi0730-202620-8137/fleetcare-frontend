const Overview = () => import('./views/OperationsOverviewView.vue')
const Mileage = () => import('./views/MileageView.vue')
const Fuel = () => import('./views/FuelView.vue')
export default [
  {
    path: 'operations',
    name: 'operations',
    component: Overview,
    meta: { titleKey: 'operations.title' }
  },
  {
    path: 'operations/mileage',
    name: 'mileage',
    component: Mileage,
    meta: { titleKey: 'operations.mileage' }
  },
  { path: 'operations/fuel', name: 'fuel', component: Fuel, meta: { titleKey: 'operations.fuel' } }
]

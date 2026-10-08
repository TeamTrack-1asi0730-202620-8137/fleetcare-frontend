const View = () => import('./views/MasterDataView.vue')
export default [
  {
    path: 'master-data',
    name: 'master-data',
    component: View,
    meta: { titleKey: 'master.title', roles: ['fleet_manager'] }
  }
]

const View = () => import('./views/DashboardView.vue')
export default [
  { path: 'dashboard', name: 'dashboard', component: View, meta: { titleKey: 'dashboard.title' } }
]

const List = () => import('./views/IncidentListView.vue')
const Detail = () => import('./views/IncidentDetailView.vue')
export default [
  { path: 'incidents', name: 'incidents', component: List, meta: { titleKey: 'incident.title' } },
  {
    path: 'incidents/:id',
    name: 'incident-detail',
    component: Detail,
    meta: { titleKey: 'incident.detail' }
  }
]

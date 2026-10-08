const List = () => import('./views/InspectionListView.vue')
const Detail = () => import('./views/InspectionDetailView.vue')
export default [
  {
    path: 'inspections',
    name: 'inspections',
    component: List,
    meta: { titleKey: 'inspection.title' }
  },
  {
    path: 'inspections/:id',
    name: 'inspection-detail',
    component: Detail,
    meta: { titleKey: 'inspection.detail' }
  }
]

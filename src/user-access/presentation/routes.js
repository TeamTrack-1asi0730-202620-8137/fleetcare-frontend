const Users = () => import('./views/UsersView.vue')
const Profile = () => import('./views/ProfileView.vue')
export default [
  {
    path: 'users',
    name: 'users',
    component: Users,
    meta: { titleKey: 'auth.users', roles: ['fleet_manager'] }
  },
  { path: 'profile', name: 'profile', component: Profile, meta: { titleKey: 'nav.profile' } }
]

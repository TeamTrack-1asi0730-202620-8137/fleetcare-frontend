import { createRouter, createWebHistory } from 'vue-router'
import pinia from '@/pinia.js'

import AppShell from '@/shared/presentation/layouts/AppShell.vue'
import AuthShell from '@/shared/presentation/layouts/AuthShell.vue'

import publicRoutes from '@/user-access/presentation/public-routes.js'
import dashboardRoutes from '@/dashboard-overview/presentation/routes.js'
import fleetRoutes from '@/fleet-management/presentation/routes.js'
import inspectionRoutes from '@/inspection-management/presentation/routes.js'
import incidentRoutes from '@/incident-management/presentation/routes.js'
import maintenanceRoutes from '@/maintenance-management/presentation/routes.js'
import operationsRoutes from '@/vehicle-operations/presentation/routes.js'
import accessRoutes from '@/user-access/presentation/routes.js'
import administrationRoutes from '@/administration/presentation/routes.js'

import { useUserAccessStore } from '@/user-access/application/user-access.store.js'

const PageNotFoundView = () => import('@/shared/presentation/views/PageNotFoundView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/auth',
      component: AuthShell,
      children: publicRoutes
    },

    {
      path: '/',
      component: AppShell,
      children: [
        {
          path: '',
          redirect: '/dashboard'
        },

        ...dashboardRoutes,
        ...fleetRoutes,
        ...inspectionRoutes,
        ...incidentRoutes,
        ...maintenanceRoutes,
        ...operationsRoutes,
        ...accessRoutes,
        ...administrationRoutes
      ]
    },

    {
      path: '/:pathMatch(.*)*',
      component: PageNotFoundView
    }
  ]
})

router.beforeEach((to) => {
  const auth = useUserAccessStore(pinia)

  if (to.meta.public) {
    if (auth.isAuthenticated && to.name === 'login') {
      return '/dashboard'
    }

    return true
  }

  if (!auth.isAuthenticated) {
    return {
      path: '/auth/login',
      query: {
        redirect: to.fullPath
      }
    }
  }

  if (to.meta.roles && !to.meta.roles.includes(auth.roleName)) {
    return '/dashboard'
  }

  return true
})

router.afterEach((to) => {
  document.title = `${to.meta.titleKey || 'FleetCare'} | FleetCare`
})

router.onError((error) => {
  console.error('FleetCare router error:', error)
})

export default router

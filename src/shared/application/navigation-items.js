export const navigationSections = [
  {
    labelKey: 'nav.principal',
    items: [
      { labelKey: 'nav.dashboard', icon: 'pi pi-home', to: '/dashboard' },
      { labelKey: 'nav.fleet', icon: 'pi pi-car', to: '/vehicles' },
      { labelKey: 'nav.inspections', icon: 'pi pi-clipboard', to: '/inspections' },
      { labelKey: 'nav.incidents', icon: 'pi pi-exclamation-triangle', to: '/incidents' },
      { labelKey: 'nav.maintenance', icon: 'pi pi-wrench', to: '/maintenance' },
      { labelKey: 'nav.operations', icon: 'pi pi-chart-line', to: '/operations' }
    ]
  },
  {
    labelKey: 'nav.administration',
    roles: ['fleet_manager'],
    items: [
      { labelKey: 'nav.access', icon: 'pi pi-users', to: '/users' },
      { labelKey: 'nav.masterData', icon: 'pi pi-database', to: '/master-data' }
    ]
  }
]

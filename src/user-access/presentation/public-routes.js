const LoginView = () => import('./views/LoginView.vue')
const RegisterView = () => import('./views/RegisterView.vue')
const RecoverView = () => import('./views/RecoverView.vue')
const ResetView = () => import('./views/ResetView.vue')

export default [
  {
    path: 'login',
    name: 'login',
    component: LoginView,
    meta: {
      public: true,
      titleKey: 'auth.login'
    }
  },
  {
    path: 'register',
    name: 'register',
    component: RegisterView,
    meta: {
      public: true,
      titleKey: 'auth.register'
    }
  },
  {
    path: 'recover',
    name: 'recover',
    component: RecoverView,
    meta: {
      public: true,
      titleKey: 'auth.recover'
    }
  },
  {
    path: 'reset',
    name: 'reset',
    component: ResetView,
    meta: {
      public: true,
      titleKey: 'auth.reset'
    }
  }
]

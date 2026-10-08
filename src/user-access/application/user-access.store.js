import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { UserAccessApi } from '../infrastructure/user-access-api.js'
import { UserAccountAssembler } from '../infrastructure/user-account.assembler.js'

const api = new UserAccessApi()

function readJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null')
  } catch {
    return null
  }
}

export const useUserAccessStore = defineStore('user-access', () => {
  const user = ref(readJson('fleetcare.user'))
  const role = ref(readJson('fleetcare.role'))
  const users = ref([])
  const roles = ref([])
  const loading = ref(false)

  const isAuthenticated = computed(() => Boolean(user.value))
  const roleName = computed(() => role.value?.name || '')

  async function login(email, password) {
    const response = await api.getUsers({ email })
    const account = response.data.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.passwordHash === password &&
        item.isActive
    )
    if (!account) throw new Error('INVALID_CREDENTIALS')

    const roleResponse = await api.getRole(account.roleId)
    user.value = UserAccountAssembler.toEntity(account)
    role.value = roleResponse.data
    localStorage.setItem('fleetcare.user', JSON.stringify(user.value))
    localStorage.setItem('fleetcare.role', JSON.stringify(role.value))
    return user.value
  }

  function logout() {
    user.value = null
    role.value = null
    localStorage.removeItem('fleetcare.user')
    localStorage.removeItem('fleetcare.role')
  }

  async function fetchUsers() {
    loading.value = true
    try {
      users.value = UserAccountAssembler.toEntities(
        await api.getUsers(user.value?.fleetId ? { fleetId: user.value.fleetId } : {})
      )
      roles.value = (await api.getRoles()).data
    } finally {
      loading.value = false
    }
  }

  async function addDriver(data) {
    const now = new Date().toISOString()
    const resource = {
      fleetId: user.value.fleetId,
      roleId: 2,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash: data.passwordHash || 'FleetCare123!',
      isActive: true,
      createdAt: now,
      updatedAt: now
    }
    const entity = UserAccountAssembler.toEntity((await api.createUser(resource)).data)
    users.value.push(entity)
    return entity
  }

  async function registerFleetManager(data) {
    const existing = (await api.getUsers({ email: data.email })).data
    if (existing.length) throw new Error('EMAIL_ALREADY_EXISTS')
    const now = new Date().toISOString()
    const fleet = (await api.createFleet({ name: data.fleetName, createdAt: now, updatedAt: now }))
      .data
    return (
      await api.createUser({
        fleetId: fleet.id,
        roleId: 1,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passwordHash: data.password,
        isActive: true,
        createdAt: now,
        updatedAt: now
      })
    ).data
  }

  async function requestPasswordReset(email) {
    const accounts = (await api.getUsers({ email })).data
    const account = accounts.find((item) => item.email.toLowerCase() === email.toLowerCase())
    if (!account) throw new Error('USER_NOT_FOUND')
    const now = new Date()
    const token = `fleetcare-${Date.now()}`
    await api.createResetToken({
      userId: account.id,
      token,
      expiresAt: new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
      usedAt: null,
      createdAt: now.toISOString()
    })
    return token
  }

  async function resetPassword(token, password) {
    const tokens = (await api.getResetTokens({ token })).data
    const resetToken = tokens.find(
      (item) => !item.usedAt && new Date(item.expiresAt).getTime() > Date.now()
    )
    if (!resetToken) throw new Error('INVALID_RESET_TOKEN')
    const account = (await api.getUser(resetToken.userId)).data
    await api.patchUser(account.id, { passwordHash: password, updatedAt: new Date().toISOString() })
    await api.patchResetToken(resetToken.id, { usedAt: new Date().toISOString() })
  }

  return {
    user,
    role,
    users,
    roles,
    loading,
    isAuthenticated,
    roleName,
    login,
    logout,
    fetchUsers,
    addDriver,
    registerFleetManager,
    requestPasswordReset,
    resetPassword
  }
})

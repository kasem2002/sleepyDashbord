import type { Permission, Role } from '@/views/pages/roles/types'

export const useRoleStore = defineStore('role', () => {
  const role = ref<Role>()

  const permissionDialog = ref(false)
  const permission = ref<Permission[]>([])

  const setRole = (value: Role) => {
    role.value = value
  }

  const setPermissionDialog = (value: boolean) => {
    permissionDialog.value = value
  }

  const setPermission = (value: Permission[]) => {
    permission.value = value
  }

  return {
    role,
    setRole,
    permissionDialog,
    setPermissionDialog,
    permission,
    setPermission,
  }
})

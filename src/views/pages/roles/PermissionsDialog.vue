<script lang="ts" setup>
import { useRoleStore } from '@/stores/RoleStore'
import { useUserStore } from '@/stores/UserStore'
import axios from '@axios'

const roleStore = useRoleStore()
const isDialogOpen = computed(() => roleStore.permissionDialog)
const isLoading = ref(false)
const role = computed(() => roleStore.role)
const permissions = ref([])
const rolePermissions = ref<string[]>([])

const getGenerarlPermissions = async () => {
  rolePermissions.value = []
  isLoading.value = true

  const { data } = await axios.get('/permissions')

  permissions.value = data.data

  const res = await axios.get('/permissions', {
    params: {
      roleId: role.value.id,
    },
  })

  res.data.data.forEach((item: any) => {
    rolePermissions.value = [
      ...rolePermissions.value,
      ...item.actions.map((action: any) => action.id),
    ]
  })
  isLoading.value = false
}

watch(isDialogOpen, val => {
  if (val)
    getGenerarlPermissions()
})

const selectAll = (permission: any) => {
  rolePermissions.value = [
    ...rolePermissions.value,
    ...permission.actions.map((item: any) => item.id),
  ]
}

const unSelectAll = (permission: any) => {
  rolePermissions.value = rolePermissions.value.filter(
    (item: any) => !permission.actions.map((item: any) => item.id).includes(item),
  )
}

const userStore = useUserStore()

const savePermissions = async () => {
  isLoading.value = true

  await axios.post(`/roles/${role.value.id}/permissions`, {
    permissions: rolePermissions.value,
  })

  isLoading.value = false

  const myPermission = await axios.get('/permissions/my-permissions')

  localStorage.setItem('myPermissions', JSON.stringify(myPermission.data.data))
  roleStore.setPermissionDialog(false)
  userStore.myPermissions = myPermission.data.data
}
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    width="65%"
    persistent
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex justify-space-between align-center sticky">
        <span class="headline">
          الصلاحيات
        </span>
        <div class="d-flex align-center">
          <VBtn
            :loading="isLoading"
            color="primary"
            @click="savePermissions"
          >
            <VIcon class="mx-2">
              mdi-check
            </VIcon>
            حفظ
          </VBtn>
          <VBtn
            variant="text"
            icon
            @click="roleStore.setPermissionDialog(false)"
          >
            <VIcon>mdi-close</VIcon>
          </VBtn>
        </div>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol
            v-for="permission in permissions"
            :key="permission.id"
            cols="12"
            md="6"
          >
            <VExpansionPanels>
              <VExpansionPanel>
                <VExpansionPanelTitle disable-icon-rotate>
                  {{ permission.subject }}
                  <template #actions>
                    <VIcon
                      size="18"
                      icon="tabler-chevron-down"
                      color="error"
                    />
                  </template>
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                  <VRow>
                    <VCol
                      v-for="action in permission.actions"
                      :key="action.id"
                      cols="12"
                      md="6"
                    >
                      <VCheckbox
                        v-model="rolePermissions"
                        :label="action.action"
                        :value="action.id"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="12"
                    >
                      <VBtn
                        color="success"
                        variant="outline"
                        @click="selectAll(permission)"
                      >
                        <VIcon class="mx-2">
                          mdi-check-all
                        </VIcon>
                        تحديد الكل
                      </VBtn>
                      <VBtn
                        class="mx-2"
                        variant="outline"
                        color="error"
                        @click="unSelectAll(permission)"
                      >
                        <VIcon class="mx-2">
                          mdi-close
                        </VIcon>
                        الغاء تحديد الكل
                      </VBtn>
                    </VCol>
                  </VRow>
                </VExpansionPanelText>
              </vexpansionpanel>
            </VExpansionPanels>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.sticky {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
}
</style>

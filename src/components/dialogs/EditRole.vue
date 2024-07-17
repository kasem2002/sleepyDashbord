<script setup lang="ts">
import { baseURL } from '@/plugins/axios'
import { useTableStore } from '@/stores/AppTableStore'
import axios from 'axios'

const emit = defineEmits(['success'])
const tableStore = useTableStore()
const isDialogOpen = computed(() => tableStore.showRole)
const id = computed(() => tableStore.RoleId)
const isLoading = ref(false)
const isFeached = ref(true)

const data = ref([])
watch(id, (newVal) => {
  if (newVal) {
    axios.get(`${baseURL}/get-permissions?roleId=${newVal}`).then((res) => {
      data.value = res.data.data
      isFeached.value = false
    })
  }
})
function post() {
  const permissions = []
  data.value.forEach((item) => {
    item.actions.forEach((action) => {
      if (action.active) {
        permissions.push(action.id)
      }
    })
  })
  axios.post(`${baseURL}/add-permission`, {
    roleId: id.value,
    permissions: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      creationDate: "2024-07-17T07:51:56.579Z",
      permissions: permissions,
    },
  }).then((res) => {
    isLoading.value = false
    tableStore.setEditRole({ show: false, id: '' })
    emit('success')
  })
}
</script>

<template>
  <VDialog v-model="isDialogOpen" max-width="400">
    <VCard :loading="isFeached">
      <VCardTitle class="headline">
        صلاحيات الدور
      </VCardTitle>
      <VCardText>
        <template v-for="(item, i) in data" :key="i">
          <h3 class="text-h6">{{ item.subject }}</h3>
          <template v-for="(permission, j) in item.actions" :key="j">
            <VCheckbox v-model="permission.active" :label="permission.action"></VCheckbox>
          </template>
        </template>
        <div class="d-flex justify-end">
          <VBtn class="mx-2" color="primary" variant="outlined"
            @click="tableStore.setEditRole({ show: false, id: '' })">
            الغاء
          </VBtn>
          <VBtn :loading="isLoading" color="error" @click="post()">
            حفظ
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </vdialog>
</template>

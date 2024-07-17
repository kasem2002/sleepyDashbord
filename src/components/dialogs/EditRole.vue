<script setup lang="ts">
import { baseURL } from '@/plugins/axios'
import { useTableStore } from '@/stores/AppTableStore'
import axios from 'axios'

const emit = defineEmits(['success'])
const tableStore = useTableStore()
const isDialogOpen = computed(() => tableStore.showRole)
const id = computed(() => tableStore.RoleId)
const isLoading = ref(false)
const data = ref([])
watch(id, (newVal) => {
  if (newVal) {
    console.log(newVal);
    axios.get(`${baseURL}/get-permissions?roleId=${newVal}`).then((res) => {
      data.value = res.data
      console.log(res.data.data);
    })
  }
})

</script>

<template>
  <VDialog v-model="isDialogOpen" max-width="400">
    <VCard :loading="true">
      <VCardTitle class="headline">
        صلاحيات الدور
      </VCardTitle>
      <VCardText>
        <template v-for="(item, i) in data" :key="i">
        </template>
        <div class="d-flex justify-end">
          <VBtn class="mx-2" color="primary" variant="outlined"
            @click="tableStore.setEditRole({ show: false, id: '' })">
            الغاء
          </VBtn>
          <VBtn :loading="isLoading" color="error" @click="deleteItem">
            حفظ
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </vdialog>
</template>

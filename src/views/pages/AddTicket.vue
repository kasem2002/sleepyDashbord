<!-- <script  setup lang="ts">
import axios from '@/plugins/axios'
import { addTicketStore } from '@/stores/AddTicketStore'
import { useTableStore } from '@/stores/AppTableStore'

const AddTicket = addTicketStore()
const TableStore = useTableStore()
const isopen = computed(() => AddTicket.setDialog)

export interface TicketBody {
  title: string | null
  ddescription: string | null
  images: string[]
  priority: number | null
}

const VarTicketBody = ref<TicketBody>({
  title: null,
  ddescription: null,
  images: [],
  priority: null,
})

const post = () => {
  const formData = new FormData()

  formData.append('title', VarTicketBody.value.title)
  formData.append('ddescription', VarTicketBody.value.ddescription)
  formData.append('images', VarTicketBody.value.images[0])
  formData.append('priority', VarTicketBody.value.priority)
  try {
    const { data } = axios.post('/tickets', formData)

    AddTicket.setDialog(false)
    TableStore.refresh(true)
  }
  catch (e) {

  }
}
</script>

<template>
  <VDialog
    v-model="isopen"
    persistent
    max-width="800px"
  >
    <VCard>
      <VCardTitle>
        <span>اضافة شكوى</span>
      </VCardTitle>
      <VSpacer />
      <VBtn
        v-model="@click=AddTicket.setDialog(false)"
        color="error"
      >
        <VIcon> mdi-close</VIcon>
      </VBtn>
    </VCard>
    <VCardText>
      <VRow class="pa-5 d-flex align-center">
        <VTextField
          v-model="VarTicketBody.title"
          titel="العنوان"
        />
      </VRow>
      <VSpacer />

      <VRow class="pa-5 d-flex align-center">
        <AppSelectField
          v-model:model-value="VarTicketBody.priority"
          titel="الاولوية "
          outlined
          item="TicketPriority"
        />
        <VFileInput
          v-model="VarTicketBody.images"
          variant="outlined"
          :show-size="1000"
          clearable
        />
      </VRow>
    </VCardText>
    <VBtn @Click="post" />
  </VDialog>
</template> -->

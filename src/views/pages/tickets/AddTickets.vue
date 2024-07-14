<script setup lang="ts">
import { toFormData } from 'axios'
import { TicketPriority } from '@/constants/enums'
import { useTableStore } from '@/stores/AppTableStore'
import { useTicketStore } from '@/stores/TikcetStore'
import axios from '@axios'

const ticketStore = useTicketStore()
const tabelStore = useTableStore()
const isDialogOpen = computed(() => ticketStore.addDialogOpen)
interface Body {
  title: string | null
  ddescription: string | null
  images: string[]
  priority: number | null

}

const body = ref<Body>({
  title: null,
  ddescription: null,
  images: [],
  priority: null,
})

const post = async () => {
  try {
    const formData = toFormData(body.value)

    body.value.images.forEach(image => {
      formData.append('images', image)
    })

    await axios.post('/tickets', formData)

    ticketStore.setDialog(false)
    tabelStore.setRefresh(true)
  }
  catch (e) {}
}
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    persistent
    max-width="800"
  >
    <VCard>
      <VCardTitle class="pa-5 d-flex align-center">
        <span>
          اضافة شكوى
        </span>
        <VSpacer />
        <VBtn
          variant="text"
          color="error"
          @Click="ticketStore.setDialog(false)"
        >
          <VIcon> mdi-close</VIcon>
        </VBtn>
      </VCardTitle>

      <VCardText>
        <VRow class="pa-5">
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="body.title"
              label="العنوان"
              outline
              type="text"
            />
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <AppSelectField
              v-model:model-value="body.priority"
              label="الاولوية"
              outline
              :items="TicketPriority"
              item-label="arName"
              item-value="value"
            />
          </VCol>
          <VCol
            cols="12"
            md="126"
          >
            <AppTextarea
              v-model="body.ddescription"
              label="الوصف"
              outline
              type="text"
            />
          </VCol>
          <VCol
            cols="12"
            md="12"
          >
            <VLabel>الصور</VLabel>
            <VFileInput
              v-model="body.images"
              variant="outlined"
              :show-size="1000"
              clearable
              multiple
            />
          </VCol>
        </VRow>
        <VBtn @click="post">
          اضافة
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { useTableStore } from '@/stores/AppTableStore'
import { useTicketStore } from '@/stores/TikcetStore'
import axios from '@axios'

const ticketStore = useTicketStore()
const tabelStore = useTableStore()
const isDialogOpen = computed(() => ticketStore.reopenTicketDialog)
const ticketId = computed(() => ticketStore.reopenId)
interface Body {
    description: string | null
}

const body = ref<Body>({
    description: null,
})

const post = async () => {
    if (!body.value.description) {
        return
    }
    try {
        console.log(ticketId)

        await axios.put(`/tickets/${ticketId.value}/reopen`, body.value.description, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        ticketStore.reopenTicketDialog = false
        body.value.description = null
        tabelStore.setRefresh(true)
    }
    catch (e) { }
}
</script>

<template>
    <VDialog v-model="isDialogOpen" persistent max-width="800">
        <VCard>
            <VCardTitle class="pa-5 d-flex align-center">
                <span>
                    اعادة فتح الشكوى
                </span>
                <VSpacer />
                <VBtn variant="text" color="error" @Click="ticketStore.reopenTicketDialog = false">
                    <VIcon> mdi-close</VIcon>
                </VBtn>
            </VCardTitle>

            <VCardText>
                <VRow class="pb-5">
                    <VCol cols="12" md="12">
                        <AppTextarea v-model="body.description" label="الوصف" outline type="text" />
                    </VCol>

                </VRow>
                <VBtn @click="post">
                    تاكيد
                </VBtn>
            </VCardText>
        </VCard>
    </VDialog>
</template>

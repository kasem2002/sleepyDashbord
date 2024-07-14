<script setup lang="ts">
import emitter from '@/plugins/emitter'
import { ref } from 'vue';

interface Props {
  eventName: string
}
const props = defineProps<Props>()

const isDialogVisible = ref<boolean>(false)
const form = ref<VForm>()
const loadBtn = ref<boolean>(false)

const body = ref({} as any)
const isEdit = ref(false)

onMounted(() => {
  emitter.on(props.eventName, (data: any) => {

    isEdit.value = data?.id !== undefined
    isDialogVisible.value = true
  })
})
watch(isDialogVisible, v => {
  if (!v) {
    body.value = {} as any
    form.value?.reset()
  }
})
onBeforeUnmount(() => {
  emitter.off(props.eventName)
})

const title = computed(() => isEdit.value ? 'تعديل نوع البضاعة' : 'اضافة نوع البضاعة')

const onFormSubmit = () => {

}
</script>

<template>
  hi
</template>

<script lang="ts" setup>
import axios from '@axios'

interface Props {
  modelValue: string | string[]
  label?: string
  rules?: any[]
  placeholder?: string
  multiple?: boolean
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const files = ref<File[]>([])

const modelValue = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value),
})

const uploadFile = async (files: File[]) => {
  const formData = new FormData()

  if (props.multiple) {
    for (let i = 0; i < files.length; i++)
      formData.append('files', files[i])
  }
  else {
    formData.append('file', files[0])
  }

  const { data } = await axios.post(`/file${props.multiple ? '/multi' : ''}`, formData)

  modelValue.value = props.multiple ? data.map((file: any) => file) : data

  // return data
}

watch(files, async value => {
  console.log("lgfflsdjfhldsjfhlkfdsjhlkdsjhlkdsflkj");

  if (value.length)
    await uploadFile(value)
})
</script>

<template>
  <div class="app-select flex-grow-1" :class="$attrs.class">
    <VLabel v-if="label" class="mb-1 text-body-2 text-high-emphasis" :text="label" />
    <VFileInput v-model="files" color="deep-purple-accent-4" counter prepend-inner-icon="mdi-paperclip" prepend-icon=""
      variant="outlined" :show-size="1000" clearable chips :rules="rules" :multiple="multiple"
      :placeholder="placeholder" />
  </div>
</template>

<script setup lang="ts">
import type { Enum } from '@/constant/enum'
import type { SelectableFieldType } from './types'

import type { Response } from '@/models/Response'
import { useDependStore } from '@/stores/DependStore'
import axios from '@axios'

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'update:objectValue'])
const dependStore = useDependStore()
const isLoading = ref<boolean>(false)
const searchInput = ref<string>('')
interface Props {
  itemValue?: string
  itemLabel?: string
  items?: SelectableFieldType[] | any[] | Enum[]
  label?: string
  modelValue?: string | SelectableFieldType | any
  getUrl?: string
  dependOn?: string
  rules?: any[]
  placeholder?: string
  disabled: boolean
  multiple?: boolean
  fetchOnSearch?: boolean
  searchKey?: string
  dependsOnValue?: any[]
  objectValue?: any
}
const itemsProps = ref(props.items)

const itemValue = computed(() => props.itemValue || 'id')
const itemLabel = computed(() => props.itemLabel || 'name')

const modelValue = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
    emit('update:objectValue', itemsProps.value.find((item: any) => item[itemValue.value] === value))
  },
})

// const disabled = computed(() => {
//   const numOfNull = props.dependsOnValue?.filter((item: any) => item.value == null).length
//   if (numOfNull > 0)
//     return true

//   if (props.disabled)
//     return true

//   return false
// })

const getData = async () => {

  if (props.getUrl) {
    try {
      isLoading.value = true

      const params = {
        deleted: false,
      }

      if (props.dependsOnValue) {
        props.dependsOnValue.forEach((item: any) => {
          params[item.name] = item.value
        })
      }
      if (props.fetchOnSearch) {
        if (props.searchKey)
          params[props.searchKey] = searchInput.value
      }

      const { data } = await axios.get<Response<SelectableFieldType>>(props.getUrl, { params })

      itemsProps.value = data.data
    }
    catch (e) {
      console.log(e)
    }
    finally {
      isLoading.value = false
    }
  }
}

onMounted(() => {
  if (!props.dependOn)
    getData()
})
watch(() => dependStore.dependValue, () => {
  if (props.dependOn)
    getData()
})



watch(() => searchInput.value, () => {

  if (props.fetchOnSearch && modelValue.value == null)
    getData()
})

const menu = ref(true)

watch(() => menu.value, () => {
  if (!menu.value)
    menu.value = true
})

const clear = () => {
  modelValue.value = null
  searchInput.value = ''
  getData()
}

</script>

<template>
  <div class="app-select flex-grow-1" :class="$attrs.class">
    <VLabel v-if="label" class="mb-1 text-body-2 text-high-emphasis" :text="label" />
    <AppAutocomplete v-model="modelValue" v-model:search="searchInput" :loading="isLoading" variant="outlined"
      :disabled="disabled" :items="itemsProps" :item-value="itemValue" :placeholder="placeholder" :rules="rules"
      no-data-text="لا يوجد بيانات" :multiple="multiple" hide-details="auto" :chips="multiple" :item-title="itemLabel"
      clearable @click:clear="clear">
      <template v -for=" (_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </AppAutocomplete>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<Props>(), {
  maxWidth: '787',
  modelValue: false,
})

const emit = defineEmits(['update:modelValue'])

interface Props {
  modelValue: boolean
  title: string
  maxWidth?: string
  atters?: any
  haderClass?: string
  bodyClass?: string
}
</script>

<template>
  <VDialog :model-value="modelValue" :max-width="props.maxWidth" v-bind="props.atters"
    @update:model-value="emit('update:modelValue', $event)">
    <!-- Dialog close btn -->

    <VCardTitle class="text-left mt-3 v-dialog-title py-3" :class="haderClass">
      <div class="d-flex-jb-ac">
        <span class="text-primary"><b>{{ title }}</b></span>
        <DialogCloseBtn @click="emit('update:modelValue', false)" />
      </div>
    </VCardTitle>

    <VCardText class="bg-background text-black pa-5 v-dialog-body" :class="bodyClass">
      <slot name="body" />
    </VCardText>
  </VDialog>
</template>

<style lang="scss" scoped>
.v-dialog-title {
  border-radius: 18px 18px 0 0 !important;
  background: #cde4fe !important;
}

.v-dialog-body {
  border-radius: 0 0 18px 18px !important;
  max-block-size: 80vh;
  overflow-y: auto;
}
</style>

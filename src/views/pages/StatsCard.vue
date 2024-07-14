<script setup lang="ts">
interface Props {
  title: string
  value: number | string
  subtitle?: string
  color?: string
  icon?: string
}
const props = defineProps<Props>()
</script>

<template>
  <VCard flat>
    <VCardTitle class="d-flex align-center ma-3">
      <span>
        {{ title }}
      </span>
      <VSpacer />
      <VBtn
        size="small"
        :color="color || 'primary'"
        variant="tonal"
      >
        <VIcon size="20">
          {{ icon || 'mdi-information' }}
        </VIcon>
      </VBtn>
    </VCardTitle>
    <VCardText class="d-flex align-center ma-5">
      <span class="text-h3 font-weight-bold">
        {{ value }}
      </span>
      <VSpacer />
      <span
        v-if="subtitle"
        class="card-subtitle"
      >
        {{ subtitle }}
      </span>
    </VCardText>
  </VCard>
</template>

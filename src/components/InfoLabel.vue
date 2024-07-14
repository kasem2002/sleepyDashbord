<script setup lang="ts">
interface Props {
  label: string
  value?: string | number
  icon?: string
  to?: string
}
const props = defineProps<Props>()
const label = computed(() => props.label)
const value = computed(() => props.value)
const icon = computed(() => props.icon)

const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
</script>

<template>
  <div class="d-flex gap-2">
    <div class="icon-container bg-light-primary text-primary">
      <VIcon
        size="25"
        :icon="icon ?? 'tabler-info-circle'"
      />
    </div>

    <div class="d-flex flex-column">
      <span class="font-weight-medium mb-1">
        {{ label }}
      </span>
      <slot name="value" />

      <RouterLink
        v-if="!hasSlot('value') && to"
        :to="to"
        class="text-decoration-none"
      >
        <span class="font-weight-bold">
          {{ value }}
        </span>
      </RouterLink>
      <span
        v-else-if="!hasSlot('value') && !to"
        class="font-weight-bold"
      >
        {{ value ?? 'لا يوجد' }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { baseURL } from '@/plugins/axios'
import type { Notification } from '@layouts/types'
import axios from 'axios'
const emit = defineEmits(['success'])

interface Props {
  notifications: Notification[]
  badgeProps?: unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location?: any
}

const data = ref({
  body: '',
  title: '',
})
const isLoading = ref(false)

const props = withDefaults(defineProps<Props>(), {
  location: 'bottom end',
  badgeProps: undefined,
})


function post() {
  isLoading.value = true
  axios.post(`${baseURL}/notifications`, data.value).then((res) => {
    isLoading.value = false
    emit('success')
    data.value = {
      body: '',
      title: '',
    }
  })
}
</script>

<template>
  <IconBtn id="notification-btn">
    <VBadge v-bind="props.badgeProps" :model-value="props.notifications.some(n => !n.isRead)" color="error"
      :content="totalUnseenNotifications" class="notification-badge">
      <VIcon size="26" icon="tabler-bell" />
    </VBadge>

    <VMenu activator="parent" width="380px" :location="props.location" offset="14px" :close-on-content-click="false">
      <VCard class="d-flex flex-column">
        <VCardItem class="notification-section">
          <VCardTitle class="text-lg">
            الاشعارات
          </VCardTitle>
          <AppTextField v-model="data.title" label="title" />
          <AppTextField v-model="data.body" label="body" />
          <br>
          <VBtn :loading="isLoading" color="error" @click="post()">
            حفظ
          </VBtn>
        </VCardItem>
      </VCard>
    </VMenu>
  </IconBtn>
</template>

<style lang="scss">
.notification-section {
  padding: 14px !important;
}

.notification-footer {
  padding: 6px !important;
}

.list-item-hover-class {
  .visible-in-hover {
    display: none;
  }

  &:hover {
    .visible-in-hover {
      display: block;
    }
  }
}

.notification-list.v-list {
  .v-list-item {
    border-radius: 0 !important;
    margin: 0 !important;
  }
}

// Badge Style Override for Notification Badge
.notification-badge {
  .v-badge__badge {
    /* stylelint-disable-next-line liberty/use-logical-spec */
    min-width: 18px;
    padding: 0;
    block-size: 18px;
  }
}
</style>

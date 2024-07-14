<script lang="ts" setup>
import axios from '@axios'
import type { Notification } from '@layouts/types'
import { ref } from 'vue'

// // A setup function that sets up event listeners
// const setupNotificationListeners = () => {
//   window.OneSignal = window.OneSignal || [];

//   const onNotificationDisplay = (notification) => {
//     console.log('Notification displayed:', notification);
//     // Here, you could update a piece of reactive state to show the notification info in your component
//   };

//   const onNotificationClick = (notification) => {
//     console.log('Notification clicked:', notification);
//     // Handle notification click, e.g., navigate to a certain part of your app
//   };

//   onMounted(() => {
//     OneSignal.push(() => {
//       OneSignal.on('notificationDisplay', onNotificationDisplay);
//       OneSignal.on('notificationClick', onNotificationClick);
//     });
//   });

//   onUnmounted(() => {
//     OneSignal.push(() => {
//       OneSignal.off('notificationDisplay', onNotificationDisplay);
//       OneSignal.off('notificationClick', onNotificationClick);
//     });
//   });
// };

// // Execute the setup function
// setupNotificationListeners();

const notifications = ref<Notification[]>([])
const router = useRouter()

const getNotifications = async () => {
  const response = await axios.get('/notification')
  const data = await response.data.data

  notifications.value = data
}

getNotifications()

const removeNotification = (notificationId: string | number) => {
  notifications.value.forEach((item, index) => {
    if (notificationId === item.id)
      notifications.value.splice(index, 1)
  })
}

const markRead = (notificationId: string[] | number[]) => {
  notifications.value.forEach(item => {
    notificationId.forEach(id => {
      if (id === item.id)
        item.isRead = true
    })
  })
}

const markUnRead = (notificationId: string[] | number[]) => {
  notifications.value.forEach(item => {
    notificationId.forEach(id => {
      if (id === item.id)
        item.isRead = false
    })
  })
}

const handleNotificationClick = (notification: Notification) => {
  if (!notification.isRead) {
    axios.get(`/notification/${notification.id}`)
    markRead([notification.id])


  }

  router.push(`/tickets/${notification.ticketId}`);

}
</script>

<template>
  <Notifications :notifications="notifications" @remove="removeNotification" @read="markRead" @unread="markUnRead"
    @click:notification="handleNotificationClick" />
</template>

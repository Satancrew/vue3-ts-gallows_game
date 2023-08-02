import GameNotification from '@/components/GameNotification.vue'
import { ref } from 'vue'

export const useNotification = () => {
  const notification = ref<InstanceType<typeof GameNotification> | null>(null)
  const showNotification = () => {
    notification.value?.openPopup()
    setTimeout(() => notification.value?.closePopup(), 1500)
  }
  return {
    notification,
    showNotification
  }
}

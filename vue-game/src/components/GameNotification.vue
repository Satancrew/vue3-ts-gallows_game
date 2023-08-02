<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(false)

const openPopup = () => {
  isVisible.value = true
}

const closePopup = () => {
  isVisible.value = false
}

defineExpose({
  openPopup,
  closePopup
})
</script>

<template>
  <div class="notification-container" :class="{ show: isVisible }">
    <p>Вы уже вводили этот символ</p>
  </div>
</template>

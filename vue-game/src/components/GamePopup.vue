<script setup lang="ts">
import { ref } from 'vue'
export type GameStatus = 'win' | 'lose'

interface Props {
  word: string
}

defineProps<Props>()

const isVisible = ref(false)

const gameStatus = ref<GameStatus | null>(null)

const openPopup = (status: GameStatus) => {
  gameStatus.value = status
  isVisible.value = true
}

const closePopup = () => {
  isVisible.value = false
}

defineExpose({
  openPopup,
  closePopup
})

const emit = defineEmits<{
  (e: 'restart'): void
}>()
</script>
<template>
  <div v-if="isVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gameStatus === 'win'">Поздравляю, вы победили! 😃</h2>
      <template v-else>
        <h2>Вы проиграли. 😕</h2>
        <h3>
          ...имя: <span class="popup-name">{{ word }}</span>
        </h3>
      </template>
      <button @click="emit('restart')">Сыграть еще раз</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameHeader from './components/GameHeader.vue'
import GameFigure from './components/GameFigure.vue'
import GameWrongLetter from './components/GameWrongLetter.vue'
import GameWord from './components/GameWord.vue'
import GamePopup from './components/GamePopup.vue'
import GameNotification from './components/GameNotification.vue'
import { computed, ref } from 'vue'

const word = ref('василий')
const letters = ref<string[]>([])
const correctLetters = computed(() => letters.value.filter((el) => word.value.includes(el)))
const wrongLetters = computed(() => letters.value.filter((el) => !word.value.includes(el)))
const notification = ref<InstanceType<typeof GameNotification> | null>(null)

window.addEventListener('keydown', ({ key }) => {
  if (letters.value.includes(key)) {
    notification.value?.openPopup()
    setTimeout(() => notification.value?.closePopup(), 1500)
    return
  }

  if (/[а-яА-ЯёЁ]/.test(key)) {
    letters.value.push(key.toLowerCase())
  }
})
</script>

<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure />
    <GameWrongLetter :wrong-letters="wrongLetters" />
    <GameWord :word="word" :correct-letters="correctLetters" />
  </div>
  <GamePopup v-if="false" />
  <GameNotification ref="notification" />
</template>

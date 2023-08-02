<script setup lang="ts">
import { ref, watch } from 'vue'
import GameFigure from './components/GameFigure.vue'
import GameHeader from './components/GameHeader.vue'
import GameNotification from './components/GameNotification.vue'
import GamePopup from './components/GamePopup.vue'
import GameWord from './components/GameWord.vue'
import GameWrongLetter from './components/GameWrongLetter.vue'
import { useLetters } from './composables/useLetters'
import { useNotification } from './composables/useNotification'
import { useRandomWord } from './composables/useRandomWord'

const { word, getRandomWord } = useRandomWord()
const {
  letters,
  correctLetters,
  wrongLetters,
  isStatusLose,
  isStatusWin,
  addLetter,
  resetLetters
} = useLetters(word)
const { notification, showNotification } = useNotification()

const restart = async () => {
  await getRandomWord()
  resetLetters()
  popup.value?.closePopup()
}

const popup = ref<InstanceType<typeof GamePopup> | null>(null)

watch(wrongLetters, () => {
  if (isStatusLose.value) {
    popup.value?.openPopup('lose')
  }
})

watch(correctLetters, () => {
  if (isStatusWin.value) {
    popup.value?.openPopup('win')
  }
})

window.addEventListener('keydown', ({ key }) => {
  if (isStatusWin.value || isStatusLose.value) {
    return
  }

  if (letters.value.includes(key)) {
    showNotification()
    return
  }

  addLetter(key)
})
</script>

<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure :error-count="wrongLetters.length" />
    <GameWrongLetter :wrong-letters="wrongLetters" />
    <GameWord :word="word" :correct-letters="correctLetters" />
  </div>
  <GamePopup ref="popup" :word="word" @restart="restart" />
  <GameNotification ref="notification" />
</template>
./composables/useNotification

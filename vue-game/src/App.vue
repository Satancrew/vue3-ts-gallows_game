<script setup lang="ts">
import GameHeader from './components/GameHeader.vue'
import GameFigure from './components/GameFigure.vue'
import GameWrongLetter from './components/GameWrongLetter.vue'
import GameWord from './components/GameWord.vue'
import GamePopup from './components/GamePopup.vue'
import GameNotification from './components/GameNotification.vue'
import axios from 'axios'
import { computed, ref, watch } from 'vue'

const word = ref('')

const getRandomWord = async () => {
  try {
    const { data } = await axios<{ FirstName: string }>(
      'https://api.randomdatatools.ru/?unescaped=false&params=FirstName'
    )
    word.value = data.FirstName.toLowerCase()
  } catch (error) {
    console.log(error)
    word.value = ''
  }
}

getRandomWord()

const letters = ref<string[]>([])
const correctLetters = computed(() => letters.value.filter((el) => word.value.includes(el)))
const wrongLetters = computed(() => letters.value.filter((el) => !word.value.includes(el)))
const isStatusLose = computed(() => wrongLetters.value.length === 6)
const isStatusWin = computed(() => [...word.value].every((el) => correctLetters.value.includes(el)))
const notification = ref<InstanceType<typeof GameNotification> | null>(null)
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
    notification.value?.openPopup()
    setTimeout(() => notification.value?.closePopup(), 1500)
    return
  }

  if (/[а-яА-ЯёЁ]/.test(key)) {
    letters.value.push(key.toLowerCase())
  }
})

const restart = async () => {
  await getRandomWord()
  letters.value = []
  popup.value?.closePopup()
}
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

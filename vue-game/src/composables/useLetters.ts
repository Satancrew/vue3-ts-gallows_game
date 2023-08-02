import { computed, ref, type Ref } from 'vue'

export const useLetters = (word: Ref<string>) => {
  const letters = ref<string[]>([])
  const correctLetters = computed(() => letters.value.filter((el) => word.value.includes(el)))
  const wrongLetters = computed(() => letters.value.filter((el) => !word.value.includes(el)))
  const isStatusLose = computed(() => wrongLetters.value.length === 6)
  const isStatusWin = computed(() =>
    [...word.value].every((el) => correctLetters.value.includes(el))
  )

  return {
    letters,
    correctLetters,
    wrongLetters,
    isStatusLose,
    isStatusWin
  }
}

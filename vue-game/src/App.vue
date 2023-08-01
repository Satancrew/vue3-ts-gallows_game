<script setup lang="ts">
import GameHeader from './components/GameHeader.vue'
import GameFigure from './components/GameFigure.vue'
import GameWrongLetter from './components/GameWrongLetter.vue'
import GameWord from './components/GameWord.vue'
import GamePopup from './components/GamePopup.vue'
import GameNotification from './components/GameNotification.vue'
</script>

<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure />
    <GameWrongLetter />
    <GameWord />
  </div>
  <GamePopup v-if="false" />
  <GameNotification />
</template>

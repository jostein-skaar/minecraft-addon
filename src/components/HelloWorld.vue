<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>Forsøk 1: <a href="/aronsskinpakke.mcpack" download>Last ned pakke</a></p>
  <p>Forsøk 2: <a href="/aronsskinpakke2.mcpack" download>Last ned pakke2</a></p>
</template>

<style scoped></style>

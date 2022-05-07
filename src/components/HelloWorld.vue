<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <p>Forsøk 8: <a href="/pakke3.mcpack" download>Last ned pakke blank</a></p>
  <p>Forsøk 9: <a href="/pakke3.mcpack" download rel="noopener noreferrer" target="_blank">>Last ned pakke blank</a></p>
</template>

<style scoped></style>

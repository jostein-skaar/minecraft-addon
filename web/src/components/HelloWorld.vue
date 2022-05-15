<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <p>Last ned: <a href="/aronspakke.mcaddon" download>aronspakke.mcaddon</a></p>
</template>

<style scoped></style>

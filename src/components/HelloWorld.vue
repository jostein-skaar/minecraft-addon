<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>Forsøk 5: <a href="/pakke3.mcpack" target="_self">Last ned pakke blank</a></p>
</template>

<style scoped></style>

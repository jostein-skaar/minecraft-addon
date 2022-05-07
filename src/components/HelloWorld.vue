<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>Forsøk 6: <a href="/pakke3.mcpack" download="pakka4.mcpack" type="application">Last ned pakke blank</a></p>
  <p>Forsøk 7: <a href="/pakke3.mcpack" target="_self" type="application">Last ned pakke blank</a></p>
</template>

<style scoped></style>

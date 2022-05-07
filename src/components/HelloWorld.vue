<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>Forsøk 3: <a href="/pakke3.mcpack" target="_blank">Last ned pakke blank</a></p>
  <p>Forsøk 4: <a href="/pakke3.mcpack" target="_blank" type="application/zip">Last ned pakke blank + type zip</a></p>
</template>

<style scoped></style>

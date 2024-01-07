<template>
  <button @click="onClick"><slot>Button</slot></button>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{
  onClick: (payload: MouseEvent) => void
}>()
</script>
<style scoped>
button {
  background-color: #4b39ef;
  border-radius: 8px;
  padding: 8px 24px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  font-size: 20px;
  border: none;
  padding: 10px 20px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    padding: 15px 24px;
    width: 100%;
  }
}
</style>

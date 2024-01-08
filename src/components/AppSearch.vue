<template>
  <div class="searchWrapper">
    <input type="text" placeholder="Search..." v-model="search" autocomplete="off" />
    <div><app-button @click="searchHandler(search)">SUBMIT</app-button></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppButton from './AppButton.vue'
const search = ref('')

defineProps<{ searchHandler: (q: string) => void }>()
</script>

<style scoped>
.searchWrapper {
  width: 100%;
  display: flex;
  padding: 12px 0 0 0;
  input {
    margin-right: 20px;
    padding: 8px 27px;
    border-radius: 8px;
    width: 100%;
    border: 1px solid #cccccc;
    font-size: 24px;
  }
  /*  @media (max-width: 1050px) {
    padding: 24px 0 12px 0;
    input {
      font-size: 32px;
      padding: 16px 27px;
    }
  }
  @media (max-width: 500px) {
    padding: 12px 0;
    input {
      font-size: 24px;
      padding: 12px 27px;
    }
  }*/
}
</style>

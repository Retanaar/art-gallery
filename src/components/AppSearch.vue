<script setup lang="ts">
import { ref } from 'vue'
import AppButton from './AppButton.vue'

defineProps<{ searchHandler: (q: string) => void }>()

const search = ref('')
</script>

<template>
  <div class="searchWrapper">
    <input v-model="search" type="text" placeholder="Search..." autocomplete="off">
    <div>
      <AppButton @click="searchHandler(search)">
        SUBMIT
      </AppButton>
    </div>
  </div>
</template>

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

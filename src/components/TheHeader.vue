<template>
  <div class="header-wrapper">
    <div class="logo">Rijks Museum</div>
    <div class="favorites">Favorites {{ length }}</div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '../store/useFavoritesStore.ts'
import { computed } from 'vue'
const { favorites } = storeToRefs(useFavoritesStore())
const { initFavorites } = useFavoritesStore()
initFavorites()

const length = computed(() => favorites.value.length)
</script>
<style scoped>
.header-wrapper {
  display: flex;
  width: 100%;
  background-color: #4b39ef;
  justify-content: space-between;
}
.logo,
.favorites {
  color: #ffffff;
  font-family: Saira Stencil One;
  padding: 16px 20px;
  font-size: 22px;
  @media (max-width: 1024px) {
    font-size: 32px;
  }
  @media (max-width: 500px) {
    font-size: 24px;
  }
}
</style>

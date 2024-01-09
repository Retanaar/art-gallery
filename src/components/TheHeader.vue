<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '../store/useFavoritesStore.ts'

const router = useRouter()
const { favorites } = storeToRefs(useFavoritesStore())
const { initFavorites } = useFavoritesStore()
initFavorites()

const length = computed(() => favorites.value.length)
</script>

<template>
  <div class="header-wrapper">
    <div class="logo" @click="router.push('/')">
      Rijks Museum
    </div>
    <div class="favorites" @click="router.push('/favorites')">
      Favorites {{ length }}
    </div>
  </div>
</template>

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
  cursor: pointer;
  @media (max-width: 1024px) {
    font-size: 32px;
  }
  @media (max-width: 500px) {
    font-size: 24px;
  }
}
</style>

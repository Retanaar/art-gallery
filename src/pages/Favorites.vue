<script setup lang="ts">
import { useRouter } from 'vue-router'
import useFavorites from '../composable/useFavorites'
import ArtListItem from '../components/ArtListItem.vue'
import AppButton from '../components/AppButton.vue'

const router = useRouter()

const { favorites: artObjects } = useFavorites({ id: '' })
</script>

<template>
  <div class="container">
    <div>
      <AppButton @click="router.push('/')">
        Main Page
      </AppButton>
    </div>
    <!-- Empty result -->
    <div v-if="!artObjects?.length" class="empty-list">
      No items in favorites
    </div>
    <div v-else class="items-grid">
      <ArtListItem v-for="artItem in artObjects" :key="artItem.objectNumber" :item="artItem" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  > div {
    margin: 10px 0 5px 0;
  }
}
.items-grid {
  width: 100%;
  display: grid;
  background-color: #efefef;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  height: 100%;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(100px, 1fr));
    grid-template-rows: repeat(4, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
    grid-template-rows: repeat(6, 1fr);
  }
}
.empty-list {
  width: 100%;
  background-color: #efefef;
  text-align: center;
  font-size: 18px;
  margin-top: 16px;
}
</style>

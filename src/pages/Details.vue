<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ArtObjectDetails } from '../types'
import { artDetails } from '../api'
import AppButton from '../components/AppButton.vue'
import AppLoader from '../components/AppLoader.vue'
import useFavorites from '../composable/useFavorites'

const route = useRoute()
const router = useRouter()
const details = ref<ArtObjectDetails>()
const loading = ref(false)

const id = computed(() => route.params.id)

const description = computed(() => details.value?.label.description || details.value?.description)
const title = computed(() => details.value?.label.title || details.value?.title)
const imageUrl = computed(() => details.value?.webImage?.url || '')
const colors = computed(() => details.value?.colors || [])
const { inFavorites, handleFavorites } = useFavorites({ id: id.value.toString() })

// Fetch art details on component mount
onMounted(() => {
  loading.value = true
  artDetails(id.value as string)
    .then((data) => {
      details.value = data.artObject
      loading.value = false
    })
    .catch(err => console.error(err))
})
</script>

<template>
  <!-- Loader displayed when content is loading -->
  <AppLoader v-if="loading" />

  <!-- Content displayed when not loading -->
  <div v-else class="container">
    <!-- Back button -->
    <div>
      <AppButton @click="router.push('/')">
        Back
      </AppButton>
    </div>

    <!-- Art details -->
    <div class="content">
      <div class="image" :style="{ backgroundImage: `url(${imageUrl})` }" />
      <div class="info">
        <div class="h3">
          {{ title }}
        </div>
        <div class="h5">
          {{ description }}
        </div>
        <div class="h5">
          Colors:
        </div>
        <div class="tags-wrapper">
          <!-- Display colors with percentage -->
          <div v-for="(color, index) in colors" :key="index" class="tag" :style="{ backgroundColor: color.hex }">
            {{ color.hex }} ({{ color.percentage }}%)
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Remove from favorites button -->
    <div class="button-wrapper">
      <AppButton @click="handleFavorites(details)">
        <!-- Dynamic button text based on inFavorites status -->
        {{ inFavorites ? 'Remove from favorites' : 'Add to favorites' }}
      </AppButton>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  > div:first-child {
    width: fit-content;
  }
}
.content {
  display: flex;
  width: 100%;
  margin-top: 10px;
  height: 70%;
  @media (max-width: 600px) {
    height: calc(100% - 220px);
    flex-wrap: wrap;
    overflow: auto;
  }
}
.image {
  min-width: 55%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  @media (max-width: 1024px) {
    height: 60%;
  }
  @media (max-width: 500px) {
    height: 37%;
    width: 100%;
  }
}
.info {
  padding: 0 12px;
}
.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  > div {
    padding: 4px 8px;
    margin: 5px;
    color: white;
    min-width: 125px;
    text-align: center;
  }
}
.button-wrapper {
  margin-left: 56%;
  @media (max-width: 1024px) {
    margin-left: 0;
    position: absolute;
    bottom: 10px;
    width: 100%;
  }
}
.h5 {
  font-weight: 700;
  font-size: 14px;
  margin: 10px 0;
}
.h3 {
  font-weight: 700;
  font-size: 18px;
  margin: 10px 0;
}
</style>

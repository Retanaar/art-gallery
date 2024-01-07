<template>
  <div class="container">
    <div><app-button @click="">Back</app-button></div>
    <div class="content">
      <div class="image" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
      <div class="info">
        <h3>{{ title }}</h3>
        <h5>{{ description }}</h5>
      </div>
    </div>
    <div>
      <app-button @click="">Add to favorites</app-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArtObjectDetails } from '../types'
import { artDetails } from '../api'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppButton from '../components/AppButton.vue'

const route = useRoute()
const details = ref<ArtObjectDetails>()

const id = computed(() => route.params.id)

const description = computed(() => details.value?.label.description)
const title = computed(() => details.value?.label.title)
const imageUrl = computed(() => details.value?.webImage.url)
onMounted(() => {
  artDetails(id.value as string)
    .then((data) => (details.value = data.artObject))
    .catch((err) => console.error(err))
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 16px auto;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.content {
  display: flex;
  width: 100%;
  margin: 20px 0;
  height: 70%;
}
.image {
  min-width: 60%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.info {
  padding: 0 12px;
}
</style>

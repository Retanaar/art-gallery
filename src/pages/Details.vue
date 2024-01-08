<template>
  <div class="container">
    <div><app-button @click="router.push('/')">Back</app-button></div>
    <div class="content">
      <div class="image" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
      <div class="info">
        <div class="h3">{{ title }}</div>
        <div class="h5">{{ description }}</div>
        <div class="h5">Colors:</div>
        <div class="tags-wrapper">
          <div class="tag" v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color.hex }">
            {{ color.hex }} ({{ color.percentage }}%)
          </div>
        </div>
      </div>
    </div>
    <div class="button-wrapper">
      <app-button @click="">Add to favorites</app-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArtObjectDetails } from '../types'
import { artDetails } from '../api'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppButton from '../components/AppButton.vue'

const route = useRoute()
const router = useRouter()
const details = ref<ArtObjectDetails>()

const id = computed(() => route.params.id)

const description = computed(() => details.value?.label.description || details.value?.description)
const title = computed(() => details.value?.label.title || details.value?.title)
const imageUrl = computed(() => details.value?.webImage?.url || '')
const colors = computed(() => details.value?.colors || [])
onMounted(() => {
  artDetails(id.value as string)
    .then((data) => (details.value = data.artObject))
    .catch((err) => console.error(err))
})
</script>

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

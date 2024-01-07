<template>
  <div class="popupWrapper">
    <div class="mainContainer">
      <div class="image" :style="{ backgroundImage: 'url(' + item?.webImage.url + ')' }"></div>
      <div class="description">
        <h2>{{ item?.title }}</h2>
        <h5>{{ item?.longTitle }}</h5>
      </div>
    </div>
    <div class="buttonContainer">
      <AppButton @click="">Add to favorites</AppButton>
      <AppButton @click="router.push('/' + item?.objectNumber)">View Details</AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArtObjectsItem } from '../types'
import AppButton from './AppButton.vue'

defineProps<{ item?: ArtObjectsItem }>()

const router = useRouter()
</script>
<style scoped>
.popupWrapper {
  max-width: 1050px;
  height: fit-content;
  margin: 12px;
  width: 100%;
  padding: 20px 20px 10px 20px;
  box-sizing: border-box;
}
.mainContainer {
  display: flex;
  flex-wrap: no-wrap;
  @media (max-width: 500px) {
    flex-wrap: wrap;
  }
}
.image {
  width: 600px;
  height: 450px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  @media (max-width: 500px) {
    width: 100%;
    height: 75%;
    min-height: 300px;
  }
}
.description {
  margin-left: 20px;
}
.buttonContainer {
  margin: 20px 0 10px 0;
  display: flex;
  flex-wrap: nowrap;
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
  > button {
    width: 100%;
    margin: 0 20px 10px 0;
  }
}
</style>

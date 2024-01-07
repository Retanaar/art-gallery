<template>
  <div :style="{ backgroundImage: 'url(' + imageUrl + ')' }" class="wrapper" @click="$emit('select-art', props.item)">
    <div class="hint">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArtObjectsItem } from '../types'
import { computed } from 'vue'

const emits = defineEmits(['select-art'])

const props = defineProps<{ item: ArtObjectsItem }>()

const imageUrl = computed(() => props.item.webImage.url)
const title = computed(() => props.item.longTitle)
</script>

<style scoped>
.wrapper {
  background-size: contain;
  height: auto;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
.wrapper:hover {
  > div {
    top: 25%;
  }
}
.hint {
  width: 100%;
  height: 75%;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  background-color: white;
  opacity: 0.7;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 300ms linear;
  > span {
    margin: 0 10px;
  }
}
</style>

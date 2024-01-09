<script setup lang="ts">
import type { ArtObjectsBase, ArtObjectsItem } from '../types'

const { item } = defineProps<{ item: ArtObjectsBase }>()

defineEmits<{ (e: 'selectArt', item: ArtObjectsItem): void }>()

const imageUrl = item.webImage.url
const title = item.title
</script>

<template>
  <div
    :style="{ backgroundImage: `url(${imageUrl})` }"
    class="wrapper"
    @click="$emit('selectArt', item as ArtObjectsItem)"
  >
    <div class="hint">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

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
    opacity: 0.7;
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
  opacity: 0;
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

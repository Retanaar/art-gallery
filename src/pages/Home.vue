<template>
  <div class="container">
    <app-loader v-if="loading" />
    <AppSearch :search-handler="updateSearch" />
    <div class="scroll-area" ref="scrollArea" :style="scrollAreaStyles">
      <div class="items-grid" :style="styles">
        <ArtListItem
          v-for="artItem in artObjects"
          :key="artItem.objectNumber"
          :item="artItem"
          @select-art="selectArt"
        />
      </div>
    </div>
    <app-button @click="loadMore" :disabled="loading">Load more</app-button>
    <AppModal :is-open="isOpen" @modal-close="isOpen = false">
      <ArtItemPopup :item="selectedArt" />
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import ArtItemPopup from '../components/ArtItemPopup.vue'
import AppModal from '../components/AppModal.vue'
import AppButton from '../components/AppButton.vue'
import AppSearch from '../components/AppSearch.vue'
import ArtListItem from '../components/ArtListItem.vue'
import useArtObjects from '../composable/useArtList'
import { onMounted, ref, reactive, onBeforeUnmount } from 'vue'
import { ArtObjectsItem } from 'types'
import AppLoader from '../components/AppLoader.vue'

const search = ref('')
const isOpen = ref(false)
let selectedArt = ref<ArtObjectsItem>()
const scrollArea = ref<HTMLDivElement>()

const selectArt = (art: ArtObjectsItem) => {
  selectedArt.value = art
  isOpen.value = true
}

const styles = reactive({
  height: '100%',
})

const scrollAreaStyles = reactive({
  height: 'none',
  maxHeight: 'none',
})

const { artObjects, loadNextItems, loading } = useArtObjects()

function updateSearch(q: string) {
  search.value = q
  loadMore()
}

const loadMore = async () => {
  await loadNextItems(search.value)
  const scrollHeight = scrollArea.value?.clientHeight || 0
  styles.height = scrollHeight * (artObjects.value.length / 12) + 'px'
}

onMounted(async () => {
  await loadNextItems('')
  const scrollHeight = scrollArea.value?.clientHeight || 0
  scrollAreaStyles.height = scrollHeight + 'px'
  scrollAreaStyles.maxHeight = scrollHeight + 'px'
  window.addEventListener('resize', reload)
})

onBeforeUnmount(() => window.removeEventListener('resize', reload))

function reload() {
  window.removeEventListener('resize', reload)
  location.reload()
}
</script>

<style scoped>
.button-wrapper {
  margin: 0 auto;
}
.container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
.scroll-area {
  overflow: auto;
  height: calc(100% - 230px);
  max-height: calc(100% - 230px);
  margin: 15px 0;
  box-sizing: border-box;
  @media (max-width: 1024px) {
    height: calc(100% - 240px);
  }
  @media (max-width: 500px) {
    height: calc(100% - 230px);
  }
}
.items-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  gap: 10px;
  height: 100%;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(100px, 1fr));
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  }
}
</style>

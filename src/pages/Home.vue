<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ArtObjectsItem } from 'types'
import ArtItemPopup from '../components/ArtItemPopup.vue'
import AppModal from '../components/AppModal.vue'
import AppButton from '../components/AppButton.vue'
import AppSearch from '../components/AppSearch.vue'
import ArtListItem from '../components/ArtListItem.vue'
import useArtObjects from '../composable/useArtObjects'
import AppLoader from '../components/AppLoader.vue'

// Reactive references and variables initialization
const search = ref('')
const isOpen = ref(false)
const gridHeight = ref('100%')
const selectedArt = ref<ArtObjectsItem>()

// Function to handle selecting an art item
function selectArt(art: ArtObjectsItem) {
  selectedArt.value = art
  isOpen.value = true
}

// Using the 'useArtObjects' composable function to manage art objects
const { artObjects, loadNextItems, loading } = useArtObjects()

// Function to update the search query
function updateSearch(q: string) {
  search.value = q
}

// Watching for changes in the search query and triggering loadMore accordingly
watch(search, () => loadMore())

// Function to load more art items based on the search query
async function loadMore() {
  await loadNextItems(search.value)
  gridHeight.value = `${100 * ((artObjects.value?.length | 0) / 12)}%` // Mock for unit test
}

// Lifecycle hook: onMounted - executed after the component is mounted
onMounted(async () => {
  await loadNextItems(search.value)
  window.addEventListener('resize', reload)
})

// Lifecycle hook: onBeforeUnmount - executed just before the component is unmounted
onBeforeUnmount(() => window.removeEventListener('resize', reload))

// Function to reload the window when resized
function reload() {
  window.removeEventListener('resize', reload)
  location.reload()
}
</script>

<template>
  <!-- Main container for the component -->
  <div class="container">
    <!-- Loader component displayed when loading is in progress -->
    <AppLoader v-if="loading" />

    <!-- Search component to handle search queries -->
    <AppSearch :search-handler="updateSearch" />

    <!-- Scroll area containing the grid for art items -->
    <div class="scroll-area">
      <div class="items-grid" :style="{ height: gridHeight }">
        <!-- Display each art item using 'ArtListItem' component -->
        <ArtListItem
          v-for="artItem in artObjects"
          :key="artItem.objectNumber"
          :item="artItem"
          @select-art="selectArt"
        />
      </div>
    </div>

    <!-- Button to load more art items -->
    <AppButton :disabled="loading" data-testid="load-more" @click="loadMore">
      Load more
    </AppButton>

    <!-- Modal for displaying detailed information about selected art item -->
    <AppModal :is-open="isOpen" @modal-close="isOpen = false">
      <ArtItemPopup :item="selectedArt" />
    </AppModal>
  </div>
</template>

<style scoped>
/* Scoped styles for the component */
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
/* Styles for the scroll area */
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
/* Styles for the items grid */
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

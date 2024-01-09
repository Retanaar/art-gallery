import type { ArtObjectsItem } from 'types'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { cache as artObjectsCache } from '../services/ArtObjectsCache'

const itemsOnPage = 12

/**
 * Represents the return type of the `useArtObjects` function.
 */
interface ReturnType {
  loadNextItems: (s: string) => Promise<void>
  artObjects: Ref<ArtObjectsItem[]>
  loading: Ref<boolean>
}

/**
 * Hook for managing art objects. It takes next 12 objects from ArtObjectsCache
 * @returns {ReturnType} - The object containing reactive properties and methods.
 */
function useArtObjects(): ReturnType {
  const artObjects = ref<ArtObjectsItem[]>([])
  const loading = ref(false)
  const search = ref('')

  /**
   * Loads the next items based on the search query.
   * @param {string} s - The search query.
   */
  async function loadNextItems(s: string) {
    loading.value = true
    const startPosition = s === search.value ? artObjects.value.length : 0
    const newItems = await artObjectsCache.getNextItems(s, startPosition, itemsOnPage)
    if (s === search.value) {
      artObjects.value = [...artObjects.value, ...newItems]
    }
    else {
      artObjects.value = [...newItems]
      search.value = s
    }
    loading.value = false
  }

  return {
    loadNextItems,
    artObjects,
    loading,
  }
}

export default useArtObjects

import { ArtObjectsItem } from 'types'
import { Ref, ref } from 'vue'
import { cache as artObjectsCache } from '../services/ArtObjectsCache'

const itemsOnPage = 12

interface ReturnType {
  loadNextItems: (s: string) => Promise<void>
  artObjects: Ref<ArtObjectsItem[]>
  loading: Ref<boolean>
}

function useArtObjects(): ReturnType {
  const artObjects = ref<ArtObjectsItem[]>([])
  const loading = ref(false)
  const search = ref('')

  async function loadNextItems(s: string) {
    loading.value = true
    const startPosition = s === search.value ? artObjects.value.length : 0
    const newItems = await artObjectsCache.getNextItems(s, startPosition, itemsOnPage)
    if (s === search.value) {
      artObjects.value = [...artObjects.value, ...newItems]
    } else {
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

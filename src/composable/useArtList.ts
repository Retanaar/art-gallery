import { ArtObjectsItem } from 'types'
import { Ref, ref } from 'vue'
import { cache as artObjectsCache } from '../services/ArtObjectsCache'

const itemsOnPage = 12

interface ReturnType {
  loadNextItems: (s: string) => Promise<void>
  artObjects: Ref<ArtObjectsItem[]>
}

function useArtObjects(): ReturnType {
  const artObjects = ref<ArtObjectsItem[]>([])
  const search = ref('')

  async function loadNextItems(s: string) {
    const startPosition = s === search.value ? artObjects.value.length : 0
    const newItems = await artObjectsCache.getNextItems(s, startPosition, itemsOnPage)
    if (s === search.value) {
      artObjects.value = [...artObjects.value, ...newItems]
    } else {
      artObjects.value = [...newItems]
      search.value = s
    }
  }

  return {
    loadNextItems,
    artObjects,
  }
}

export default useArtObjects

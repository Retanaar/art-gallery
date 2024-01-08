import { computed, Ref, ComputedRef } from 'vue'
import { ArtObjectsFavorite } from '../types'
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '../store/useFavoritesStore'

interface ReturnType {
  favorites: Ref<ArtObjectsFavorite[] | null>
  handleFavorites: (item?: ArtObjectsFavorite) => void
  inFavorites: ComputedRef<boolean>
}

interface Params {
  id: string
}

function useFavorites({ id }: Params): ReturnType {
  const { favorites } = storeToRefs(useFavoritesStore())
  const { addToFavorites, removeFromFavorites } = useFavoritesStore()
  function handleFavorites(item?: ArtObjectsFavorite) {
    console.log('sdsds', item)
    if (item) {
      if (inFavorites.value) removeFromFavorites(item.id)
      else addToFavorites(item)
    }
  }

  const inFavorites = computed(() => favorites.value?.find((it) => it.objectNumber === id) !== undefined)
  console.log('inf:', inFavorites)
  return {
    favorites,
    handleFavorites,
    inFavorites,
  }
}

export default useFavorites

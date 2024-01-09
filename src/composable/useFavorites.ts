import type { ComputedRef, Ref } from 'vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { ArtObjectsFavorite } from '../types'
import { useFavoritesStore } from '../store/useFavoritesStore'

/**
 * Represents the return type of the `useFavorites` function.
 */
interface ReturnType {
  favorites: Ref<ArtObjectsFavorite[] | null>
  handleFavorites: (item?: ArtObjectsFavorite) => void
  inFavorites: ComputedRef<boolean>
}

/**
 * Represents the parameters for the `useFavorites` function.
 */
interface Params {
  id: string
}

/**
 * Hook for managing favorite art objects.
 * @param {Params} - The parameters containing the ID.
 * @returns {ReturnType} - The object containing reactive properties and methods.
 */
function useFavorites({ id }: Params): ReturnType {
  const { favorites } = storeToRefs(useFavoritesStore())
  const { addToFavorites, removeFromFavorites } = useFavoritesStore()

  const inFavorites = computed(() => favorites.value?.find(it => it.objectNumber === id) !== undefined)

  /**
   * Handles adding or removing an item from favorites.
   * @param {ArtObjectsFavorite} item - The item to handle in favorites.
   */
  function handleFavorites(item?: ArtObjectsFavorite) {
    if (item) {
      if (inFavorites.value)
        removeFromFavorites(item.id)
      else addToFavorites(item)
    }
  }

  return {
    favorites,
    handleFavorites,
    inFavorites,
  }
}

export default useFavorites

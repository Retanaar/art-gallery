import { defineStore } from 'pinia'
import { STORAGE_KEY } from '../constants'
import type { ArtObjectsFavorite } from '../types'
import Storage from '../utils/storage'

const storage = new Storage<ArtObjectsFavorite[]>(STORAGE_KEY)

/**
 * Pinia store for managing favorites.
 */
export const useFavoritesStore = defineStore({
  id: 'favorites',
  state: (): { favorites: ArtObjectsFavorite[] } => ({
    favorites: [],
  }),
  actions: {
    /**
     * Adds an item to the favorites list.
     * @param {ArtObjectsFavorite} item - The item to add to favorites.
     */
    addToFavorites(item: ArtObjectsFavorite) {
      this.favorites.push(item)
      storage.set(this.favorites)
    },

    /**
     * Removes an item from the favorites list by ID.
     * @param {string} id - The ID of the item to remove from favorites.
     */
    removeFromFavorites(id: string) {
      this.favorites = this.favorites.filter(item => item.id !== id)
      storage.set(this.favorites)
    },

    /**
     * Initializes the favorites list from storage.
     */
    initFavorites() {
      const favs = storage.get()
      this.favorites = favs || []
    },
  },
})

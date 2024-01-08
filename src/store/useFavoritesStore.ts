import { STORAGE_KEY } from '../constants'
import { defineStore } from 'pinia'
import { ArtObjectsFavorite } from '../types'
import Storage from '../utils/storage'

const storage = new Storage<ArtObjectsFavorite[]>(STORAGE_KEY)

export const useFavoritesStore = defineStore({
  id: 'favorites',
  state: (): { favorites: ArtObjectsFavorite[] } => ({
    favorites: [],
  }),
  actions: {
    addToFavorites(item: ArtObjectsFavorite) {
      this.favorites.push(item)
      storage.set(this.favorites)
    },
    removeFromFavorites(id: string) {
      this.favorites = this.favorites.filter((item) => item.id !== id)
      storage.set(this.favorites)
    },
    initFavorites() {
      const favs = storage.get()
      this.favorites = favs || []
    },
  },
})

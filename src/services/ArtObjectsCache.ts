import type { ArtObjectsItem } from 'types'
import { ITEMS_FOR_CACHE } from '../constants'
import { artList } from '../api'

interface CacheElement {
  items: ArtObjectsItem[]
  page: number
  total: number
}

/**
 * Class representing a cache for art objects. It try to return next 12 objects from
 * cache or load next page from server and returned next 12 objects
 */
class ArtObjectsCache {
  /** @type {Map<string, CacheElement>} */
  private cache: Map<string, CacheElement>

  /**
   * Creates a new instance of ArtObjectsCache.
   */
  constructor() {
    this.cache = new Map()
  }

  /**
   * Checks if there are enough items in the cache.
   * @param {string} s - The cache key. This is search param.
   * @param {number} lastIndex - The index of the last item.
   * @returns {boolean} - The result of the check.
   * @private
   */
  private isEnoughItems(s: string, lastIndex: number): boolean {
    const c = this.cache.get(s)
    if (!c)
      return false
    return c.items.length - 1 >= lastIndex || c.total < lastIndex
  }

  /**
   * Gets the next items from the cache or loads them from the API if insufficient.
   * @param {string} s - The cache key. This is search param.
   * @param {number} from - The starting index in cache.
   * @param {number} elems - The number of elements.
   * @returns {Promise<ArtObjectsItem[]>} - A promise resolving to an array of items.
   */
  async getNextItems(s: string, from: number, elems: number): Promise<ArtObjectsItem[]> {
    if (!this.isEnoughItems(s, from + elems))
      await this.loadNextPage(s)

    const c = this.cache.get(s)
    if (c)
      return c.items.slice(from, Math.min(from + elems, c.items.length))

    return []
  }

  /**
   * Loads the next page of items from the API for this search string and adds them to the cache.
   * @param {string} s - The cache key.
   * @private
   */
  private async loadNextPage(s: string): Promise<void> {
    const page = this.cache.get(s)?.page || 0
    const items = this.cache.get(s)?.items || []

    try {
      const data = await artList({
        imgonly: true,
        p: page + 1,
        ps: ITEMS_FOR_CACHE,
        culture: 'en',
        q: s,
      })
      this.cache.set(s, {
        items: [...items, ...data.artObjects],
        page: page + 1,
        total: data.count,
      })
    }
    catch (err) {
      console.error(err)
    }
  }
}

// Export an instance of the ArtObjectsCache class
export const cache = new ArtObjectsCache()

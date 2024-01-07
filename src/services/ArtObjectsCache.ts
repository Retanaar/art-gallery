import { artList } from '../api'
import { ArtObjectsItem } from 'types'

const itemsForCache = 20

interface CacheElement {
  items: ArtObjectsItem[]
  page: number
  total: number
}

class ArtObjectsCache {
  private cache: Map<string, CacheElement>
  constructor() {
    this.cache = new Map()
  }
  private isEnoughItems(s: string, lastIndex: number) {
    const c = this.cache.get(s)
    if (!c) return false
    return c.items.length - 1 >= lastIndex || c.total < lastIndex
  }

  async getNextItems(s: string, from: number, elems: number): Promise<ArtObjectsItem[]> {
    if (!this.isEnoughItems(s, from + elems)) {
      await this.loadNextPage(s)
    }

    const c = this.cache.get(s)
    if (c) {
      return c.items.slice(from, Math.min(from + elems, c.items.length))
    }
    return []
  }
  private async loadNextPage(s: string) {
    const page = this.cache.get(s)?.page || 0
    const items = this.cache.get(s)?.items || []

    try {
      const data = await artList({
        imgonly: true,
        p: page + 1,
        ps: itemsForCache,
        culture: 'en',
        q: s,
      })
      this.cache.set(s, {
        items: [...items, ...data.artObjects],
        page: page + 1,
        total: data.count,
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export const cache = new ArtObjectsCache()

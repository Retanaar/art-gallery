import type { ArtObjectsItem } from 'types'

export function mockArtObjectsItem(data: Partial<ArtObjectsItem> = {}): ArtObjectsItem {
  return {
    id: 'id',
    longTitle: 'long title',
    objectNumber: 'objectNumber',
    title: 'title',
    webImage: {
      height: 100,
      width: 200,
      url: 'url',
    },
    ...data,
  }
}

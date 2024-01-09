export interface ArtObjectsParams {
  p: number // current page
  ps: number // elements per page
  q: string // search string
  imgonly: boolean // items with image only
  culture: string // lang nl / en
}

export interface ArtObjectsBase {
  id: string
  title: string
  objectNumber: string
  webImage: ArtObjectsImage
}

export interface ArtObjectDetails extends ArtObjectsBase {
  titles: string
  description: string
  label: ArtObjectLabel
  colors: ArtObjectColor[]
}

export interface ArtObjectsFavorite extends ArtObjectsBase {}

export interface ArtObjectDetailsResponse {
  artObject: ArtObjectDetails
}

export interface ArtObjectColor {
  percentage: number
  hex: string
}

export interface ArtObjectLabel {
  title: string
  makerLine: string
  description: string
}

export interface ArtObjectsResponse {
  count: number
  artObjects: ArtObjectsItem[]
}

export interface ArtObjectsItem extends ArtObjectsBase {
  longTitle: string
}

export interface ArtObjectsImage {
  width: number
  height: number
  url: string
}

export interface ArtObjectsParams {
  p: number //current page
  ps: number //elements per page
  q: string //search string
  imgonly: boolean //items with image only
  culture: string //lang nl / en
}

export interface ArtObjectDetails {
  id: string
  title: string
  webImage: ArtObjectsImage
  titles: string
  description: string
  label: ArtObjectLabel
  colors: ArtObjectColor[]
}

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

export interface ArtObjectsItem {
  id: string
  objectNumber: string
  title: string
  longTitle: string
  webImage: ArtObjectsImage
}

export interface ArtObjectsImage {
  width: number
  height: number
  url: string
}

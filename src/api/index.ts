import request from '../utils/request'
import type { ArtObjectDetailsResponse, ArtObjectsParams, ArtObjectsResponse } from '../types'

export function artList(params: ArtObjectsParams): Promise<ArtObjectsResponse> {
  return request({
    url: '/',
    params: {
      ...params,
      key: import.meta.env.VITE_RIJKS_API_KEY,
      objecttype: 1,
    },
  })
}

export function artDetails(id: string): Promise<ArtObjectDetailsResponse> {
  return request({
    url: `/${id}`,
    params: {
      key: import.meta.env.VITE_RIJKS_API_KEY,
    },
  })
}

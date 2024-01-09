import request from '../utils/request'
import { ArtObjectDetailsResponse, ArtObjectsParams, ArtObjectsResponse } from '../types'

export const artList = (params: ArtObjectsParams): Promise<ArtObjectsResponse> =>
  request({
    url: '/',
    params: {
      ...params,
      key: import.meta.env.VITE_RIJKS_API_KEY,
      objecttype: 1,
    },
  })

export const artDetails = (id: string): Promise<ArtObjectDetailsResponse> =>
  request({
    url: '/' + id,
    params: {
      key: import.meta.env.VITE_RIJKS_API_KEY,
    },
  })

// import { responseErrorHandler } from '@/common'
import { responseErrorHandler } from '../utilites/responseErrorHandler'
import { instance } from './instance'
import type { AxiosInstance } from 'axios'


// import { NewsFeedQuery, NewsFeedRoot } from '../model'
// import { NewsFeedRequestEndpoints } from './newsFeed.endpoints'


class FilmsApi {

  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  async getFilms(data?: any, signal?: AbortSignal) {
    try {
      const res = await this.instance.get(
        '/movie',
        {
          // params: data,
          signal,
        }
      )

      return res.data
    } catch (error) {
      responseErrorHandler(error)
      throw error
    }
  }
}

export const filmsApi = new FilmsApi(instance)

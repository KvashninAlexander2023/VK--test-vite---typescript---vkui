// import { responseErrorHandler } from '@/common'
import { responseErrorHandler } from '../utilites/responseErrorHandler'
import { api } from './client'
import type { AxiosInstance } from 'axios'
import mokeData from '../../../responsePoiskkino.json'

// console.log(mokeData);
class FilmsApi {

  private instance: AxiosInstance

  constructor(api: AxiosInstance) {
    this.instance = api
  }

  async getFilms(data?: any, signal?: AbortSignal) {
    try {
      // const res = await this.instance.get(
      //   '/movie',
      //   {
      //     params: data,
      //     signal,
      //   }
      // )

      // return res.data
      return mokeData
    } catch (error) {
      responseErrorHandler(error)
      throw error
    }
  }
}

export const filmsApi = new FilmsApi(api)

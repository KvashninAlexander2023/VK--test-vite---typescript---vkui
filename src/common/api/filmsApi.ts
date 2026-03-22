import { responseErrorHandler } from "../utilites/responseErrorHandler";
import { instance } from "./instance";
import type { AxiosInstance } from "axios";

class FilmsApi {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  async getFilms(data?: any, signal?: AbortSignal) {
    try {
      const res = await this.instance.get(`/v1.5/movie?${data.query}`, {
        params: {
          limit: "50",
          sortField: "year",
          sortType: "-1",
        },
        signal,
      });
      return res.data;
    } catch (error) {
      responseErrorHandler(error);
      throw error;
    }
  }
  async getFilmGenres(signal?: AbortSignal) {
    try {
      const res = await this.instance.get(`/v1/movie/possible-values-by-field?field=genres.name`, {
        signal,
      });
      return res.data;
    } catch (error) {
      responseErrorHandler(error);
      throw error;
    }
  }
}

export const filmsApi = new FilmsApi(instance);

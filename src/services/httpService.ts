import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { CocktailResponse } from "../types/cocktail";

class HttpServices {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = Axios.create({
      baseURL: "/api",
    });
  }

  get = async (path: string): Promise<AxiosResponse<CocktailResponse>> => {
    return this.axiosInstance.get(path);
  };

  post = async (path: string, payload?: object): Promise<AxiosResponse> => {
    return this.axiosInstance.post(path, payload);
  };

  put = async (path: string, payload?: object): Promise<AxiosResponse> => {
    return this.axiosInstance.put(path, payload);
  };

  delete = async (path: string): Promise<AxiosResponse> => {
    return this.axiosInstance.delete(path);
  };
}

export const httpServices = new HttpServices();

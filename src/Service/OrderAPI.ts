import { AxiosError } from "axios";
import AxiosApi from "../Configs/axios";
import { errorData } from "../Types/constant";

export const API_GET_ORDERS = <T>(): Promise<T> => {
  return AxiosApi.get<T>(`/api/Order`)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Input not correct!");
      }
    })
    .catch((error) => {
      throw error;
    });
};

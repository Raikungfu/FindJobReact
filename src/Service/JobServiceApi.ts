import { AxiosError } from "axios";
import { errorData, FormDataOrOther } from "../Types/constant";
import AxiosApi from "../Configs/axios";

export const API_GET_JOBS_SERVICE = <T>(): Promise<T> => {
  return AxiosApi.get<T>(`/api/JobService`)
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

export const API_POST_ORDER = <T>(formData: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.post<T>(`/api/Order`, formData)
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

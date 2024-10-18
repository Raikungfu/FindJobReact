import { AxiosError } from "axios";
import AxiosApi from "../Configs/axios";
import { errorData, FormDataOrOther } from "../Types/constant";

export const API_GET_JOBS = <T>(formData: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.get<T>(`/api/Job/outstanding-job`, formData)
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
export const API_COUNT_JOBS = <T>(): Promise<number> => {
  return AxiosApi.get<T>(`/api/Job/count-jobs`)
    .then((response) => {
      if (response.data) {
        return response.data as unknown as number;
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
export const API_GET_JOB_DETAIL = <T>(jobId: number): Promise<T> => {
  return AxiosApi.get<T>(`/api/Job/${jobId}`)
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
export const API_POST_JOB = <T>(formData: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.post<T>(`/api/Job`, formData)
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
export const API_GET_JOB_CATEGORIES = <T>(): Promise<T> => {
  return AxiosApi.get<T>(`/api/Job/job-categories`)
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

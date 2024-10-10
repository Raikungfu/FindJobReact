import { AxiosError } from "axios";
import AxiosApi from "../Configs/axios";
import { errorData, FormDataOrOther } from "../Types/constant";

export const API_LOGIN = <T>(formData: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.post<T>(`/api/Auth/Login`, formData)
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

export const API_REGISTER = <T>(formData: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.post<T>(`/api/Auth/Register`, formData)
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

/*
export const API_GET_MENU_BY_SHOPID = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>(`/api/menu/product`, data)
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

export const API_GET_CATEGORIES_BY_SHOPID = <T>(
  id: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>(`/api/categories/${id}`)
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

export const API_GET_MENU_SEARCH = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>(`/api/menu/search`, data)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Không tìm thấy sản phẩm phù hợp!");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const API_GET_PRODUCT_DETAIL = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>(`/api/menu/item`, data)
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
*/

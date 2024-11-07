import { AxiosError } from "axios";
import AxiosApi from "../Configs/axios";
import { errorData, FormDataOrOther } from "../Types/constant";

export const API_GET_PAYMENT_VNPAY = <T>(
  formData: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.post<T>(`/api/Order/payment-vnpay`, formData)
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

export const API_GET_PAYMENT_PAYOS = <T>(
  formData: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.post<T>(`/api/Order/payment-payos`, formData)
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

export const API_CONFIRM_PAYOS = <T>(
  formData: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.post<T>(`/api/Order/confirm-payment-payos`, formData)
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

import { AxiosError } from "axios";
import AxiosApi from "../Configs/axios";
import { errorData, FormDataOrOther } from "../Types/constant";

// Gọi API lấy thông tin hồ sơ người dùng
export const API_GET_USER_PROFILE = <T>(): Promise<T> => {
  return AxiosApi.get<T>(`/api/User/profile`)
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

// Gọi API lấy thông tin chi tiết nhân viên
export const API_GET_EMPLOYEE_INFO = <T>(id: number): Promise<T> => {
  return AxiosApi.get<T>(`/api/Employee/${id}`)
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

// Gọi API để cập nhật thông tin nhân viên
export const API_UPDATE_EMPLOYEE = <T>(formData: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.put<T>(`/api/Employee/update`, formData)
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

// Gọi API để lấy thông tin các thành viên
export const API_GET_MEMBERS = <T>(): Promise<T> => {
  return AxiosApi.get<T>(`/api/User/members`)
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

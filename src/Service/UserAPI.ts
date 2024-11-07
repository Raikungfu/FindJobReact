import { AxiosError } from "axios";
import AxiosApi from "../Configs/axios";
import { errorData, FormDataOrOther } from "../Types/constant";

export const API_GET_USER_PROFILE = <T>(userId?: number): Promise<T> => {
  const url = userId 
    ? `/api/User/profile?userId=${userId}` // Truyền tham số userId qua query string
    : `/api/User/profile`;
  return AxiosApi.get<T>(url)
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
export const API_GET_EMPLOYER_INFO = <T>(id: number): Promise<T> => {
  return AxiosApi.get<T>(`/api/Employer/${id}`)
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
export const API_UPDATE_EMPLOYEE = async <T>(formData: FormDataOrOther<T>): Promise<T | null> => {
  try {
    const response = await AxiosApi.put<T>(`/api/Employee/update`, formData);
    
    if (response.data) {
      return response.data;
    } else {
      throw new Error("No data received from the update API");
    }
  } catch (error) {
    
    return null; 
  }
};
export const API_UPDATE_EMPLOYER = async <T>(formData: FormDataOrOther<T>): Promise<T | null> => {
  try {
    const response = await AxiosApi.put<T>(`/api/Employer/update`, formData);
    
    if (response.data) {
      return response.data;
    } else {
      throw new Error("No data received from the update API");
    }
  } catch (error) {
    return null; 
  }
};

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

export const API_GET_CHATS = <T>(): Promise<T> => {
  return AxiosApi.get<T>(`/api/Chat`)
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

export const API_START_CHAT = <T>(formData: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.post<T>(`/api/Chat/StartChat`, formData)
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

export const API_GET_CHAT_ROOM = <T>(roomId: number): Promise<T> => {
  return AxiosApi.get<T>(`/api/Chat/ChatRoom/${roomId}`)
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


import { AxiosError } from "axios";
import AxiosApi from "../Configs/axios";
import { errorData, FormDataOrOther } from "../Types/constant";

export const API_GET_JOBS = <T>(formData: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.get<T>(`/odata/Job/outstanding-job`, formData)
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

export const API_GET_JOB_EMPLOYER = <T>(employerId?: number): Promise<T> => {
  const url = `/odata/Job/get-job-employer${
    employerId ? `?employerId=${employerId}` : ""
  }`;

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
export const API_COUNT_JOBS = <T>(): Promise<number> => {
  return AxiosApi.get<T>(`/odata/Job/count-jobs`)
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
  return AxiosApi.get<T>(`/odata/Job/${jobId}`)
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
export const API_PUT_JOB = <T>(formData: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.put<T>(`/api/Job`, formData)
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
export const API_DELETE_JOB = <T>(jobId: number): Promise<T> => {
  return AxiosApi.delete<T>(`/odata/Job/${jobId}`)
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
  return AxiosApi.get<T>(`/odata/Job/job-categories`)
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
export const API_POST_HIRE_EMPLOYEE = <T>(
  formData: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.post<T>(`/hire-employee`, formData)
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
export const API_GET_HIRE_EMPLOYEE = <T>(jobId: number): Promise<T> => {
  return AxiosApi.get<T>(`/hire/${jobId}`)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Job not found!");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const API_POST_APPLY_JOB = <T>(
  formData: FormDataOrOther<T>
): Promise<T | null> => {
  return AxiosApi.post<T>(`/api/JobApply/apply-job`, formData)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        throw new Error("No response data.");
      }
    })
    .catch((error) => {
      if (error && error.response) {
        const x = error.response.data as errorData;
        console.error("Error response data:", x.error || "Unknown error");
      } else if (error.request) {
        console.error("No response received from server:", error.message);
      } else {
        console.error("Request setup error:", error.message);
      }
      return null;
    });
};

export const API_GET_MY_APPLIED_JOBS = <T>(): Promise<T> => {
  return AxiosApi.get<T>(`/api/JobApply/my-applied-job`)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "No applied jobs found!");
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const API_DELETE_APPLIED_JOB = <T>(jobApplyId: number): Promise<T> => {
  return AxiosApi.delete<T>(`/api/JobApply/unapply-job/${jobApplyId}`)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Cannot delete job application!");
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const API_GET_JOB_APPLY_DETAIL = <T>(jobApplyId: number): Promise<T> => {
  return AxiosApi.get<T>(`/api/JobApply/${jobApplyId}`)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Job application not found!");
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const API_GET_JOB_APPLY_DETAIL_BY_JOB = <T>(
  jobId: number
): Promise<T> => {
  return AxiosApi.get<T>(`/api/JobApply/job-apply-detail-by-job/${jobId}`)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "No job applications found for this job!");
      }
    })
    .catch((error) => {
      throw error;
    });
};

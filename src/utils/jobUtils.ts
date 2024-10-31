
import { API_POST_APPLY_JOB } from "../Service/JobAPI";

export const applyForJob = async (jobId: number): Promise<boolean> => {
  try {
    const response = await API_POST_APPLY_JOB({ JobId: jobId });
    return !!response; 
  } catch (error) {
    console.error("Error applying for job:", error);
    return false;
  }
};
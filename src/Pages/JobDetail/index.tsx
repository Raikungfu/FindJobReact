import { useEffect, useState } from "react";
import { API_GET_JOB_DETAIL } from "../../Service/JobAPI";
import { useParams } from "react-router-dom";
interface JobDetail {
  jobId: number;
  title: string;
  description: string;
  location: string;
}
const JobDetail = () => {
  const { jobId } = useParams<{ jobId?: string }>(); // Define jobId as an optional string
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      if (jobId) {
        // Check if jobId is defined
        try {
          const numericJobId = Number(jobId); // Convert jobId to a number
          const jobDetail = await API_GET_JOB_DETAIL(numericJobId);
          setJob(jobDetail as JobDetail);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Job ID is required.");
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [jobId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!job) {
    return <div className="pt-20">No job details available.</div>;
  }
  return (
    <div className="pt-20">
      <h1>{job.title}</h1>
      {/* Các thông tin khác của công việc */}
    </div>
  );
};

export default JobDetail;

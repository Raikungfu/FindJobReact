import { useEffect, useState } from "react";
import { API_GET_JOB_DETAIL } from "../../Service/JobAPI";
import { useParams } from "react-router-dom";
interface JobDetail_Response {
  JobId: number;
  Title: string;
  Description: string;
  EmployerName: string;
  CompanyName: string;
  JobCategoryName: string;
  JobType: string;
  Salary: number;
  DateFrom: string; // You may want to parse this to a Date object later
  DateTo: string; // Same as above
  EmployerDescription: string;
}
const JobDetail = () => {
  const { jobId } = useParams<{ jobId?: string }>(); // Define jobId as an optional string
  const [job, setJob] = useState<JobDetail_Response | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      if (jobId) {
        try {
          const numericJobId = Number(jobId); // Convert jobId to a number
          const jobDetail = await API_GET_JOB_DETAIL(numericJobId);
          setJob(jobDetail as JobDetail_Response);
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
    return <div className="text-center p-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-10">Error: {error}</div>;
  }

  if (!job) {
    return <div className="pt-20 text-center">No job details available.</div>;
  }

  return (
    <div className="pt-20 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">{job.Title}</h1>
      <p className="text-lg font-semibold mb-2">
        <strong>Employer:</strong> {job.EmployerName}
      </p>
      <p className="text-lg font-semibold mb-2">
        <strong>Company:</strong> {job.CompanyName}
      </p>
      <p className="text-lg font-semibold mb-2">
        <strong>Job Category:</strong> {job.JobCategoryName}
      </p>
      <p className="text-lg font-semibold mb-2">
        <strong>Job Type:</strong> {job.JobType}
      </p>
      <p className="text-lg font-semibold mb-2">
        <strong>Salary:</strong>{" "}
        {(job.Salary ?? 0).toLocaleString("en-US", {
          minimumFractionDigits: 0,
          useGrouping: true,
        })}{" "}
        VND
      </p>
      <p className="text-lg font-semibold mb-2">
        <strong>Description:</strong>
      </p>
      <p className="mb-4">{job.Description}</p>
      <p className="text-lg font-semibold mb-2">
        <strong>Employer Description:</strong>
      </p>
      <p className="mb-4">{job.EmployerDescription}</p>
      <p className="text-lg font-semibold mb-2">
        <strong>Date From:</strong>{" "}
        {new Date(job.DateFrom).toLocaleDateString()}
      </p>
      <p className="text-lg font-semibold mb-2">
        <strong>Date To:</strong> {new Date(job.DateTo).toLocaleDateString()}
      </p>

      {/* Apply Now Button */}
      <div className="mt-6 flex justify-center">
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
          Ứng Tuyển Ngay
        </button>
      </div>
    </div>
  );
};

export default JobDetail;

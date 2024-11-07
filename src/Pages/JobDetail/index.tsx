import { useEffect, useState } from "react";
import { API_GET_JOB_DETAIL, API_PUT_JOB } from "../../Service/JobAPI";
import { useNavigate, useParams } from "react-router-dom";
import { applyForJob } from "../../utils/jobUtils";
import { FormDataOrOther } from "../../Types/constant";

interface JobDetail_Response {
  EmployerId: number;
  JobId: number;
  Title: string;
  Description: string;
  EmployerName: string;
  CompanyName: string;
  JobCategoryName: string;
  JobType: string;
  Location: string;
  Salary: number;
  DateFrom: string;
  DateTo: string;
  EmployerDescription: string;
}

const JobDetail = () => {
  const { jobId } = useParams<{ jobId?: string }>();
  const [job, setJob] = useState<JobDetail_Response | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetail = async () => {
      if (jobId) {
        try {
          const numericJobId = Number(jobId);
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

    const fetchUser = () => {
      // Lấy thông tin người dùng từ localStorage
      const currentUser = JSON.parse(localStorage.getItem("User") || "{}");
      setUser(currentUser);
    };

    fetchJobDetail();
    fetchUser();
  }, [jobId]);

  const handleApply = async (jobId: number) => {
    const success = await applyForJob(jobId);
    if (success) {
      alert("Ứng tuyển thành công!");
    } else {
      alert("Ứng tuyển thất bại. Vui lòng thử lại.");
    }
  };

  const handleEditJob = () => {
    // Kiểm tra UserType là Employer và EmployerId khớp với UserId
    if (
      job &&
      user &&
      user.UserType === "Employer" &&
      job.EmployerId === user.Id
    ) {
      navigate(`/edit-job/${job.JobId}`);
    } else {
      alert("Bạn không có quyền chỉnh sửa công việc này.");
    }
  };
  console.log(user.Id);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center p-10">Lỗi: {error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-10">Không có thông tin công việc.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full xl:w-8/12 p-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h1 className="text-3xl font-bold mb-4 text-blue-600">
              {job.Title}
            </h1>
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
              <strong>Location:</strong> {job.Location}
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
              <strong>From:</strong>{" "}
              {new Date(job.DateFrom).toLocaleDateString()}
            </p>
            <p className="text-lg font-semibold mb-2">
              <strong>To:</strong> {new Date(job.DateTo).toLocaleDateString()}
            </p>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-lg mb-6">{job.Description}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">
                Employer Description
              </h2>
              <p className="text-lg mb-6">{job.EmployerDescription}</p>
            </div>
          </div>
        </div>
        <div className="w-full xl:w-4/12 p-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            {user && user.UserType === "Employer" && (
              //&& job.EmployerId === user.Id
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 mt-4"
                onClick={handleEditJob}
              >
                Chỉnh sửa Công việc
              </button>
            )}
            {user && user.UserType === "Employee" && (
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                onClick={() => handleApply(job.JobId)}
              >
                Ứng Tuyển Ngay
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;

import React, { useEffect, useState } from "react";
import { API_GET_JOB_EMPLOYER } from "../../Service/JobAPI";
import { JobList_Response } from "../../Types/job";

const ManageJobs: React.FC = () => {
  const [jobs, setJobs] = useState<JobList_Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const storedUser = localStorage.getItem("User");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser && parsedUser.UserType === "Employer") {
          const fetchedJobs =
            (await API_GET_JOB_EMPLOYER()) as JobList_Response[];
          setJobs(fetchedJobs);
        } else {
          setError("You must be an employer to view this page.");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="pt-20 min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Manage Your Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {jobs.map((job) => (
            <div
              key={job.JobId}
              className="mb-4 p-4 border border-gray-300 rounded"
            >
              <h2 className="text-xl font-semibold">{job.Title}</h2>
              <p>{job.Description}</p>
              <p className="font-medium">
                Salary:{" "}
                {(job.Salary ?? 0).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  useGrouping: true,
                })}{" "}
                VND
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => {}}
                >
                  Edit
                </button>
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
